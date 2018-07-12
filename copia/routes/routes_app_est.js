var express = require("express");
var Imagen = require("../models1/imagenes");
var router = express.Router();
var image_finder_middleware = require("../middlewares/find_image");
var models = require('../models/index');

var path = require('path');
var hogan = require('hogan.js');
var fs = require('fs');

var sendgrid  = require('sendgrid')('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');


router.get("/",function(req,res){
res.render("view_est/home_est");
});


router.get("/mostrarnotas/:id",function(req,res){
models.Estudiante.findAll({where: {
    per_id: req.params.id
  }}).then(est => {
models.sequelize.query('select m.mat_des,(select nota from "Nota" where id=n.id and per='+"'1'"+') as nota1,(select nota from "Nota" where id=n.id and per='+"'2'"+') as nota2,(select nota from "Nota" where id=n.id and per='+"'3'"+') as nota3 from "Nota" n, "Materia" m where n.id_est='+est[0].id+' and m.id=n.id_mat')
.then(not => { 
  console.log(not[0]);
   res.send({not: not[0]});
  })
})
});



router.get("/obser/:id",function(req,res){
models.Estudiante.findAll({where: {
    per_id: req.params.id
  }}).then(est => {
models.sequelize.query('select o.fecha,o.obser_des,(select nombre||'+ "' '"+'||apellido_pat||'+ "' '"+'||apellido_materno from "Personas" where pr.per_id=doc_identidad) as prof,(select nombre from "Personas" where e.per_id=doc_identidad) as est from "Observacions" o, "Profesors" pr, "Estudiantes" e where o.prof_id=pr.id and e.id=o.est_id and e.id='+est[0].id)
.then(obs => { 
  console.log(obs[0]);
   res.send({obs: obs[0]});
  })
})
});

router.get("/estudent/:id",function(req,res){
models.sequelize.query('select distinct p.nombre||p.apellido_pat||p.apellido_materno as nombre,t.mail from "Personas" p, "Estudiantes" e, "Inscripcions" i,"Tutors" t where e.per_id=p.doc_identidad and e.id=i.est_id and t.id=i.tuto_id and e.id='+req.params.id)
.then(est => { 
  console.log(est[0]);
   res.send({est: est[0]});
  })
});


router.post("/obser1",function(req,res){
models.Profesor.findAll({where: {
    per_id: req.body.id_prof
  }}).then(est => {
var id_est=req.body.id_est;
var ob = req.body.ob;
var fecha = req.body.fecha;
var mail = req.body.mail;
var obser=new models.Observacion({
obser_des:ob,fecha:fecha,est_id:id_est,prof_id:est[0].id	
})
obser.save().then(estud =>{



var  receiver = mail;

  var mailConfig = {
    to:       receiver,
    from:     'Colegio_Nacional_Mixto_Simon_Bolivar',
    subject:  'Muy Buenas!',
    html:     '<html xmlns="http://www.w3.org/1999/xhtml"> <head> Importante </head> <body>'+ req.body.ob +'</body> </html>'
  }
  
  sendgrid.send(mailConfig, function(err, json) {
    
    var titulo = 'Email enviado correctamente';
    var texto = 'El email se ha enviado a la siguiente dirección: ' + receiver;
    
    if (err) {
      titulo = 'Se ha producido un error';
      texto = err;
    }
   
  });  


res.send({
    success: true
    })
})
})
});




module.exports=router;