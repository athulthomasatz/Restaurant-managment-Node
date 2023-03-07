const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({ 
    imageUrl : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    description :{
        type :String,
        required :false
    }  
    
    
});


const Category = mongoose.model('Category', categorySchema)
module.exports = Category; 