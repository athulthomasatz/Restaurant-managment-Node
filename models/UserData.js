const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    UserName : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Number : {
        type :Number,
        required : true
    }
})
const UserData = mongoose.model('UserData', UserSchema)
module.exports = UserData ;  