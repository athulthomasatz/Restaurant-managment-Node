
exports.getCashierPage = (req,res) => {
    res.send("Cashier Page")
}

exports.getCashierLoginPage = (req,res) => {
    res.render('cashier/login')
}