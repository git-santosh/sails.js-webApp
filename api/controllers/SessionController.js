/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
	login:function (req,res) {
		//var objDate=new Date();
		//var setDate=new Date(objDate.getTime() +60000);
		//req.session.cookie.expires=setDate;
		req.session.authenticated=true;
		console.log(req.session);

		res.view('session/login');
		// body...
	},
	validate:function(req,res,next){
		console.log('in to function');
		if(!req.param('email') || !req.param('password'))
		{
			var userNamePasswordRequiredError=[{name:"userNamePasswordRequired", message:"you must enter both a uername and password"}];
			req.session.flash={
				err:userNamePasswordRequiredError
			}
			res.redirect('/session/login');
			return;
		}
		User.findOneByEmail(req.param('email'),function foundUser(err,user){
			if(err) return next(err);
			
			if(!user)
			{
				var noAccountError=[{name:"noAccount",message:"the email address "+req.param('email')+' not found. !'}]
				req.session.flash={
					err:noAccountError
				}
				res.redirect('session/login');
				return;
			}
			var userEnteredPass=req.param('password');
			
			/*if(user.encryptedPassword ==userEnteredPass)
			{*/
			bcrypt.compare(userEnteredPass, user.encryptedPassword, function(err, match) {
				  if (err) return next(err);

				  if (match)
				  {
				  	console.log('match'+match);
				    var objDate=new Date();
					var setDate=new Date(objDate.getTime() +300000);
					req.session.cookie.expires=setDate;
					req.session.authenticated=true;
					req.session.User=user;
					
					if(req.session.User.isAdmin)
					{
						res.redirect('/user');
						return;
					}
					res.redirect('/user/show/'+user.id);
				  } 
				  else
				  {
				    var userPasswordMissMatchErr=[{name:"userPasswordMissMatch",message:"please entered correct password"}]
					req.session.flash={
						err:userPasswordMissMatchErr
					}
					res.redirect('session/login');
					return;
				  }
				});
				
			
			
		});
	},
	destroy:function (req,res,next){
		req.session.destroy();
		res.redirect('/session/login');
	}
};

