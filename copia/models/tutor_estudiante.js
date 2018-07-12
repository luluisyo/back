'use strict';
module.exports = (sequelize, DataTypes) => {

const Tutor_estudiante = sequelize.define('Tutor_estudiante', {
  Tutor_estudiante_est_des: {
    type: DataTypes.STRING
  }
});

Tutor_estudiante.associate = (models) => {
    Tutor_estudiante.belongsTo(models.Tutor, {
      foreignKey: 'Tuto_id',
    });
    Tutor_estudiante.belongsTo(models.Estudiante, {
      foreignKey: 'est_id',
    });
    
  };

  return Tutor_estudiante;
};
