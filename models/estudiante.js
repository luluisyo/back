'use strict';
module.exports = (sequelize, DataTypes) => {
const Estudiante = sequelize.define('Estudiante', {
  cod_est: {type: DataTypes.INTEGER},
  gestion_ing: {type: DataTypes.INTEGER},
});

Estudiante.associate = (models) => {
    Estudiante.belongsTo(models.Persona, {
      foreignKey: 'per_id',
    });
  };

  return Estudiante;
};

