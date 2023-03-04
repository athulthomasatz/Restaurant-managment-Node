const category = require('../models/Category')
const items = require('../models/Item')
const usersData = require('../models/UserData')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const sessions = require('express-session');
const session = require('express-session');


exports.getUserPage = (req, res) => {
    res.send("User Page")
}

exports.getUserLoginPage = (req, res) => {
    res.render('user/login')
}

exports.postUserLoginPage = async (req, res) => {
    const { logname, logpass } = req.body; 
    try {
        //  database field : loginform name
        const users = await usersData.findOne({ UserName: logname }); 
        if (!users) {
            return res.status(401).send('Invalid user');
        }
        // form,passworddatabase
        const isMatch = await bcrypt.compare(logpass, users.Password);
        
        if (!isMatch) {
            return res.status(401).send('Invalid  or password'); 
        } else {
            console.log("user and password succesfully found")
        }

        // Create a session for the user
        req.session.useId = {
            id: users.id,
            name: users.UserName
        };
        req.session.userAuth = true
        console.log(req.session.useId)
        res.redirect('/user/menu' );
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getUserSignupPage = (req, res) => {
    res.render('user/signup')
}

exports.postUserSignupPage = async(req, res) => {
    try{
        const userExist = await usersData.findOne({ Email : req.body.signmail}).lean()
    if(userExist){
        console.log("user already exist");
        return res.redirect('/user/signup')
    }

    bcrypt.hash(req.body.signpass, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error hashing password');
        }
        const newUser = new usersData({
            UserName: req.body.signname,
            Password: hash,
            Email: req.body.signmail,
            Number: req.body.signnumber
        });

        newUser.save().then(() => {
            console.log('User added!');
            res.redirect('/user/login');
        })
        // .catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Error adding user'); 
        // });
    })

    }catch(error){
     console.log(error);
     res.status(500).send('error adding user ')

    }
    

}

exports.userLogout = (req,res)=>{
    req.session.useId = null
    req.session.userAuth = false
    console.log("session Turned false")
    res.redirect('/')
}
// exports.userLogout = (req,res)=>{
//     req.session.destroy((err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             console.log("Session Destroyed")
//             res.redirect('/')
//         }
//     })
// }


exports.getUserMenuPage = async (req, res) => {
    const myCategory = await category.find({}).lean()
    
    res.render('user/menu', { myCategory })
}

exports.getUserMenuItemPage = async (req, res) => {
    const myItems = await items.find({}).lean()
    res.render('user/menu-items', { myItems })
}













// const usersign =  new usersData({
    //     UserName : req.body.signname,
    //     Password : req.body.signpass
    // })
    // usersign.save().then(() => {
    //     console.log("user Added!!")
    // }).catch((err) => {
    //     console.log(err)
    // })

    // res.redirect('/user')