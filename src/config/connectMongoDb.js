const mongoose = require('mongoose');

const connectDB = async ()=>{
    mongoose.connect(process.env.MONGODB_STRING + process.env.DB_NAME)
    .then(()=>console.log("Mongo Database Connected"))
    .catch((error)=>console.log("Cannot Connect Database. Error:", error));
}

module.exports = {
    connectDB
}