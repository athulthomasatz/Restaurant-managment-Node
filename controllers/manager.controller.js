const Category = require('../models/Category')
const Item = require('../models/Item')
const managerData = require('../models/managerData')  
const { v4 } = require('uuid')
const bcrypt = require('bcryptjs')
const saltrounds = 10 
const path = require('path');

const bodyParser = require('body-parser');


exports.getManagerPage = (req, res) => {
    res.send("Kitchen Manager Page")
}

exports.getManagerSignupPage = (req, res) => {
    res.render('manager/signup', {
        error: req.flash('error')
    })
}

exports.postManagerSignupPage = async (req, res) => {
    try {
        const managerExist = await managerData.findOne({ ManagerEmail: req.body.msignmail })
        if (managerExist) {
            req.flash("error", "user already exist")
            return res.redirect('/manager/signup')
        }
        bcrypt.hash(req.body.msignpass, saltrounds, (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).send("error in hashing password")
            }
            const manager = new managerData({
                ManagerName: req.body.msignname,
                Password: hash,
                ManagerEmail: req.body.msignmail,
                ManagerNumber: req.body.msignnumber,
                verified: false
            })
            manager.save().then(() => {
                console.log("manager added to db not verified");
                return res.redirect('/manager/login')

            })


        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("internal servr error")
    }
}

exports.getManagerLoginPage = (req, res) => {

    res.render('manager/login', {
        error: req.flash("error"),
    })
}

exports.postManagerLoginPage = async (req, res) => {
    const { mname, mpassword } = req.body;
    try {
        const managername = await managerData.findOne({ ManagerName: mname });
        if (!managername) {
            req.flash('error', "Invalid User or user not exist")
            return res.redirect('/manager/login')
        }
        const isMatch = await bcrypt.compare(mpassword, managername.Password);
        if (!isMatch) {
            req.flash("error", "Password not matching");
            return res.redirect('/manager/login');
        }
        if (!managername.verified) {
            req.flash("error", "Account not verified by admin please contact admin.")
            return res.redirect('/manager/login');
        } else {
            console.log("Manager founded");
        }

        req.session.managerAuth = true;
        console.log("manager session turned on ");
        return res.redirect("/manager/dashboard")
    } catch (error) {
        console.log(error);
        res.status(500).send(" server error Login")
    }
}


exports.getManagerDashboard = (req, res) => {
    res.render('manager/managerDashboard')
}


exports.getAddCategoryPage = (req, res) => {
    res.render('manager/addcategory')
  }

  exports.postAddCategoryPage = (req, res) => {
    let sampleFile;
    let uploadPath;
    if(!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).json({"message":"No file were uploaded"})
    }
    sampleFile = req.files.sampleFile
    const imageExtension = sampleFile.name.split('.')[1]
    const uploadUrl = v4() + `.${imageExtension}`;
    uploadPath = path.join(__dirname,'..','public','uploads', uploadUrl )
    console.log(uploadPath)
    sampleFile.mv(uploadPath, function(err){
        if(err) {
            return res.status(500).send(err)
        }
    })

    const newCategory = new Category({
      imageUrl : uploadUrl,
      name: req.body.categoryname,
      description : req.body.categorydescription
    })
  
    newCategory.save()
      .then(() => {
        console.log('New category added to the database')
        res.redirect('/manager/dashboard')
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error adding category to database')
      })
  }

  exports.getAddItemPage = async(req, res) => {
    try {
        const categories = await Category.find().lean();
        res.render('manager/additem', { categories });
      } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
      }
  }

  exports.postAddItemPage = (req, res) => {

    let sampleFile;
    let uploadPath;
    if(!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).json({"message":"No file were uploaded"})
    }
    sampleFile = req.files.sampleFile
    const imageExtension = sampleFile.name.split('.')[1]
    const uploadUrl = v4() + `.${imageExtension}`;
    uploadPath = path.join(__dirname,'..','public','uploads', uploadUrl )
    console.log(uploadPath)
    sampleFile.mv(uploadPath, function(err){
        if(err) {
            return res.status(500).send(err)
        }
    })

    const newItem = new Item({
      imageUrl : uploadUrl,
      name: req.body.itemname,
      price: req.body.itemprice,
      description : req.body.itemdescription,
      category: req.body.category
    })
  
    newItem.save()
      .then(() => {
        console.log('New item added to the database')
        res.redirect('/manager/dashboard')
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error adding item to database')
      })
  }


  exports.getManagerMenuPage = async (req, res) => { 
    try {
      // Retrieve all the categories
      const categories = await Category.find({}).lean();
  
      // Render the menu page with the categories
      res.render('manager/category', { categories });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
  };

  exports.getManagerCategoryPage = async (req, res) => { 
    try {
      const { categoryName } = req.params;
      console.log(categoryName + " categoryname");
  
      // Retrieve the category with the given name
      const category = await Category.findOne({ name: categoryName }).lean();
      console.log(category);
  
      // Retrieve all the items that belong to that category
      const itemss = await Item.find({ category: category._id }).lean();
      console.log(itemss)
      // Render the category page with the items
      res.render('manager/category-items', { category, itemss });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };


  exports.getUpdateCat = async (req, res) => { 

    try{
      const categories = await Category.find({}).lean();
      res.render('manager/updatecategory',{ categories })

    }catch(err){
      console.log(err);
      res.status(500).send("Server error in update")
    }
    
  };
  
  exports.getUpdateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      console.log(categoryId + " id!!!!");
      
   
      // Retrieve the category with the given name
      const category = await Category.findById({ _id: categoryId }).lean();
      console.log(category);

      
      // Render the category page with the items
      res.render('manager/updateCategoryForm', { category });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };


  exports.postupdateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { categoryname, categorydescription } = req.body;
      console.log(categoryId);
      console.log(categoryname)
  
      // Find the category and update its name and description
      const category = await Category.findOneAndUpdate(
        { _id: categoryId },
        { name: categoryname, description: categorydescription },
        { new: true }
      );
      // const items = await Item.find({ category: category._id }).lean();
      // console.log(items)
      
  
      // Redirect to the category page with the updated data
      return res.redirect(`/manager/category`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  