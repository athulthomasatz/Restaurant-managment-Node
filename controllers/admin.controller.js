const staffDB = require('../models/staffData')

exports.getAdminPage = (req,res) => {
    res.send("Admin Page")
}

exports.getAdminLoginPage = (req,res) => { 
    res.render('admin/login')
}

exports.postAdminloginPage = (req,res)=>{
    const { adminname ,adminpass } = req.body
    const adminName = 'superadmin';
    const adminPassword = '123';
    if( adminName == adminname && adminPassword == adminpass)
    {
      

        req.session.admin = adminName;
        req.session.adminAuth = true;
        console.log(req.session.adminAuth)
        res.render('admin/dashboard')
    } 
    else{
        res.redirect('/admin/login')
    }
    
}

exports.getStaffVerifyPage = async(req,res)=>{
  try {
      const staffList = await staffDB.find({ verified: false }).lean();
      
      res.render('admin/verifyStaff', { staffList });
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error")
    }
  
}


  exports.postStaffVerifyById = async (req, res) => {
    try {
      const staffId = req.params.id;
      console.log(staffId)
      await staffDB.findByIdAndUpdate(staffId, { verified: true });
    //   res.sendStatus(200);
      console.log("staff verified to true")
      res.redirect('/admin/verifyStaff') 
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };



  // exports.getStaffVerifyPageById = async (req, res) => {
  //     try {
  //       const staffId = req.params.id;
  //       const staff = await staffDB.findById(staffId).lean();
  //       res.render('admin/verifyStaffById', { staff });
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).send('Internal server error');
  //     }
  //   };

// exports.postStaffVerifyPage = async(req,res)=>{
//     try {
//         const staffId = req.params.id;
//         await staffDB.findByIdAndUpdate(staffId, { verified: true },{ new: true });
//         res.redirect('/admin/verifyStaff');
//       } catch (error) {
//         console.log(error);
//         res.status(500).send("internal server error");
//       }

// }