export default (sequelize, DataTypes) => {
const Estudiante = sequelize.define('Estudiante', {
  cod_est: {type: DataTypes.INTEGER},
});

Estudiante.associate = (models) => {
    Estudiante.belongsTo(models.Persona, {
      foreignKey: 'per_id',
    });
   Estudiante.belongsTo(models.Paralelo, {
      foreignKey: 'par_id',
    });
  };

  return Estudiante;
};
