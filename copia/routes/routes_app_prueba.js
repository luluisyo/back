var express = require("express");
var router = express.Router();
var Post = require("../models/post");

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

router.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

router.post('/add_post', (req, res) => {
	var db = req.db;
	var title = req.body.title;
	var description = req.body.description;
	var new_post = new Post({
		title: title,
		description: description
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

router.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

router.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

router.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})


module.exports = router;