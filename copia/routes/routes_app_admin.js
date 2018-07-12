var Imagen = require("../models1/imagenes");
var express = require("express");
var router = express.Router();

var models = require('../models/index');

router.get("/",function(req,res){
res.render("view_admin/home_admin");
});

router.get("/pais", function(req,res){
models.Pais.findAll({where: {pais_des: 'BOLIVIA'}}).then(pais => {
  	res.send({
			pais: pais
		})
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });
});


router.get("/pais/nuev", function(req,res){
    var pais_de = 'ecuador';
	var pais = new models.Pais({
		pais_des: pais_de})
	var depart = 'juanicuna';
	
	pais.save().then(pais => {
  	var depa = new models.Departamento({
		departamento_des: depart,
		pais_id: pais.id
		})
  	depa.save().then(depat => {
res.send({
			pais: pais,depa: depat
		})

  	})
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });

});


router.post("/add_user", function(req,res){
    var ci = req.body.ci;
    var exp = req.body.ex;
    var nombre = req.body.nombre;
	var paterno = req.body.paterno;
	var materno = req.body.materno;
	var domicilio = req.body.domicilio;
	var correo = req.body.correo;
	var celular = req.body.celular;
	var pais = req.body.pais;
	var depto = req.body.depto;
	var prov = req.body.prov;
	var sexo = req.body.sexo;
	var ts = req.body.ts;
	var ec = req.body.ec;
  var tipo = req.body.tipo;

	var lugar = new models.Lug_nac({
		paisid: pais, depid: depto ,proid: prov

	})

	lugar.save().then(lug => {
  	var persona = new models.Persona({
		doc_identidad: ci,
  tipo_doc: exp,
  nombre: nombre,
  apellido_pat: paterno,
  apellido_materno: materno,
  domicilio: domicilio,
  sexo: sexo,
  fecha_nac: 'sdfs',
  cel: celular,
  correo: correo,
  ts_id: ts,
  lc_id: lug.id,
  ec_id: ec
		})
  	persona.save().then(per => {
	var usu = new models.Usuario({
    user: ci,
    password: ci,
    tipo: tipo,
    estado: 1,
    per_id: ci
  })
  usu.save().then(usu => {
if(tipo==1){var curri=req.body.a_curri;var des=req.body.a_des;var ingreso=req.body.a_ingreso;
var admi = new models.Administrativo({
Descripsion: des,año_ingreso: ingreso, id_curr: curri,per_id: ci
})
admi.save().then(adminis =>{
res.send({
    success: true
    })
})
}
if(tipo==2){var anti=req.body.p_anti;var currip=req.body.p_curri;var grado=req.body.p_grado;
var prof = new models.Profesor({
prof_ant: anti, grad_acad: grado, curriculum: currip,per_id: ci
})
prof.save().then(profes =>{
res.send({
    success: true
    })
})
}
if(tipo==3){var rude=req.body.e_rude;var ingresoest=req.body.e_ingreso
var est = new models.Estudiante({
cod_est: rude, gestion_ing: ingresoest,per_id: ci
})
est.save().then(estud =>{
res.send({
    success: true
    })
})
}

  })
  	})
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });

});






