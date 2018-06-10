'use strict';
module.exports = (sequelize, DataTypes) => {

const Dias = sequelize.define('Dias', {
  dias_des: {
    type: DataTypes.STRING
  }
});

// force: true will drop the table if it already exists


  return Dias;
};
