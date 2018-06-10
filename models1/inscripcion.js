export default (sequelize, DataTypes) => {

const Inscripcion = sequelize.define('Inscripcion', {
  fecha: {
    type: DataTypes.STRING
  },
  obs: {
    type: DataTypes.STRING
  }
});

Inscripcion.associate = (models) => {
    Inscripcion.belongsTo(models.Tutor, {
      foreignKey: 'tuto_id',
    });
    Inscripcion.belongsTo(models.Estudiante, {
      foreignKey: 'est_id',
    });
    Inscripcion.belongsTo(models.Paralelo, {
      foreignKey: 'Par_id',
    });
    Inscripcion.belongsTo(models.Estudiante, {
      foreignKey: 'est_id',
    });
    
  };

  return Inscripcion;
};
