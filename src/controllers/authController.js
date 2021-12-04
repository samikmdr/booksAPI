const userService = require('../services/user')

const login = (req, res)=>{
    userService.login(req, res)
}

const register = (req, res)=>{
   userService.register(req, res)
}

const addRole = (req, res)=>{
    userService.addRole(req, res)
}

const forgotPassword = (req, res)=>{
    userService.forgotPassword(req, res)
}

const resetPassword = (req, res)=>{
    userService.resetPassword(req, res)
}


module.exports ={
    login,
    register,
    addRole,
    forgotPassword,
    resetPassword
}