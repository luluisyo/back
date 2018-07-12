const aula = require('../models').aula;

module.exports = {
  create(req, res) {
    return aula
      .create({
        aula_des: req.body.aula_des,
      })
      .then((aula) => res.status(201).send(aula))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return aula
      .findAll({
        include: [{
           }],
        order: [
          ['createdAt', 'DESC']        ],
      })
      .then((aulas) => res.status(200).send(aulas))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return aula
      .findById(req.params.aulaId, {
        include: [{
        }],
      })
      .then((aula) => {
        if (!aula) {
          return res.status(404).send({
            message: 'aula Not Found',
          });
        }
        return res.status(200).send(aula);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return aula
      .findById(req.params.aulaId, {
        include: [{
        
        }],
      })
      .then(aula => {
        if (!aula) {
          return res.status(404).send({
            message: 'aula Not Found',
          });
        }
        return aula
          .update({
            aula_des: req.body.aula_des || aula.aula_des,
          })
          .then(() => res.status(200).send(aula))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return aula
      .findById(req.params.aulaId)
      .then(aula => {
        if (!aula) {
          return res.status(400).send({
            message: 'aula Not Found',
          });
        }
        return aula
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};


