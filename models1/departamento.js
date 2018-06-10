export default (sequelize, DataTypes) => {

const Departamento = sequelize.define('Departamento', {
  departamento_des: {
    type: DataTypes.STRING
  }
});

// force: true will drop the table if it already exists


Departamento.associate = (models) => {
    // 1:M
    Departamento.belongsTo(models.Pais, {
      foreignKey: 'pais_id',
    });
  };




  return Departamento;
};

