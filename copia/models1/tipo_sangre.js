export default (sequelize, DataTypes) => {
const Tipo_sangre = sequelize.define('Tipo_sangre', {
  ti_sa: {
    type: DataTypes.STRING(10)
  }
});


  return Tipo_sangre;
};
