var Usuario1 = require('../models/index');

module.exports = {
  create(req, res) {
    return Usuario1
      .create({
        usuario_des: req.body.usuario_des,
      })
      .then((usuario) => res.status(201).send(usuario))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    console.log("antes de la consulat");
    return Usuario1.Usuario.findAll({
        where: {
        user: req.body.email,
       },
      })
      .then((usuarios) => res.status(200).send(usuarios))
      .catch((error) => res.status(400).send(error));
  },
};

