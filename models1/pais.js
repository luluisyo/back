export default (sequelize, DataTypes) => {
const Pais = sequelize.define('Pais', {
  pais_des: {
    type: DataTypes.STRING
  }
});


  return Pais;
};

