export default (sequelize, DataTypes) => {
const Aula = sequelize.define('Aula', {
  aula_des: {
    type: DataTypes.STRING
  }
});

  return Aula;
};
