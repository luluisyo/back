export default (sequelize, DataTypes) => {

const Ocupacion = sequelize.define('Ocupacion', {
  Ocupacion_des: {
    type: DataTypes.STRING
  }
});


  return Ocupacion;
};
