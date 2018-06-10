'use strict';
module.exports = (sequelize, DataTypes) => {

const Diashoras = sequelize.define('Diashoras', {
  
});

// force: true will drop the table if it already exists
Diashoras.associate = (models) => {
    Diashoras.belongsTo(models.Dias, {
      foreignKey: 'dia_id',
    });
   Diashoras.belongsTo(models.Horas, {
      foreignKey: 'hora_id',
    });
  };

  return Diashoras;
};
