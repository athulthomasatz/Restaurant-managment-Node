const Category = require('../models/Category')
const Item = require('../models/Item')
const managerData = require('../models/managerData') 
const bcrypt = require('bcryptjs')
const saltrounds = 10 


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
    const newCategory = new Category({
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
    const newItem = new Item({
      name: req.body.itemname,
      price: req.body.itemprice,
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
      const items = await Item.find({ category: category._id }).lean();
      console.log(items)
      // Render the category page with the items
      res.render('manager/category-items', { category, items });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  





























// exports.getManagerMenuPage = async (req, res) => {
//     try {
//         const categories = await categoryModel.find().lean();
//         const items = await itemModel.find().lean();
//         const categorizedItems = {};
    
//         // Group items by category
//         categories.forEach(category => {
//           categorizedItems[category._id] = {
//             name: category.name,
//             items: items.filter(item => item.category.toString() === category._id.toString())
//           };
//         });
    
//         res.render('manager/menu', { categorizedItems });
//       } catch (err) {
//         console.error(err);
//         res.redirect('/manager/dashboard');
//       }
//     // const myCategory = await category.find({}).lean()
//     // res.render('manager/menu', { myCategory })
// }
// exports.getManagerAddCategoryPage = (req, res) => {
//     res.render('manager/add-category')
// }
// exports.postManagerAddCategoryPage = (req, res) => {
//     const myCategory = new category({
//         name: req.body.categoryname,
//         description: req.body.categorydescription
//     })
//     myCategory.save().then(() => {
//         console.log("Category Added!!")
//     }).catch((err) => {
//         console.log(err)
//     })
//     res.redirect('/manager/menu')
// }


// exports.getManagerAddItemPage = async (req, res) => {
//     const categories = await category.find({}).lean();
//     res.render('manager/add-items', { categories });
// }

// exports.postManagerAddItemPage = async (req, res) => {
//     try {
//         const myItem = new items({
//             name: req.body.itemname,
//             description: req.body.itemdescription,
//             price: req.body.itemprice,
//             category: req.body.itemcategory
//         })
//         await myItem.save()
//         console.log("item added!");
//         res.redirect('/manager/menu/menu-items')

//     } catch (err) {
//         console.log(err);
//         res.redirect('/manager/menu')
//     }

// }

// exports.getManagerMenuItemPage = async (req, res) => { 
//     try {
//         const categories = await category.find().lean();
//         const allitems = await items.find().lean();
//         const categorizedItems = {};

//         // Group items by category
//         categories.forEach(category => {
//             categorizedItems[category._id] = {
//                 name: category.name,
//                 items: allitems.filter(item => item.category.toString() === category._id.toString())
//             };
//         });

//         res.render('manager/menu-items', { categorizedItems });
//     } catch (error) {
//         console.log(error);
//         res.redirect('/manager/menu');
//     }
// }

// exports.getManagerLogout = (req, res) => {
//     req.session.managerAuth = false
//     console.log(req.session.managerAuth + " manager turned false");
//     return res.redirect('/')

// }