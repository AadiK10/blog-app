const blogModel = require("../Model/blogModel")

const addDataForm = (req,res)=>{
    res.render("add")
}

const addData = async(req,res)=>{
    try {
        const{title,content,image,author} = req.body
        await blogModel.create({title,content,image,author})
        res.redirect("/dashboard")   
    } catch (error) {
        console.log(error);
    }
}

const fetchById = async(req,res)=>{
    try {
        const bdata = await blogModel.findById(req.params.id)
        res.render("edit",{bdata})
    } catch (error) {
        console.log(error);
    }
}

const updateData = async(req,res)=>{
    try {
        await blogModel.findByIdAndUpdate(req.params.id,req.body)
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async(req,res)=>{
    try {
        await blogModel.findByIdAndDelete(req.params.id)
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addDataForm,addData,fetchById,updateData,deleteData}