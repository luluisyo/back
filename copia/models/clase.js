'use strict';
module.exports = (sequelize, DataTypes) => {

const Clase = sequelize.define('Clase', {
  clase_des: {
    type: DataTypes.STRING
  }
});

// force: true will drop the table if it already exists


Clase.associate = (models) => {
    Clase.belongsTo(models.Materia, {
      foreignKey: 'mat_id',
    });
    Clase.belongsTo(models.Aula, {
      foreignKey: 'aula_id',
    });
    Clase.belongsTo(models.Nivel_paralelo, {
      foreignKey: 'niv_id',
    });
    Clase.belongsTo(models.Horario, {
      foreignKey: 'hor_id',
    });
  };

  return Clase;
};
