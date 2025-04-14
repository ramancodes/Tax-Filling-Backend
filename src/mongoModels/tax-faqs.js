const mongoose = require('mongoose');

const taxFAQsSchema = mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    itrType: {
        type: String,
        required: true
    }
}, {timestamps: true, minimize:false});

const taxFAQsModel = mongoose.model.taxFAQs || mongoose.model('taxFAQs', taxFAQsSchema);

module.exports = {
    taxFAQsModel
}
