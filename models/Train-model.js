// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const bcrypt = require("bcrypt");

// const TrainModel=sequelize.define('Train',{
//     Train_ID: {
//         type: DataTypes.INTEGER,
//         autoincrement: true,
//         primaryKey: true
//     },
//     Time: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     Train_City: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     Day:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: DataTypes.STRING,
//     profile_pic: DataTypes.STRING,
//     is_deleted: DataTypes.BOOLEAN
// },{
//     sequelize,
//     modelName:'User',
//     tableName:'User',
//     timestamps: false,
//     instanceMethods: {
//         generateHash(password) {
//             return bcrypt.hash(password, bcrypt.genSaltSync(8));
//         },
//         validPassword(password) {
//             return bcrypt.compare(password, this.password);
//         }
//     }
// });

// module.exports = UserModel;