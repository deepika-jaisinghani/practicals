'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userAddresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // userAddresses.belongsTo(models.Users);
        }
    };
    userAddresses.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            field: "id"
        },
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        pincode: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'userAddresses',
    });
    return userAddresses;
};