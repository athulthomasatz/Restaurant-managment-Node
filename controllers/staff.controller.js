const staffDB = require('../models/staffData') 
const bcrypt = require('bcryptjs')
const saltrounds = 10

exports.getStaffPage = (req, res) => {
    res.send("Staff Page")
}

exports.getStaffLoginPage = (req, res) => {
    res.render('staff/login', {
        error: req.flash("error"),
    });
};


exports.postStaffLoginPage = async (req, res) => {

    const { staffname, staffpass } = req.body
    try {
        const staff = await staffDB.findOne({ StaffName: staffname })
        if (!staff) {
            return res.status(401).send("Invalid user or username")
        }
        const isMatch = await bcrypt.compare(staffpass,staff.Password);
        if(!isMatch){
            req.flash("error","Invalid Password")
            return res.redirect("/staff/login")
        }else{
            console.log("staff found and password founded");
        }
        if (!staff.verified) {
            // Staff member not verified, render error message
            req.flash("error", "Your account is waiting for the verification from admin")
            return res.redirect('/staff/login');

        }

        req.session.staffAuth = true
        console.log('session turned on');
        console.log(req.session.staffAuth);
        return res.redirect("/staff/staffDashboard")

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }


}

exports.getStaffDashboard = (req, res) => {
    res.render('staff/staffDashboard')

}


exports.getStaffSignupPage = (req, res) => {

    res.render('staff/signup')
}



exports.postStaffSignupPage = async (req, res) => {
    try {
        const staffexist = await staffDB.findOne({ StaffEmail: req.body.ssignmail })
        if (staffexist) {
            console.log("Staff already exist!!!!")
            return res.redirect('/staff/signup')
        }
        bcrypt.hash(req.body.ssignpass, saltrounds, (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error hashing password')
            }
            const staff = new staffDB({
                StaffName: req.body.ssignname,
                Password: hash,
                StaffEmail: req.body.ssignmail,
                verified: false
            })
            staff.save().then(() => {
                console.log("staff added to database not verified")
                res.redirect('/staff/login')

            })
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("internal server error")
    }

} 

exports.getStaffLogout = (req,res)=>{
    req.session.staffAuth = false
    console.log("session turned false staff")
    console.log(req.session.staffAuth);
    return res.redirect('/')
}