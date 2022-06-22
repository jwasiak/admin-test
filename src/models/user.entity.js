const { DataTypes } = require('sequelize');
const connection = require('../config/postgres.connection');
const User = connection.define(
	'users',
	{
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		},
	},
	{
		underscored: true,
	}
);

module.exports = User;
