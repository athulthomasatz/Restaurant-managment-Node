const mongoose = require('mongoose')
const CashierSchema = new mongoose.Schema({
    CashierName :{
        type : String,
        required : true
    },
    CashierEmail :{
        type : String,
        required : true
    },
    CashierNumber :{
        type : String,
        required :true
    },
    Password :{
        type : String,
        required : true 
    },
    verified :{
        type : Boolean,
        default : false 
    }

})
const cashierData = mongoose.model('CashierData',CashierSchema)
module.exports = cashierData