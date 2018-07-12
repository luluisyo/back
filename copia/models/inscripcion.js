'use strict';
module.exports = (sequelize, DataTypes) => {

const Inscripcion = sequelize.define('Inscripcion', {
  fecha: {
    type: DataTypes.DATE
  },
  obs: {
    type: DataTypes.STRING
  }
});

Inscripcion.associate = (models) => {
    Inscripcion.belongsTo(models.Tutor, {
      foreignKey: 'tuto_id',
    });
    Inscripcion.belongsTo(models.Estudiante, {
      foreignKey: 'est_id',
    });
    Inscripcion.belongsTo(models.Nivel_paralelo, {
      foreignKey: 'par_id',
    });
    Inscripcion.belongsTo(models.Usuario, {
      foreignKey: 'adm_id',
    });
    
  };

  return Inscripcion;
};
