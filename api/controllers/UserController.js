/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*module.exports = {
	
};
*/
module.exports = {
	register:function(req,res){
		//res.locals.flash=_.clone(req.session.flash);
		res.view();
		//req.session.flash={};
	},
	login:function(req,res){
		//res.send('Wel-come to BRG '); 
		res.view();
		
	},
	create:function(req,res,next){
		var params= req.params.all();
		console.log('Param while create '+ JSON.stringify(params));
		//sails.log( JSON.stringify(req.params.all()));
		User.create(params,function userCreated(err,user){
			if(err)
			{
				 console.log(err);
				// return next(err);
				req.session.flush={
					err:err.ValidationError
				}
				
			 return res.redirect('/user/register');
			}
			req.session.authenticated=true;
			
			req.session.User=user;

			sails.log.debug('Success', JSON.stringify(user));
			//res.json('Thank you from Registration'+ params.name);
			res.redirect('/user/show/'+user.id);
			//req.session.flash={};
		});
		//res.view();
	},
	new:function(req,res){
		res.view();
	},
	dashbord:function(req,res){
		res.view();
	},
	show:function(req,res,next){
		
		User.findOne(req.param('id'),function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user:user
			});
		});
	},
	edit:function(req,res,next){
		var id=req.param('id');
		User.findOne(id,function foundUser(err,user){
			if(err) return next(err);
			if(!User) return next();
			console.log(user);
			res.view({
				user:user
			});
		});
	},
	update:function(req,res,next){
		
		var id=req.param('id');
		User.update(id,req.params.all(),function userUpdated(err){
			if(err)
			{
				
				 return res.redirect('/user/edit/'+id);
			}
			if(req.method === 'GET')
			{
			   return res.json({'status':'GET not allowed'});      
			}
			  sails.log.debug('We have entered the uploading process ');
			  
			  req.file('userPhoto').upload({
			   dirname:'../../assets/images/'},function(err,files){
			   sails.log.debug('file is :: ', +files);
			    maxBytes: 10000000;
			   if (err) return res.serverError(err);        
			   console.log(files);
			      //res.json({status:200,file:files});
			   });

			return res.redirect('/user/show/'+id);

		});
	},
	destroy:function(req,res,next){
		User.findOne(req.param('id'),function findOne(err,user){
			if(err) return next(err);

			if(!user) return next('user doesn\'t Exit.');

			User.destroy(req.param('id'),function removeMe(err,remove){
				 if(err) return next(err);

				 res.redirect('/user');	
			});
		});
	},
	index:function(req,res,next){
		User.find(function foundUsers(err,users){
			if(err) return next(err);
			//console.log(new Date());
			//console.log(req.session.authenticated);
			res.view({
				users:users
			});
		});
	}
};

