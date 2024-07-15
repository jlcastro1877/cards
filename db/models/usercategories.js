const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "userCategories",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    id_categorie: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    modelName: "userCategories",
  }
);

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class userCategories extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   userCategories.init({
//     id_user: DataTypes.INTEGER,
//     id_categorie: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'userCategories',
//   });
//   return userCategories;
// };
