var express = require("express");

var router = express.Router();

router.get("/",function(req,res){
res.render("view_profes/home_profes");
});

router.get("/removeSesion", function(req, res){
        //eliminamos las sesiones y redirigimos
        req.session.destroy();
    	res.redirect("/login");
    });







module.exports=router;