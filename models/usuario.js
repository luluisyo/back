'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
const Usuario = sequelize.define('Usuario', {
    user: {
    type: DataTypes.STRING},
    password: {
    type: DataTypes.STRING},
    tipo: {
    type: DataTypes.INTEGER},
    estado: {
    type: DataTypes.INTEGER},
});

Usuario.associate = (models) => {
    Usuario.belongsTo(models.Persona, {
      foreignKey: 'per_id',
    });
    };


  return Usuario;

};