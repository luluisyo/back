export default (sequelize, DataTypes) => {

const Horas = sequelize.define('Horas', {

  hora_ini: {
    type: DataTypes.STRING
  },
  hora_fin: {
    type: DataTypes.STRING
  }
});
  return Horas;
};