router.get("/depto/:id", function(req,res){
models.Departamento.findAll({where: {
    pais_id: req.params.id
  }}).then(depto => {
  	res.send({
			depto: depto
		})
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.get("/prov/:id", function(req,res){
models.Provincia.findAll({where: {
    depid: req.params.id
  }}).then(prov => {
  	res.send({
			prov: prov
		})
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.get("/materi", function(req,res){
models.Materia.findAll({}).then(mat => {
    res.send({
      mat: mat
    })
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.get("/getmat/:id", function(req,res){
models.Materia.findAll({where: {
    id: req.params.id
  }}).then(mat => {
    res.send({
      mat: mat
    })
  }).catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.post("/add_mat", function(req,res){
var mate=req.body.mat;
var nuevamat = new models.Materia({
  mat_des: mate
})
nuevamat.save()
.then(mat => {
  res.send({success: true});
})
});


router.post("/add_nota", function(req,res){
var id_est=req.body.id_est;
var id_prof=req.body.id_prof;
var id_mat=req.body.id_mat
var id_niv=req.body.id_niv;
var per=req.body.per;
var nota=req.body.nota;

var nuevanota = new models.Nota({
  per: per,nota: nota, id_est:id_est, id_prof:id_prof, id_mat:id_mat,id_niv:id_niv
})
nuevanota.save()
.then(not => {
  res.send({success: true});
})
});

router.post("/add_ins", function(req,res){
var est=req.body.ci_est;
var tut=req.body.ci_tut;
var fecha=req.body.fecha;
var obs=req.body.obs;
var id=req.body.id;
var niv=req.body.niv;

var inscrip = new models.Inscripcion({
 fecha: fecha,obs: obs, tuto_id: tut, est_id: est, par_id: niv, adm_id: id
})
inscrip.save()
.then(ins => {
  res.send({success: true});
})
});


router.get("/datos", function(req,res){
models.Pais.findAll({}).then(pais => {
  models.Departamento.findAll({}).then(depto => {
  models.Provincia.findAll({}).then(prov => {
  models.Tipo_sangre.findAll({}).then(tipsang => {
  models.Estado_civil.findAll({}).then(estciv => {
  res.send({
			pais: pais, depto: depto, prov: prov, ts: tipsang, ec: estciv
		})
  })
  })
  })
  })		
  })
.catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.get("/usuarios/:id",function(req,res){

models.sequelize.query('select p.nombre||'+ "' '"+'||p.apellido_pat||'+ "' '"+'||apellido_materno as nombre,p.doc_identidad,u.estado from "Personas" p, "Usuarios" u where p.doc_identidad = u.per_id and u.tipo='+req.params.id)
.then(users => {
   
   res.send({user: users[0]});
    // We don't need spread here, since only the results will be returned for select queries
  })
});

router.delete("/deleteuser/:id",function(req,res){
models.sequelize.query('delete from "Personas" where doc_identidad='+req.params.id)
.then(users => {
  models.sequelize.query('delete from "Usuarios" where "user"='+"'"+req.params.id+"'")
  .then(users1 => {
   res.send({success: true});
 })
  })
});

router.delete("/deletemat/:id",function(req,res){
models.sequelize.query('delete from "Materia" where id='+req.params.id)
 .then(users1 => {
   res.send({success: true});
 
  })
});

router.delete("/deleteins/:id",function(req,res){
models.sequelize.query('delete from "Inscripcions" where id='+req.params.id)
 .then(users1 => {
   res.send({success: true});
  })
});

router.put("/putestdesactivar/:id",function(req,res){
models.sequelize.query('UPDATE "Usuarios" SET estado=0 WHERE "user"='+"'"+req.params.id+"'")
.then(users => { 
   res.send({success: true});
  })
});

router.put("/contra",function(req,res){
models.sequelize.query('UPDATE "Usuarios" SET password='+"'"+req.body.nueva+"'"+' WHERE "user"='+"'"+req.body.id+"'")
.then(users => { 
   res.send({success: true});
  })
});

router.put("/actualizar_mat",function(req,res){
models.Materia.update({
  mat_des: req.body.mat,
}, { where: { id:req.body.id}
})
.then(users => { 
   res.send({success: true});
  })
});




router.put("/putestactivar/:id",function(req,res){
models.sequelize.query('UPDATE "Usuarios" SET estado=1 WHERE "user"='+"'"+req.params.id+"'")
.then(users => { 
   res.send({success: true});
  })
});


router.get("/inscritos/:id",function(req,res){
models.sequelize.query('select e.id as id_est,i.id,i.fecha,p.nombre||'+ "' '"+'||p.apellido_pat||'+ "' '"+'||p.apellido_materno as nombre,u.user from "Inscripcions" i,"Estudiantes" e,"Personas" p, "Usuarios" u where i.par_id='+req.params.id+' and e.per_id=p.doc_identidad and extract(year from i.fecha)=extract(year from CURRENT_DATE) and i.adm_id=u.id and e.id=i.est_id')
.then(ins => { 
models.sequelize.query('select distinct c.descripcion,m.mat_des,m.id from "Curriculas" c, "Materia" m, "Nivel_paralelos" p where c.mat_id=m.id and p.niv_des=c.descripcion and p.id='+req.params.id)
.then(niv => { 
   res.send({ins: ins[0],niv: niv[0]});
  })
})
});


router.get("/mostrarnotas/:id",function(req,res){
models.sequelize.query('select m.mat_des,(select nota from "Nota" where id=n.id and per='+"'1'"+') as nota1,(select nota from "Nota" where id=n.id and per='+"'2'"+') as nota2,(select nota from "Nota" where id=n.id and per='+"'3'"+') as nota3 from "Nota" n, "Materia" m where n.id_est='+req.params.id+' and m.id=n.id_mat')
.then(not => { 
  console.log(not[0]);
   res.send({not: not[0]});
  })
});



router.get("/materias",function(req,res){
models.Materia.findAll({})
.then(materia => { 
models.sequelize.query('select p.nombre||'+ "' '"+'||p.apellido_pat||'+ "' '"+'||apellido_materno as nombre, pr.id as doc_identidad from "Personas" p, "Profesors" pr where p.doc_identidad=pr.per_id')
.then(profes => {
 models.Aula.findAll({})
 .then(aula => {
models.sequelize.query('select n.id,n.niv_des||'+ "' '"+'||p.par_des as nivel from "Paralelos" p, "Nivel_paralelos" n where p.id=n.par_id')
.then(niv => {
res.send({mat: materia,profes:profes[0],aula:aula,niv:niv[0]});  
})
 }) 
})
  })
});

router.get("/viewest/:id",function(req,res){
models.sequelize.query('select e.id,p.nombre||'+ "' '"+'||p.apellido_pat||'+ "' '"+'||p.apellido_materno as nombre from "Personas" p, "Estudiantes" e where p.doc_identidad=e.per_id and e.per_id='+"'"+req.params.id+"'")
.then(est => {
res.send({est: est[0]});  

  })
});

router.get("/viewtut/:id",function(req,res){
models.sequelize.query('select id,nombres||'+ "' '"+'||paterno||'+ "' '"+'||materno as nombre from "Tutors" where ci='+"'"+req.params.id+"'")
.then(tut => {
res.send({tut: tut[0]});  

  })
});


router.get("/horario/:id",function(req,res){
models.sequelize.query('select (select pe.nombre||'+ "' '"+'||pe.apellido_pat||'+ "' '"+'||pe.apellido_materno from "Personas" pe where pe.doc_identidad=p.per_id) as nombre, m.mat_des,a.aula_des from "Clases" c, "Profesors" p,"Materia" m, "Aulas" a where a.id=c.aula_id and m.id=c.mat_id and c.niv_id='+"'"+req.params.id+"'")
.then(hor => {
  if(!hor[0][0]){var hora=[{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""},{"nombre":"","mat_des":"","aula_des":""}]
    res.send({hor:hora})}
  else{
  res.send({hor:hor[0]});}
  })
});

router.get("/matnivel/:id",function(req,res){
models.sequelize.query('select distinct c.descripcion,m.mat_des from "Curriculas" c, "Materia" m, "Nivel_paralelos" p where c.mat_id=m.id and p.niv_des=c.descripcion and p.id='+"'"+req.params.id+"'")
.then(nivel => {
res.send({nivel: nivel[0]});  

  })
});


router.get("/datosusuario/:id",function(req,res){
models.sequelize.query('select p.doc_identidad,p.tipo_doc,p.nombre,p.apellido_pat,p.apellido_materno,p.domicilio,p.sexo,p.fecha_nac,p.cel,p.correo,t.ti_sa,e.estciv_des,pa.pais_des,pr.pro_des,d.departamento_des from "Personas" p, "Lug_nacs" l,"Tipo_sangres" t,"Estado_civils" e,"Pais" pa,"Departamentos" d,"Provincia" pr where p.ts_id=t.id and p.lc_id=l.id and ec_id=e.id and l.depid=d.id and l.proid=pr.id and l.paisid=pa.id and p.doc_identidad='+"'"+req.params.id+"'")
.then(usu => {
    res.send({usu:usu[0]}) 
})
});



router.post("/add_hor", function(req,res){
var   uno= req.body.uno,
      uno1= req.body.uno1,
      uno2= req.body.uno2,
      uno3= req.body.uno3,
      uno4= req.body.uno4,
      uno5= req.body.uno5,
      uno6= req.body.uno6,
      uno7= req.body.uno7,
      uno8= req.body.uno8,
      uno9= req.body.uno9,
      uno10= req.body.uno10,
      uno11= req.body.uno11,
      uno12= req.body.uno12,
      uno13= req.body.uno13,
      uno14= req.body.uno14,
      uno15= req.body.uno15,
      uno16= req.body.uno16,
      uno17= req.body.uno17,
      uno18= req.body.uno18,
      uno19= req.body.uno19,
      uno20= req.body.uno20,
      uno21= req.body.uno21,
      uno22= req.body.uno22,
      uno23= req.body.uno23,
      uno24= req.body.uno24,
      uno25= req.body.uno25,
      uno26= req.body.uno26,
      uno27= req.body.uno27,
      uno28= req.body.uno28,
      uno29= req.body.uno29,
      uno30= req.body.uno30,
      uno31= req.body.uno31,
      uno32= req.body.uno32,
      uno33= req.body.uno33,
      uno34= req.body.uno34,
      uno35= req.body.uno35,
      uno36= req.body.uno36,
      uno37= req.body.uno37,
      uno38= req.body.uno38,
      uno39= req.body.uno39,
      uno40= req.body.uno40,
      uno41= req.body.uno41,
      uno42= req.body.uno42,
      uno43= req.body.uno43,
      uno44= req.body.uno44,
      uno45= req.body.uno45,
      uno46= req.body.uno46,
      uno47= req.body.uno47,
      uno48= req.body.uno48,
      uno49= req.body.uno49,
      uno50= req.body.uno50,
      uno51= req.body.uno51,
      uno52= req.body.uno52,
      uno53= req.body.uno53,
      uno54= req.body.uno54,
      uno55= req.body.uno55,
      uno56= req.body.uno56,
      uno57= req.body.uno57,
      uno58= req.body.uno58,
      uno59= req.body.uno59,
      uno60= req.body.uno60,
      uno61= req.body.uno61,
      uno62= req.body.uno62,
      uno63= req.body.uno63,
      uno64= req.body.uno64,
      uno65= req.body.uno65,
      uno66= req.body.uno66,
      uno67= req.body.uno67,
      uno68= req.body.uno68,
      uno69= req.body.uno69,
      uno70= req.body.uno70,
      uno71= req.body.uno71,
      uno72= req.body.uno72,
      uno73= req.body.uno73,
      uno74= req.body.uno74,
      uno75= req.body.uno75,
      uno76= req.body.uno76,
      uno77= req.body.uno77,
      uno78= req.body.uno78,
      uno79= req.body.uno79,
      uno80= req.body.uno80,
      uno81= req.body.uno81,
      uno82= req.body.uno82,
      uno83= req.body.uno83,
      uno84= req.body.uno84,
      uno85= req.body.uno85,
      uno86= req.body.uno86,
      uno87= req.body.uno87,
      uno88= req.body.uno88,
      uno89= req.body.uno89,
      uno90= req.body.uno90,
      uno91= req.body.uno91,
      uno92= req.body.uno92,
      uno93= req.body.uno93,
      uno94= req.body.uno94,
      uno95= req.body.uno95,
      uno96= req.body.uno96,
      uno97= req.body.uno97,
      uno98= req.body.uno98,
      uno99= req.body.uno99,
      uno100= req.body.uno100,
      uno101= req.body.uno101,
      uno102= req.body.uno102,
      uno103= req.body.uno103,
      uno104= req.body.uno104;
  var nivel= req.body.nivel;

var clase1=new models.Clase({mat_id: uno,aula_id: uno2,niv_id:nivel,hor_id:1})
var clase2=new models.Clase({mat_id: uno3,aula_id: uno5,niv_id:nivel,hor_id:2})
var clase3=new models.Clase({mat_id: uno6,aula_id: uno8,niv_id:nivel,hor_id:3})
var clase4=new models.Clase({mat_id: uno9,aula_id: uno11,niv_id:nivel,hor_id:4})
var clase5=new models.Clase({mat_id: uno12,aula_id: uno14,niv_id:nivel,hor_id:5})
var clase6=new models.Clase({mat_id: uno15,aula_id: uno17,niv_id:nivel,hor_id:6})
var clase7=new models.Clase({mat_id: uno18,aula_id: uno20,niv_id:nivel,hor_id:7})
var clase8=new models.Clase({mat_id: uno21,aula_id: uno23,niv_id:nivel,hor_id:8})
var clase9=new models.Clase({mat_id: uno24,aula_id: uno26,niv_id:nivel,hor_id:9})
var clase10=new models.Clase({mat_id: uno27,aula_id: uno29,niv_id:nivel,hor_id:10})
var clase11=new models.Clase({mat_id: uno30,aula_id: uno32,niv_id:nivel,hor_id:11})
var clase12=new models.Clase({mat_id: uno33,aula_id: uno35,niv_id:nivel,hor_id:12})
var clase13=new models.Clase({mat_id: uno36,aula_id: uno38,niv_id:nivel,hor_id:13})
var clase14=new models.Clase({mat_id: uno39,aula_id: uno41,niv_id:nivel,hor_id:14})
var clase15=new models.Clase({mat_id: uno42,aula_id: uno44,niv_id:nivel,hor_id:15})
var clase16=new models.Clase({mat_id: uno45,aula_id: uno47,niv_id:nivel,hor_id:16})
var clase17=new models.Clase({mat_id: uno48,aula_id: uno51,niv_id:nivel,hor_id:17})
var clase18=new models.Clase({mat_id: uno51,aula_id: uno53,niv_id:nivel,hor_id:18})
var clase19=new models.Clase({mat_id: uno54,aula_id: uno56,niv_id:nivel,hor_id:19})
var clase20=new models.Clase({mat_id: uno57,aula_id: uno59,niv_id:nivel,hor_id:20})
var clase21=new models.Clase({mat_id: uno60,aula_id: uno62,niv_id:nivel,hor_id:21})
var clase22=new models.Clase({mat_id: uno63,aula_id: uno65,niv_id:nivel,hor_id:22})
var clase23=new models.Clase({mat_id: uno66,aula_id: uno68,niv_id:nivel,hor_id:23})
var clase24=new models.Clase({mat_id: uno69,aula_id: uno71,niv_id:nivel,hor_id:24})
var clase25=new models.Clase({mat_id: uno72,aula_id: uno74,niv_id:nivel,hor_id:25})
var clase26=new models.Clase({mat_id: uno75,aula_id: uno77,niv_id:nivel,hor_id:26})
var clase27=new models.Clase({mat_id: uno78,aula_id: uno80,niv_id:nivel,hor_id:27})
var clase28=new models.Clase({mat_id: uno81,aula_id: uno83,niv_id:nivel,hor_id:28})
var clase29=new models.Clase({mat_id: uno84,aula_id: uno86,niv_id:nivel,hor_id:29})
var clase30=new models.Clase({mat_id: uno87,aula_id: uno89,niv_id:nivel,hor_id:30})
var clase31=new models.Clase({mat_id: uno90,aula_id: uno92,niv_id:nivel,hor_id:31})
var clase32=new models.Clase({mat_id: uno93,aula_id: uno95,niv_id:nivel,hor_id:32})
var clase33=new models.Clase({mat_id: uno96,aula_id: uno98,niv_id:nivel,hor_id:33})
var clase34=new models.Clase({mat_id: uno99,aula_id: uno101,niv_id:nivel,hor_id:34})
var clase35=new models.Clase({mat_id: uno102,aula_id: uno104,niv_id:nivel,hor_id:35});



clase1.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno1,cla_id:class1.id})
prof_class1.save()})
clase2.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno4,cla_id:class1.id})
prof_class1.save()})
clase3.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno7,cla_id:class1.id})
prof_class1.save()})
clase4.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno10,cla_id:class1.id})
prof_class1.save()})
clase5.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno13,cla_id:class1.id})
prof_class1.save()})
clase6.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno16,cla_id:class1.id})
prof_class1.save()})
clase7.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno19,cla_id:class1.id})
prof_class1.save()})
clase8.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno22,cla_id:class1.id})
prof_class1.save()})
clase9.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno25,cla_id:class1.id})
prof_class1.save()})
clase10.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno28,cla_id:class1.id})
prof_class1.save()})
clase11.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno31,cla_id:class1.id})
prof_class1.save()})
clase12.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno34,cla_id:class1.id})
prof_class1.save()})
clase13.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno37,cla_id:class1.id})
prof_class1.save()})
clase14.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno40,cla_id:class1.id})
prof_class1.save()})
clase15.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno43,cla_id:class1.id})
prof_class1.save()})
clase16.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno46,cla_id:class1.id})
prof_class1.save()})
clase17.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno49,cla_id:class1.id})
prof_class1.save()})
clase18.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno52,cla_id:class1.id})
prof_class1.save()})
clase19.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno55,cla_id:class1.id})
prof_class1.save()})
clase20.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno58,cla_id:class1.id})
prof_class1.save()})
clase21.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno61,cla_id:class1.id})
prof_class1.save()})
clase22.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno64,cla_id:class1.id})
prof_class1.save()})
clase23.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno67,cla_id:class1.id})
prof_class1.save()})
clase24.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno70,cla_id:class1.id})
prof_class1.save()})
clase25.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno73,cla_id:class1.id})
prof_class1.save()})
clase26.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno76,cla_id:class1.id})
prof_class1.save()})
clase27.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno79,cla_id:class1.id})
prof_class1.save()})
clase28.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno82,cla_id:class1.id})
prof_class1.save()})
clase29.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno85,cla_id:class1.id})
prof_class1.save()})
clase30.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno88,cla_id:class1.id})
prof_class1.save()})
clase31.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno91,cla_id:class1.id})
prof_class1.save()})
clase32.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno94,cla_id:class1.id})
prof_class1.save()})
clase33.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno97,cla_id:class1.id})
prof_class1.save()})
clase34.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno100,cla_id:class1.id})
prof_class1.save()})
clase35.save().then(class1 => {var prof_class1=new models.Prof_clase({prof_id:uno103,cla_id:class1.id})
prof_class1.save().then(p =>{res.send({success: true})})})
})




















/*
router.post('/adduser', (req, res) => {
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




		ci: this.ci,
        nombre: this.nombre,
        paterno: this.paterno,
        materno: this.materno,
        domicilio: this.domicilio,
        correo: this.correo,
        celular: this.celular,
        pais: this.pais,
        depto: this.depto,
        prov: this.prov,
        sexo: this.picked,
        ts: this.ts,
        ec: this.ec
 */



module.exports=router;



