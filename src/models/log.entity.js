const { DataTypes } = require('sequelize');
const connection = require('../config/postgres.connection');

const Log = connection.define(
	'log',
	{
		logDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		details: {
			type: DataTypes.JSONB,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		underscored: true,
	}
);

module.exports = Log;
