'use strict';
module.exports = (sequelize, DataTypes) => {

const Observacion = sequelize.define('Observacion', {
  obser_des: {
    type: DataTypes.STRING
  },
  fecha: {type: DataTypes.DATE}

});

// force: true will drop the table if it already exists


Observacion.associate = (models) => {
    Observacion.belongsTo(models.Estudiante, {
      foreignKey: 'est_id',
    });
    Observacion.belongsTo(models.Profesor, {
      foreignKey: 'prof_id',
    });
  };

  return Observacion;
};
