module.exports=function (req,res,ok) {
  // body...
  if (req.session.User && req.session.User.isAdmin) {
    
    return ok();
  }
  else{
    var AdminAuthError =[{name:"AdminAuthError", message :" you must be a Admin"}]
    req.session.flash={
      err:AdminAuthError
    }
    res.redirect('/session/login');
    return;
  }
}