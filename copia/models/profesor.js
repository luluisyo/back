'use strict';
module.exports = (sequelize, DataTypes) => {

const Profesor = sequelize.define('Profesor', {
  prof_ant: {
    type: DataTypes.STRING
  },
  grad_acad: {
    type: DataTypes.STRING
  },
  curriculum: {
    type: DataTypes.STRING
  }
});

Profesor.associate = (models) => {
    Profesor.belongsTo(models.Persona, {
      foreignKey: 'per_id',
    });
  };



  return Profesor;
};
