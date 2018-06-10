var models = require("../models/index");
module.exports = function(req,res,next){
	if(!req.session.user_id){
		res.redirect("/login");
	}else{
		models.Usuario.findAll({
	where: {id: req.session.user_id
  }}).then(user1 => {
	if(user1[0].dataValues.tipo==1){
	res.locals = {user: user1[0].dataValues};	
				next();
	}else{if(user1[0].dataValues.tipo==3){res.redirect('/admin');}
			if(user1[0].dataValues.tipo==2){res.redirect('/prof');}}
});
	}
}




