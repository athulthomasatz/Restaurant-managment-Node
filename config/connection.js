
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery',true)
const connectionString = process.env.MONGO_URI;
const ConnectDb = ()=>{
    mongoose.connect(connectionString,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>{
        console.log("Connected to mongoDB!!!")
    }).catch((err)=>{
        console.error(err)
        process.exit(1)
    })
}
module.exports = ConnectDb