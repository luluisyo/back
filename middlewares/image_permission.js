var Imagen = require("../models1/imagenes");

module.exports = function(image,req,res){

if(req.method === "GET" && req.path.indexOf("edit") < 0){
	return true;
}

if(image.creator._id.toString() == res.locals.user._id){
	return true;
}

return false;

}