export default (sequelize, DataTypes) => {
const Persona = sequelize.define('Persona', {
  doc_identidad: {type: DataTypes.INTEGER, primaryKey: true},
  tipo_doc: {type: DataTypes.STRING },
  nombre: {type: DataTypes.STRING},
  apellido_pat: {type: DataTypes.STRING},
  apellido_materno: {type: DataTypes.STRING},
  domicilio: {type: DataTypes.STRING},
  sexo: {type: DataTypes.STRING},
  fecha_nac: {type: DataTypes.STRING},
  cel: {type: DataTypes.STRING},
  correo: {type: DataTypes.STRING},
});

Persona.associate = (models) => {
    Persona.belongsTo(models.Tipo_sangre, {
      foreignKey: 'ts_id',
    });
    Persona.belongsTo(models.Lug_nac, {
      foreignKey: 'lc_id',
    });
    Persona.belongsTo(models.Estado_civil, {
      foreignKey: 'ec_id',
    });
  };

  return Persona;
};
