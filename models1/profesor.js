export default (sequelize, DataTypes) => {
const Profesor = sequelize.define('Profesor', {
  prof_ant: {
    type: DataTypes.STRING
  }
});

Profesor.associate = (models) => {
    Profesor.belongsTo(models.Persona, {
      foreignKey: 'per_id',
    });
  };



  return Profesor;
};
