module.exports=function (req,res,ok) {
		
		var id=req.session.User.id;
		console.log('user id '+ id);
		var loginId= req.param('id');
		console.log('login id '+ loginId);
		var compair= id==loginId;
			console.log('id==loginId '+ compair);
		var sessionUserMatchId= compair;
	
		var isAdmin=req.session.User.isAdmin;
		console.log('admin '+ isAdmin);
		if(!(sessionUserMatchId || isAdmin))
		{
					var noRights=[{name:'noRights', message:" you must be an admin"}];
					req.session.flash={
						err:noRights
					}
					res.redirect('/session/login');
    				return;	
		}
		ok();

};