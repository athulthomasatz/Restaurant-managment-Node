const Category = require('../models/Category')
const Item = require('../models/Item')
const session = require('express-session')


exports.getWelcomePage = (req,res)=>{ 
    
    res.render('guest/welcome')
}


exports.getGuestMenu = async(req,res)=>{
    try {
        // Retrieve all the categories
        const categories = await Category.find({}).lean();
    
        // Render the menu page with the categories
        res.render('guest/menu', { categories });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error'); 
      }
}

exports.getGuestItems = async(req,res)=>{
    try {
        const { categoryName } = req.params;
        console.log(categoryName + " categoryname");
    
        // Retrieve the category with the given name
        const category = await Category.findOne({ name: categoryName }).lean();
        console.log(category);
    
        // Retrieve all the items that belong to that category
        const items = await Item.find({ category: category._id }).lean();
        console.log(items + "items!!!")
        // Render the category page with the items
        res.render('guest/menu-items', { category, items });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
}