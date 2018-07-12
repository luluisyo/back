'use strict';
module.exports = (sequelize, DataTypes) => {

const Curriculum_prof = sequelize.define('Curriculum_prof', {
  curri_des: {
    type: DataTypes.STRING
  }
});

Curriculum_prof.associate = (models) => {
    Curriculum_prof.belongsTo(models.Titulo, {
      foreignKey: 'titu_id',
    });
    Curriculum_prof.belongsTo(models.Profesor, {
      foreignKey: 'prof_id',
    });
  };



  return Curriculum_prof;
};
