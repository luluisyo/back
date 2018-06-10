'use strict';
module.exports = (sequelize, DataTypes) => {
const Nota = sequelize.define('Nota', {
  per: {type: DataTypes.STRING},
  nota: {type: DataTypes.STRING},
  
});

Nota.associate = (models) => {
    Nota.belongsTo(models.Estudiante, {
      foreignKey: 'id_est',
    });
    Nota.belongsTo(models.Profesor, {
      foreignKey: 'id_prof',
    });
    Nota.belongsTo(models.Materia, {
      foreignKey: 'id_mat',
    });
    Nota.belongsTo(models.Nivel_paralelo, {
      foreignKey: 'id_niv',
    });
  };

  return Nota;
};
