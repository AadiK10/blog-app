const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = () => mongoose.connect(process.env.MONGO_URI).then((result) => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
});

module.exports = {dbConnect}

