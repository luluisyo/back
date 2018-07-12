'use strict';
module.exports = (sequelize, DataTypes) => {

const Tutor = sequelize.define('Tutor', {
  ci: {
    type: DataTypes.STRING
  },
  paterno: {
    type: DataTypes.STRING
  },
  materno: {
    type: DataTypes.STRING
  },
  nombres: {
    type: DataTypes.STRING
  },
  ocupacion: {
    type: DataTypes.STRING
  },
  mayor_grado: {
    type: DataTypes.STRING
  },
  idioma: {
    type: DataTypes.STRING
  },
  celular: {
    type: DataTypes.STRING
  },
  mail: {
    type: DataTypes.STRING
  },
  parentesco: {
    type: DataTypes.STRING
  }
  
});

  return Tutor;
};
