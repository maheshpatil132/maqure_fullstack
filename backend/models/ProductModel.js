const mongoose = require('mongoose');
const { Schema } = mongoose;

const Products = new Schema({
    name: {
        type: String,
        required:true,
    },
    desc: {
        type: String,
        required:true,
    },
    documents: {
        type: String,
    },    
    sellers : [],
    img:{
        
    },
    category:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("product", Products);