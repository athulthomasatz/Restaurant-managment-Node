const category = require('../models/Category')
const items = require('../models/Item')


exports.getManagerPage = (req,res) => {
    res.send("Kitchen Manager Page")
}

exports.getManagerLoginPage = (req,res) => {
    res.render('manager/login')
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