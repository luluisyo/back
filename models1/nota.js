export default (sequelize, DataTypes) => {
const Nota = sequelize.define('Nota', {
  npar1: {type: DataTypes.STRING},
  dps1: {type: DataTypes.STRING},
  nota1: {type: DataTypes.STRING},
  npar2: {type: DataTypes.STRING},
  dps2: {type: DataTypes.STRING},
  nota2: {type: DataTypes.STRING},
  npar3: {type: DataTypes.STRING},
  dps3: {type: DataTypes.STRING},
  nota3: {type: DataTypes.STRING},
  npar4: {type: DataTypes.STRING},
  dps4: {type: DataTypes.STRING},
  nota4: {type: DataTypes.STRING},
  
});

Nota.associate = (models) => {
    Nota.belongsTo(models.Tipo_sangre, {
      foreignKey: 'ts_id',
    });
    Nota.belongsTo(models.Lug_nac, {
      foreignKey: 'lc_id',
    });
    Nota.belongsTo(models.Estado_civil, {
      foreignKey: 'ec_id',
    });
  };

  return Nota;
};
