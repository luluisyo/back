'use strict';
module.exports = (sequelize, DataTypes) => {
const Nivel_paralelo = sequelize.define('Nivel_paralelo', {
  niv_des: {
    type: DataTypes.INTEGER
  }
});

Nivel_paralelo.associate = (models) => {
    Nivel_paralelo.belongsTo(models.Paralelo, {
      foreignKey: 'par_id',
    });
  };



  return Nivel_paralelo;
};
