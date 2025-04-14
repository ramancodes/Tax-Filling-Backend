const mongoose = require('mongoose');

const latestUpdatesSchema = mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    categoryColor:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
}, {timestamps: true, minimize:false});

const latestUpdatesModel = mongoose.model.latestUpdates || mongoose.model('latestUpdates', latestUpdatesSchema);

module.exports = {
    latestUpdatesModel
}
