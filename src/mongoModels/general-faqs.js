const mongoose = require('mongoose');

const generalFAQsSchema = mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true
    },
}, {timestamps: true, minimize:false});

const generalFAQsModel = mongoose.model.generalFAQs || mongoose.model('generalFAQs', generalFAQsSchema);

module.exports = {
    generalFAQsModel
}
