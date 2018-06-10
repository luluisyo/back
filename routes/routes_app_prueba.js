var express = require("express");
var router = express.Router();


var models = require('../models/index');


router.get("/login", function(req,res){
res.render("login");});

router.post("/sessions", function(req,res){
models.Usuario.findAll({
where:{
  user: req.body.email,
  password: req.body.password} 
	}).then(user => {
  	if(user[0]==undefined)
  		{res.redirect('/login');}else{
  	req.session.user_id = user[0].dataValues.id;}
	if(user[0].dataValues.tipo==1){res.redirect("/app_est");}
	if(user[0].dataValues.tipo==2){res.redirect("/app_profes");}
	if(user[0].dataValues.tipo==3){res.redirect("/app_admin");}
	
  });
});

router.get("/pais", function(req,res){
models.Pais.findAll({}).then(pais => {
  	res.send({
			pais: pais
		})
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });
});







module.exports = router;