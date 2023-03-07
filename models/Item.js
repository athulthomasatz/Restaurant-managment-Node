const mongoose = require('mongoose') 
const itemSchema = new mongoose.Schema({ 
    imageUrl : {
        type : String,
        required : true
    }, 
    name : {
        type : String,
        required : true
    },
    description: {
        type: String,
        required: false
    },
    price : {
        type : Number,
        required : false
    },
    apprtime : {
        type : Number,
        required : false
    },
    category : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Category',
        required : true
    }
});
const Item = mongoose.model('Item', itemSchema)
module.exports = Item; 