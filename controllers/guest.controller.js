const category = require('../models/Category')
const items = require('../models/Item')
const session = require('express-session')


exports.getWelcomePage = (req,res)=>{
    
    res.render('guest/welcome')
}


exports.getGuestMenu = async(req,res)=>{
    const menuCategory = await category.find({}).lean()
    res.render('guest/menu',{ menuCategory })
}

exports.getGuestItems = async(req,res)=>{
    const menuItems = await items.find({}).lean()
    res.render('guest/menu-items',{ menuItems })
}