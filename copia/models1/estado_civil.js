export default (sequelize, DataTypes) => {
const Estado_civil = sequelize.define('Estado_civil', {
  estciv_des: {
    type: DataTypes.STRING(10)
  }
});

  return Estado_civil;
};