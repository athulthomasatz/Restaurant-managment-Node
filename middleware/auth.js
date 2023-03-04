
module.exports = {
        verifyAuth : (req,res,next) => {
            if(req.session.useId) {
                next()
            } else {
                res.redirect('/user/login')  
            } 
        },
        verifyAdminAuth :(req,res,next)=>{
            if(req.session.adminAuth){
                next()
            }else{
                res.redirect('/admin/login')
            }
        },
        verifyStaffAuth : (req,res,next)=>{
            if(req.session.staffAuth){
                next()
            }else{
                res.redirect('/staff/login')
            }
        },
        verifyManagerAuth : (req,res,next)=>{
            if(req.session.managerAuth){ 
                next()
            }else{
                res.redirect('/manager/login')
            }
        }
        
    
} 