'use strict';
const { Model, Sequelize } = require('sequelize');
const sequelize = require('./sequelize_client');

class Connection extends Model {}

Connection.init({
  connection_id: {
    type: Sequelize.STRING,
    primaryKey: true,
  }
},
{
  sequelize,
  modelName: 'Connection',
  tableName: 'connections'
});

module.exports = sequelize.models.Connection;
