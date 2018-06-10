export default (sequelize, DataTypes) => {
const Titulo = sequelize.define('tTitulo', {
  titu_des: {
    type: DataTypes.STRING
  }
});



  return Titulo;
};
