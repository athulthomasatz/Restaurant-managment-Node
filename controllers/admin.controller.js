const staffDB = require('../models/staffData')
const cashierDB = require('../models/cashierData')
const managerDB = require('../models/managerData')
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
        // console.log(req.session.adminAuth)
        return res.redirect('/admin/dashboard')
    } 
    else{
        return res.redirect('/admin/login')
    }
    
}

exports.getAdminDashboard = (req,res)=>{
  res.render('admin/dashboard')
}


exports.getCashierVerifyPage = async(req,res)=>{
  try{
    const cashierList = await cashierDB.find({ verified : false }).lean();
    res.render('admin/verifyCashier',{ cashierList })
  }catch(error){
    console.log(error);
    res.status(500).send("intera server error")
  }
  
}

exports.postCashierVerifyById = async (req, res) => {
  try {
    const cashierId = req.params.id;
    console.log(cashierId)
    await cashierDB.findByIdAndUpdate(cashierId, { verified: true }); 
  //   res.sendStatus(200);
    console.log("staff verified to true")
    res.redirect('/admin/verifyCashier') 
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


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

  exports.getManagerVerifyPage = async(req,res)=>{
    try{
      const managerList = await managerDB.find({ verified : false }).lean();
      res.render('admin/verifyManager',{ managerList })
    }catch (error) {
      console.log(error);
      res.status(500).send("internal server error")
    }
    
  }

  exports.postManagerVerifyById = async(req,res)=>{ 
    try{
    const managerId = req.params.id;
    console.log(managerId);
    await managerDB.findByIdAndUpdate( managerId,{ verified : true });
    console.log("manager verified to true");
    res.redirect('/admin/verifyManager');
    }catch(error){
      console.log(error);
      res.sendStatus(500);
    }
    
  }
  

  exports.getLogoutAdmin = (req,res)=>{
    req.session.admin = null
    req.session.adminAuth = false
    return res.redirect('/')

  }

























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