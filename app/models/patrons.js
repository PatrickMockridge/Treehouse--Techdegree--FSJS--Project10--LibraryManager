'use strict';
module.exports = function(sequelize, DataTypes) {
  var patrons = sequelize.define('patrons', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Must use a valid email"
        }
      }
    },
    library_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Zip code must be all numbers"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        patrons.hasMany(models.loans, {foreignKey: 'patron_id'});
      }
    },
    timestamps: false  // No timestamps
  });
  return patrons;
};
