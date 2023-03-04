const mongoose = require('mongoose')
const managerSchema = new mongoose.Schema({
    ManagerName : {
        type : String,
        required : true
    },
    ManagerEmail : {
        type : String,
        required : true
    },
    ManagerNumber : {
        type : String,
        required : true
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
const Managerdata = mongoose.model('Managerdata',managerSchema)
module.exports = Managerdata