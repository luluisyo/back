'use strict';
module.exports = (sequelize, DataTypes) => {

const Materia = sequelize.define('Materia', {
  mat_des: {
    type: DataTypes.STRING
  }
});

  return Materia;
};
