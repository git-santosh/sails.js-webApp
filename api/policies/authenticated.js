module.exports=function (req,res,next) {
  // body...
  if (req.session.authenticated) {
    
    return next();
  }
  else{
    var loginAuthError =[{name:"loginAuthError", message :" you must be sign in"}]
    req.session.flash={
      err:loginAuthError
    }
    res.redirect('/session/login');
    return;
  }
}