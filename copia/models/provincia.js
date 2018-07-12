'use strict';
module.exports = (sequelize, DataTypes) => {

const Provincia = sequelize.define('Provincia', {
  pro_des: {
    type: DataTypes.STRING
  }
});

Provincia.associate = (models) => {
    Provincia.belongsTo(models.Departamento, {
      foreignKey: 'depid',
    });
  };



  return Provincia;
};


