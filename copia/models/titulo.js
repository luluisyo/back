'use strict';
module.exports = (sequelize, DataTypes) => {
const Titulo = sequelize.define('Titulo', {
  titu_des: {
    type: DataTypes.STRING
  }
});



  return Titulo;
};
