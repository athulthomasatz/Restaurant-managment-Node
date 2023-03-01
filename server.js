const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const ConnectDb = require('./config/connection')
const cookie = require('cookie-parser')
const session = require('express-session')
dotenv.config()
const { engine } = require('express-handlebars')
const guestRouter = require('./routes/guest.route')
const userRouter = require('./routes/user.route')
const staffRouter = require('./routes/staff.route')
const managerRouter = require('./routes/manager.route')
const cashierRouter = require('./routes/cashier.route')
const adminRouter = require('./routes/admin.route')
const app = express()
 

// Database connect
ConnectDb()
//session and cookie
app.use(express.json())
app.use(cookie());
app.use(session({
    secret : process.env.SESSION_SECERT,
    resave : false,
    saveUninitialized : true
}))
//engine set up
app.use(express.urlencoded({extended:true}))
app.engine('hbs', engine({
    extname:'hbs',
    partialsDir : path.join(__dirname,'views','partials')  
}))
app.set('view engine', 'hbs')
app.set('views', './views');

app.use(express.static('public'))
//main routes
app.use('/guest',guestRouter)
app.use('/user', userRouter)
app.use('/staff', staffRouter)
app.use('/manager', managerRouter)
app.use('/cashier', cashierRouter)
app.use('/admin', adminRouter)

app.get('/', (req,res) => {
    res.render('guest/welcome') 
})

const port = 3000
app.listen( port , () => console.log(`server running on port ${port}`));






