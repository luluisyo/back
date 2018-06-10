'use strict';
module.exports = (sequelize, DataTypes) => {

const Administrativo = sequelize.define('Administrativo', {
  Descripsion: {
    type: DataTypes.STRING
  },
  año_ingreso: {
    type: DataTypes.STRING
  },
  id_curr: {
    type: DataTypes.STRING
  }
});

Administrativo.associate = (models) => {
    Administrativo.belongsTo(models.Persona, {
      foreignKey: 'per_id',
    });
  };



  return Administrativo;
};