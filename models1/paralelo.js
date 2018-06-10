export default (sequelize, DataTypes) => {
const Paralelo = sequelize.define('Paralelo', {
  par_des: {
    type: DataTypes.STRING(2)
  }
});
  return Paralelo;
};
