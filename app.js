const express = require('express');
const { dbConnect } = require('./db');
const session = require('express-session');
const ejs = require('ejs');
const methodOverride = require('method-override');
const userRouter = require('./Router/userRouter');
const blogRouter = require('./Router/blogRouter');

const app = express()
dbConnect()

app.set("view engine", "ejs")
app.use(express.json())
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.use("/",userRouter)
app.use("/",blogRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server running on port"+PORT);
})