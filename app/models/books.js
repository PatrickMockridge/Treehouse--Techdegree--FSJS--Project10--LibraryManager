'use strict';
module.exports = function(sequelize, DataTypes) {
  var books = sequelize.define('books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_published: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isNumeric: {
        msg: "Year should be in integer format"
      }
    }
  }
}, {
    classMethods: {
      associate: function(models) {
         //associations can be defined here
         books.hasMany(models.loans, {foreignKey: 'book_id'});
      }
    },
    timestamps: false
  });
  return books;
};
