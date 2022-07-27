'use strict'

module.exports = app => {
	const DataTypes = app.Sequelize
	const sequelize = app.model
	const attributes = {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: true,
			autoIncrement: true,
			comment: '日志id',
			field: 'id',
		},
		uuid: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '用户标识',
			field: 'uuid',
		},
		category: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '日志类别',
			field: 'category',
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '子类',
			field: 'type',
		},
		ip: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: 'ip地址',
			field: 'ip',
		},
		country: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '国家',
			field: 'country',
		},
		city: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '城市',
			field: 'city',
		},
		browser: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '浏览器',
			field: 'browser',
		},
		os: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '系统',
			field: 'os',
		},
		detail: {
			type: DataTypes.STRING(900),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: '详细信息',
			field: 'detail',
		},
	}
	const options = {
		tableName: 'log',
		comment: '',
		indexes: [],
		timestamps: false,
	}
	const LogModel = sequelize.define('log_model', attributes, options)
	return LogModel
}
