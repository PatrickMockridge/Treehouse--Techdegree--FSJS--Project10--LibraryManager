'use strict';
module.exports = function(sequelize, DataTypes) {
  var loans = sequelize.define('loans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patron_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Loaned on date is required of the format YYYY-MM-DD"
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Return by date is required of the format YYYY-MM-DD"
        }
      }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "You must use a valid date of the format YYYY-MM-DD"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        loans.belongsTo(models.patrons, {foreignKey: 'patron_id'});
        loans.belongsTo(models.books, {foreignKey: 'book_id'});
      }
    },
    timestamps: false  // no timestamps
  });
  return loans;
};
