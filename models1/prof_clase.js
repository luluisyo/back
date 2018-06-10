export default (sequelize, DataTypes) => {
const Prof_clase = sequelize.define('Prof_clase', {
  
});

Prof_clase.associate = (models) => {
    Prof_clase.belongsTo(models.Profesor, {
      foreignKey: 'prof_id',
    });
    Prof_clase.belongsTo(models.Clase, {
      foreignKey: 'cla_id',
    });
  };



  return Prof_clase;
};
