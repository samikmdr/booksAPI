const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { sequelize, User}= require('../../src/models');

const options ={
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.ACCESS_TOKEN_SECRET

};

const strategy = new JwtStrategy(options, (payload, done)=>{
    User.findOne({where:{id: payload.userId}}) 
    .then((user)=>{
        if(user){
            console.log(user)
            console.log('User authenticates succesfully')
            return done(null,user);
        }
        else{
            console.log('Unauthorized user')
            return done(null, false);
        }
    })
    .catch(err =>  done(err, null));
});

module.exports = (passport)=>{
    passport.use(strategy);
}