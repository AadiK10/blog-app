const express = require('express');
const { registerForm, register, loginForm, login, dashboard, logout } = require('../Controller/userController');

const userRouter = express()

userRouter.get("/",registerForm)
userRouter.post("/",register)

userRouter.get("/login",loginForm)
userRouter.post("/login",login)

const isAuth = (req,res,next)=>{
    if(req.session.username) next()
    else res.redirect("/login")
}

userRouter.get("/dashboard",isAuth,dashboard)
userRouter.get("/logout",logout)

module.exports = userRouter