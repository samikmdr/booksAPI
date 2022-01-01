const {User, User_Role, Role, ResetToken} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports= {
    async register(req, res) {
        console.log('register service')
        const {password, confirm_password, user_name} = req.body;
        const oldUser = await User.findOne({where:{user_name}})
        if(oldUser)
            return res.status(400).json({success: false, message:"Username already taken!"});
        if(!password)
            return res.status(400).json({success: false, message:"Password required!"});
        if(password !== confirm_password)
            return res.status(400).json({success: false, message:"Two passwords donot match!"});
        bcrypt.genSalt(10, (error, salt)=>{
            if (error){
                return res.status(400).json({success: false, error: error.message})}
            bcrypt.hash(password, salt, (error, hash)=>{
                if(error)
                    return res.status(400).json({success: false, error: error.message})
                console.log('hash is', hash);
                req.body.password = hash;
                User.create(req.body)
                .then(async user =>{
                    const payload = {userId: user.id}
                    const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'});
                    return res.status(200).json({success: true, message: {token: accessToken}})
                })
                .catch(err => res.status(400).json({success: false, message: err.message}))
            })
        })
    },

    login(req, res){
        console.log('login service')
        User.findOne({where: {user_name: req.body.user_name}})
        .then(user => {
            if(!user)
                return res.status(400).json({success: false, message:"User not registered"})
            bcrypt.compare(req.body.password, user.password, async function(err, result) {
                if(err)
                    return res.status(400).json({success: false, message:err.message})
                if(!result)
                    return res.status(400).json({success: false, message:"Password Incorrect"})
                const payload = {
                    userId: user.id,
                    user:{
                        Name: user.full_name,
                        Username: user.username,
                        Email: user.email,
                        Phone: user.phone
                    }
                }
                const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'});
                res.status(200).json({success:true, message:{token: accessToken}})
            });
            
        })
        .catch(err => res.status(400).json({success: false,message: err.message}))
    },

    async addRole(req, res){
        const userId = req.params.id;
        const {role_id} = req.body;

        //check user
        const user = await User.findByPk(userId);
        if(!user)
            return res.status(400).json({success: false, message:"User not found"});
        
            //check role
        const role = await Role.findByPk(role_id);
        if(!role)
            return res.status(400).json({success: false, message:"Role not found"});
        
        const userRole = await User_Role.findOne({where:{user_id: userId, role_id: role_id}})
        if(userRole)
            return res.status(400).json({success: false, message:"User role already exists"})
        
        User_Role.create({user_id: userId, role_id: role_id})
        .then(user_role => res.status(200).json({success: true,message:"User Role created"}))
    },

    async forgotPassword(req, res){
        const user = await User.findOne({where: {email: req.body.email}})
        if(!user)
            return res.status(400).json({success: false, message: 'No user with this email'})
        

        await ResetToken.update({
            used: 1
            },
            {
            where: {
                email: req.body.email
            }
        });

        const fpSalt = crypto.randomBytes(64).toString('base64');
        const expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
        
        await ResetToken.create({
            email: req.body.email,
            expiration: expireDate,
            token: fpSalt,
            used: 0
          });
        if(parseInt(process.env.ENABLE_MAIL)=== 1){
            const transport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.SENDER_PASS
                }
            })

            var message = {
                from: process.env.SENDER_EMAIL,
                to: process.env.RECEIVER_EMAIL,
                subject: "Books api password reset",
                text: `Hi ${user.full_name}, your password reset token is ${fpSalt}`
            }
            transport.sendMail(message, (err, info)=>{
                if(err){
                    console.log(err)
                }
                else
                    console.log(info);
            });
        }
        return res.json({success: true, token: fpSalt})
    },

    async resetPassword(req, res){
        //compare passwords
        if (req.body.new_password !== req.body.retype_password) {
            return res.json({success: false, message: 'Passwords do not match. Please try again.'});
        }
        
        var record = await ResetToken.findOne({
            where: {
            email: req.body.email,
            // expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
            token: req.body.token,
            used: 0
            }
        });
        
        if (record == null) {
            return res.json({success: false, message: 'Token not found. Please try the reset password process again.'});
        }
        
        var upd = await ResetToken.update({
            used: 1
            },
            {
            where: {
                email: req.body.email
            }
        });

        bcrypt.genSalt(10, (error, salt)=>{
            if (error){
                return res.status(400).json({success: false, error: error.message})}
            bcrypt.hash(req.body.new_password, salt, (error, hash)=>{
                if(error)
                    return res.status(400).json({success: false, error: error.message})
                console.log('hash is', hash);
                req.body.new_password = hash;
                User.update({
                    password: req.body.new_password
                },
                {
                    where:{
                        email: req.body.email
                    }
                })
                .then(user =>{
                    return res.status(200).json(user)
                })
                .catch(err => res.status(400).json({success: false, message: err.message}))
            })
        })
        
        // return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
            }

}