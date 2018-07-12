export default (sequelize, DataTypes) => {

const Lug_nac = sequelize.define('Lug_nac', {
  
});

Lug_nac.associate = (models) => {
    Lug_nac.belongsTo(models.Departamento, {
      foreignKey: 'depid',
    });
    Lug_nac.belongsTo(models.Provincia, {
      foreignKey: 'proid',
    });
    Lug_nac.belongsTo(models.Pais, {
      foreignKey: 'paisid',
    });
    

  };
  return Lug_nac;
};
