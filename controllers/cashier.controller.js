const cashierdata = require('../models/cashierData')
const bcrypt = require('bcryptjs')
const saltrounds = 10
exports.getCashierPage = (req,res) => {
    res.send("Cashier Page")
}

exports.getCashierLoginPage = (req,res) => { 

    res.render('cashier/login', {
        error: req.flash("error"),
    });
} 

exports.postCashierLoginPage = async(req,res)=>{
    const { cname , cpassword } = req.body
    try{
        const cashier = await cashierdata.findOne({ CashierName : cname })
        if(!cashier){
            req.flash("error","Invalid User or User not exist")
            return res.redirect('/cashier/login')
        }
        const isMatch = await bcrypt.compare(cpassword ,cashier.Password)
        if(!isMatch){
            req.flash("error","Invalid Password")
            return res.redirect("/cashier/login")
        }else{
            console.log("cashier found ");
        }
        if(!cashier.verified){
            req.flash("error", "Your account is waiting for the verification from admin")
            return res.redirect('/cashier/login');
        }

        req.session.cashierAuth = true
        console.log('session turned on');
        console.log(req.session.cashierAuth);
        return res.redirect("/cashier/cashierDashboard")
    }catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }


}

exports.getCashierDashboard = (req,res)=>{
    res.render('cashier/cashierDashboard')
}

exports.getCashierSignup = (req,res)=>{

    res.render('cashier/signup',{
        error : req.flash('error'),
    })
}
        
 

exports.postCashierSignup = async(req,res)=>{
    try{
        const cashierexist = await cashierdata.findOne({ CashierEmail : req.body.csignmail})
        if(cashierexist){
            req.flash("error","Already account created")
            return res.redirect('/cashier/signup')
        }
        bcrypt.hash(req.body.csignpass,saltrounds,(err,hash)=>{
            if(err){
                console.log(err);
                return res.status(500).send('error in hasing password')
            }
            const cashier = new cashierdata({
                CashierName : req.body.csignname,
                Password : hash,
                CashierEmail : req.body.csignmail,
                CashierNumber : req.body.csignnumber,
                verified : false
            })
            cashier.save().then(()=>{
                console.log("cashier is added to db not verified ");
                res.redirect('/cashier/login')
            })

            

        })
    }
    catch(error){
        console.log(error);
        res.status(500).send("internal server error most probabaly because of db error")
    }
}




exports.getCashierLogout = (req,res)=>{
    req.session.cashierAuth = false
    console.log("session turned false cashier")
    console.log(req.session.cashierAuth);
    return res.redirect('/')
}