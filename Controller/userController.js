const bcryptjs = require('bcryptjs');
const userModel = require('../Model/userModel');
const blogModel = require('../Model/blogModel');

const registerForm = (req,res)=>{
    res.render("register")
}

const register = async(req,res)=>{
    try {
        const{name,email,password} = req.body
        const hashPassword = await bcryptjs.hash(password,10)
        await userModel.create({name,email,password:hashPassword})
        res.redirect("/login")   
    } catch (error) {
        console.log(error);
    }
}

const loginForm = (req,res)=>{
    res.render("login")
}

const login = async(req,res)=>{
    try {
        const{email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user) res.end("User not registered")
        else if(await bcryptjs.compare(password,user.password)){
            req.session.username = user.name
            res.redirect("/dashboard")
        }
        else res.end("Invalid password")   
    } catch (error) {
        console.log(error);
    }
}

const dashboard = async(req,res)=>{
    try {
        const data = await blogModel.find()
        res.render("dashboard",{name:req.session.username,data})
    } catch (error) {
        console.log(error);
    }
}

const logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login")
    })
}

module.exports = {
    registerForm,
    register,
    loginForm,
    login,
    dashboard,
    logout
}