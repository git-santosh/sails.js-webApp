/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection:'osisData',
  	schema:true,
  	autoPK: true,

  	autoCreatedAt: false,
 	autoUpdatedAt: false,
	attributes: {
			name:
				 {
							type:'string', 
							required:true			
				},
			user_name: {
							type:'string', 
							required: true,
							unique: true
						},
			email:{
							type:'string',
							email:true,
							unique:true,
							required:true		
				},			
			phone:{
							type: 'string', 
							required: false
				},
			phone_other: {
							type: 'string', 
							required: false
						},
			mobile_phone: {
							type: 'string', 
							required: false
						},
			what_i_do: {
							type: 'string', 
							required: false
						},
			encryptedPassword :
				{
							type :'string'//columnName:'password'
				},
			isAdmin:
			   {
							type:'boolean',
							defaultsTo:false
	},
	toJSON:function(){
						var obj = this.toObject();
						delete obj.password;
						delete obj.confirmation;
						delete obj.encryptedPassword;
						delete obj._csrf;
						return obj;
				 }
},
	/*beforeValidation:function(values,next){
			console.log('beforeValidation data \n' + JSON.stringify(values));
			console.log('values.isAdmin[0] '+ values.admin[0]);
			console.log('values.isAdmin[1] '+ values.admin[1]);
			if(typeof values.admin !== 'undefined'){
				if(values.admin === 'unchecked'){
						values.isAdmin=false;
					}else if(values.admin[1] === 'on'){
						values.isAdmin =true;
						}	
			}
				next();
		},
	beforeCreate:function(values, next){
		console.dir('password info '+values);
			if(!values.password || values.password != values.confirmation)
			{
				console.log('before create error called');
				return next({ err:["password does't match password confirmation"]});
							
			}
				require('bcrypt').hash(values.password, 10 ,function passwordEncrypted(err,encryptedPassword){
					if(err) return next(err);
						values.encryptedPassword= encryptedPassword;
						console.log('before create password varified called');
						next();
				});
	}*/
};
