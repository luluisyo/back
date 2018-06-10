'use strict';
module.exports = (sequelize, DataTypes) => {

const Curricula = sequelize.define('Curricula', {
  descripcion: {
    type: DataTypes.INTEGER
  }
});


Curricula.associate = (models) => {
    Curricula.belongsTo(models.Materia, {
      foreignKey: 'mat_id',
    });
    
  };


  return Curricula;
};
