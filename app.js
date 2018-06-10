var express = require("express");
var app = express();
var bodyparser = require("body-parser");
const cors = require('cors')
const morgan = require('morgan')
var session = require("express-session");
var methodOverride = require("method-override");
//rutas
var router_app = require("./routes/routes_app_est");
var router_app1 = require("./routes/routes_app_profes");
var router_apppru = require("./routes/routes_app_prueba");
var router_app2 = require("./routes/routes_app_admin");
var models = require('./models/index');

var path = require('path');
var hogan = require('hogan.js');
var fs = require('fs');

var sendgrid  = require('sendgrid')('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');



var jwt = require('jsonwebtoken');
//usu de express
app.use("/public" ,express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(morgan('combined'));
app.use(cors());
//conexion mongo
const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

//session con express-session
app.use(session({
secret: "123byt123",
resave: false,
saveUninitialized: false }));

models.sequelize.sync({});

app.set("view engine", "jade");

app.get("/sig", function(req,res){
});

app.get("/", function(req,res){
res.render("index");});

app.get("/login", function(req,res){
res.render("login");});



app.post('/login', function(req, res) {
  models.Usuario.findAll({where:{
    user: req.body.username, password: req.body.password}
  }).then(user => {
  	if (!user[0] || user[0].estado==0) {
      res.send({success: false, msg: 'error en la autenticacion'});
    }    else {  
     // if user is found and password is right create a token
          var token = jwt.sign({id: user.id}, 'secreto');
          // return the information including token as JSON
          console.log(user+' qui esta el usuario');
          res.json({success: true, token: 'JWT ' + token, user: user[0]});      
    }
  });
});



app.get('/send', function(req, res) {

  var  receiver = 'luluispuro@gmail.com';
  var msm = 'aqui el mensaje';
  var mailConfig = {
    to:       receiver,
    from:     'Colegio_Nacional_Mixto_Simon_Bolivar',
    subject:  'Muy Buenas!',
    html:     '<html xmlns="http://www.w3.org/1999/xhtml"> <head> Importante </head> <body>'+ msm +'</body> </html>'
  }
  
  sendgrid.send(mailConfig, function(err, json) {
    
    var titulo = 'Email enviado correctamente';
    var texto = 'El email se ha enviado a la siguiente dirección: ' + receiver;
    
    if (err) {
      titulo = 'Se ha producido un error';
      texto = err;
    }
    res.send('page');
  });  
});

/*
app.post("/sessions", function(req,res){
models.Usuario.findAll({
where:{
  user: req.body.email,
  password: req.body.password} 
	}).then(user => {
  	if(user[0]==undefined)
  		{res.redirect('/login');}else{
  	req.session.user_id = user[0].dataValues.id;}
	if(user[0].dataValues.tipo==1){res.redirect("/est");}
	if(user[0].dataValues.tipo==2){res.redirect("/prof");}
	if(user[0].dataValues.tipo==3){res.redirect("/admin");}
	
  });
});

app.use("/admin",session_middleware2);
app.use("/prof",session_middleware1);
app.use("/est",session_middleware);

var session_middleware1 = require("./middlewares/sessionprofe");
var session_middleware = require("./middlewares/sessionest");
var session_middleware2 = require("./middlewares/sessionadmin");

*/

app.use("/admin",router_app2);
app.use("/prof",router_app1);
app.use("/est",router_app);
app.use("/a",router_apppru);



/*var sessionMiddleware = session({
	name: "session",
	store: new RedisStore({}),
	secret:"super ultra secret word"
});
*/

app.listen(process.env.PORT || 8081);
