const express = require('express');
const { addDataForm, addData, deleteData, fetchById, updateData } = require('../Controller/blogController');

const blogRouter = express()

blogRouter.get("/add",addDataForm)
blogRouter.post("/add",addData)
blogRouter.get("/edit/:id",fetchById)
blogRouter.patch("/edit/:id",updateData)
blogRouter.delete("/delete/:id",deleteData)

module.exports = blogRouter