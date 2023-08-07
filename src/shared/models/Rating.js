'use strict';
const { Model, Sequelize } = require('sequelize');
const sequelize = require('./sequelize_client');

class Rating extends Model {}

Rating.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  item_id: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
},
{
  sequelize,
  modelName: 'Rating',
  tableName: 'ratings'
});

module.exports = sequelize.models.Rating;
