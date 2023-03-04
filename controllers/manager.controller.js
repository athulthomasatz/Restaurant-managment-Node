const category = require('../models/Category')
const items = require('../models/Item') 
const managerData = require('../models/managerData')
const bcrypt = require('bcryptjs')
const saltrounds = 10


exports.getManagerPage = (req,res) => {
    res.send("Kitchen Manager Page")
}

exports.getManagerSignupPage = (req,res)=>{
    res.render('manager/signup',{
        error : req.flash('error')
    })
}

exports.postManagerSignupPage = async(req,res)=>{
    try{
        const managerExist = await managerData.findOne({ ManagerEmail : req.body.msignmail })
        if(managerExist){
            req.flash("error","user already exist")
            return res.redirect('/manager/signup')
        }
        bcrypt.hash(req.body.msignpass,saltrounds,(err,hash)=>{
            if(err){
                console.log(err);
                return res.status(500).send("error in hashing password")
            }
            const manager = new managerData({
                ManagerName : req.body.msignname,
                Password : hash,
                ManagerEmail : req.body.msignmail,
                ManagerNumber : req.body.msignnumber,
                verified :false
            })
            manager.save().then(()=>{
                console.log("manager added to db not verified");
                return res.redirect('/manager/login')

            })

            
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send("internal servr error")
    }
}

exports.getManagerLoginPage = (req,res) => {

    res.render('manager/login',{
        error : req.flash("error"),
    })
}

exports.postManagerLoginPage = async(req,res)=>{
    const { mname , mpassword } = req.body;
    try{
        const managername = await managerData.findOne({ ManagerName : mname });
        if(!managername){
            req.flash('error',"Invalid User or user not exist")
            return res.redirect('/manager/login')
        }
        const isMatch = await bcrypt.compare( mpassword, managername.Password );
        if(!isMatch){
            req.flash("error","Password not matching");
            return res.redirect('/manager/login');
        }
        if(!managername.verified){
            req.flash("error","Account not verified by admin please contact admin.")
            return res.redirect('/manager/login');
        }else{
            console.log("Manager founded");
        }

        req.session.managerAuth = true;
        console.log("manager session turned on ");
        return res.redirect("/manager/dashboard")
    }catch(error){
        console.log(error);
        res.status(500).send(" server error Login")
    }
}


exports.getManagerDashboard = (req,res)=>{
    res.render('manager/managerDashboard')
}





exports.getManagerMenuPage = async (req,res) => {
    const myCategory = await category.find({}).lean()
    res.render('manager/menu', { myCategory })
}
exports.getManagerAddCategoryPage = (req,res) => {
    res.render('manager/add-category')
}
exports.postManagerAddCategoryPage =  (req,res) => {
    const myCategory =  new category({
        name : req.body.categoryname,
        description : req.body.categorydescription
    })
    myCategory.save().then(() => {
        console.log("Category Added!!")
    }).catch((err) => {
        console.log(err) 
    })
    res.redirect('/manager/menu')
}

exports.getManagerAddItemPage = (req,res) => {
    res.render('manager/add-items') 
}

 
exports.postManagerAddItemPage =  (req,res) => {
    const myItem =  new items({
        name : req.body.itemname,
        description : req.body.itemdescription
    })
    myItem.save().then(() => {
        console.log("Item Added!!") 
    }).catch((err) => {
        console.log(err) 
    })
    res.redirect('/manager/menu/menu-items')
}

exports.getManagerMenuItemPage = async (req,res) => {
    const myItems = await items.find({}).lean()
    res.render('manager/menu-items', { myItems })
}

exports.getManagerLogout = (req,res)=>{
    req.session.managerAuth = false
    console.log(req.session.managerAuth + " manager turned false");
    return res.redirect('/')

}