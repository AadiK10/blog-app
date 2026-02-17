const bcryptjs = require('bcryptjs');
const userModel = require('../Model/userModel');
const blogModel = require('../Model/blogModel');

const registerForm = (req,res)=>{
    res.render("register", { error_msg: null, success_msg: null })  // CHANGED: Pass null messages
}

const register = async(req,res)=>{
    try {
        const{name,email,password} = req.body
        
        // ADDED: Validation for empty fields
        if (!name || !email || !password) {
            return res.render("register", { 
                error_msg: "Please fill in all fields",
                success_msg: null 
            });
        }

        // ADDED: Check if user already exists
        const existingUser = await userModel.findOne({ name });
        if (existingUser) {
            return res.render("register", { 
                error_msg: "Username already taken",
                success_msg: null 
            });
        }

        const hashPassword = await bcryptjs.hash(password,10)
        await userModel.create({name,email,password:hashPassword})
        
        // CHANGED: Redirect to login with success message
        res.render("login", { 
            success_msg: "Registration successful! Please login",
            error_msg: null 
        })   
    } catch (error) {
        console.log(error);
        // ADDED: Error handling
        res.render("register", { 
            error_msg: "Something went wrong. Please try again",
            success_msg: null 
        });
    }
}

const loginForm = (req,res)=>{
    res.render("login", { error_msg: null, success_msg: null })  // CHANGED: Pass null messages
}

const login = async(req,res)=>{
    try {
        const{name,password} = req.body
        
        // ADDED: Validation for empty fields
        if (!name || !password) {
            return res.render("login", { 
                error_msg: "Please fill in all fields",
                success_msg: null 
            });
        }

        const user = await userModel.findOne({name})
        
        // CHANGED: User not registered - show error on login page
        if(!user) {
            return res.render("login", { 
                error_msg: "User not registered",
                success_msg: null 
            });
        }
        
        if(await bcryptjs.compare(password,user.password)){
            req.session.username = user.name
            res.redirect("/dashboard")
        }
        else {
            // CHANGED: Invalid password - show error on login page
            return res.render("login", { 
                error_msg: "Invalid password",
                success_msg: null 
            });
        }   
    } catch (error) {
        console.log(error);
        // ADDED: Error handling
        res.render("login", { 
            error_msg: "Something went wrong. Please try again",
            success_msg: null 
        });
    }
}

const dashboard = async(req,res)=>{
    try {
        const data = await blogModel.find()
        res.render("dashboard", {name: req.session.username, data})  // No messages needed for dashboard
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