export default (sequelize, DataTypes) => {

const Horario = sequelize.define('Horario', {
  
});

// force: true will drop the table if it already exists


Horario.associate = (models) => {
    // 1:M
    Horario.belongsTo(models.Dias, {
      foreignKey: 'dia_id',
    });
    Horario.belongsTo(models.Horas, {
      foreignKey: 'hora_id',
    });
  };




  return Horario;
};
