const {BookShelf,LendDetails, User, Book, Sequelize} = require('../models')
const jwt = require('jsonwebtoken');


function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports ={
    async searchAvailableBook(req, res){
        const books = await BookShelf.findAll({
            where: {available: true},
            include: [{
                model: Book
            }]
        });
        return res.status(200).json({success: true, message:books})
    },
    async borrowRequest(req, res){
        const {shelf_id} = req.body;
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const borrower_id = decoded.userId;
        const user = await User.findByPk(borrower_id);
        const shelf = await BookShelf.findByPk(shelf_id);
        if(!user)
            return res.status(400).json({success: false, message:"user not found"});
        if(!shelf)
            return res.status(400).json({success: false, message:"book not found"});
        if(shelf.lend_flag)
            return res.status(400).json({success: false, message:"book not available for lending"});
        LendDetails.create({shelf_id, borrower_id, lend_status: '0'})
        .then(lend =>{ 
            // shelf.update({lend_flag: true})
            res.status(200).json({success: true, message: lend})
        })
    },

    async getLendRequests(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include:[{
                model: LendDetails,
                where: {
                    lend_status: '0'
                },
                include: [{
                    model: User,
                    attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']},
                required: true
            },{
                model: Book,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        return res.status(200).json({success: true, message:shelf})
    },

    async findBorrowedBooks(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const lend = await LendDetails.findAll(
            {
                where: {
                    borrower_id: user_id,
                    lend_status:'1'
                },
                include: [{
                    model: BookShelf,
                    include: [{
                        model: User,
                        attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                    },{
                        model: Book,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }],
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })
        return res.status(200).json({success: true, message: lend})
    },

    async findLentBooks(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include:[{
                model: LendDetails,
                where: {
                    lend_status: '1'
                },
                include: [{
                    model: User,
                    attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']},
                required: true
            },{
                model: Book,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        return res.status(200).json({success: true, message: shelf})
    },

    async respond(req, res){
       try{ 
            const lend_id = req.params.id;
            const lend = await LendDetails.findByPk(lend_id);
            if(!lend)
                return res.status(400).json({success: false, message:"Lend request not found"});
            const {accept_request} = req.body;
            if(accept_request){
                lend.update({lend_status:'1'})
                .then(async result =>{
                    await BookShelf.update({available: false, lend_flag: true},{where: {id: lend.shelf_id}})
                    return res.status(200).json({success: true, message: 'Lend Request Accepted'})
                })
            }
            else{
                lend.update({lend_status:'-1'})
                .then(async result =>{
                    await BookShelf.update({lend_flag: false},{where: {id: lend.shelf_id}})
                    return res.status(200).json({success: true, message: 'Lend Request Rejected'})
                })
                .catch(err => res.status(400).json({success: false, message:err.message}))
            }
        }
        catch(err){
            return res.status(400).json({success: false, message:err.message});
        }
    },


}