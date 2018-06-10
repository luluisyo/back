export default (sequelize, DataTypes) => {
const Tutor = sequelize.define('Tutor', {
  Tutor_des: {
    type: DataTypes.STRING
  }
});

Tutor.associate = (models) => {
    Tutor.belongsTo(models.Ocupacion, {
      foreignKey: 'ocu_id',
    });
    Tutor.belongsTo(models.Persona, {
      foreignKey: 'per_id',
    });
    
  };

  return Tutor;
};
