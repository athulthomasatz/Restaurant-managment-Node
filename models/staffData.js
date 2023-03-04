const mongoose =require('mongoose')
const StaffSchema = new mongoose.Schema({ 
    StaffName :{
        type : String,
        required : true
    },
    Password :{
        type : String,
        required : true 
    },
    StaffEmail :{
        type : String,
        required : true
    },
    StaffNumber :{
        type : String,
        required : false 
    },
    verified :{
        type : Boolean,
        default : false
    }

})
const StaffData = mongoose.model('StaffData', StaffSchema)
module.exports = StaffData ; 