/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {})

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1658821773246_4988'

	// add your middleware config here
	config.middleware = []

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	}

	config.sequelize = {
		dialect: 'mysql',
		database: 'monitor',
		host: '182.61.146.211',
		port: 3306,
		username: 'root',
		password: 'c92a4477911d3831',
		timezone: '+08:00',
	}

	config.security = {
		csrf: {
			enable: false,
		},
		domainWhiteList: ['*'], // 跨域配置
	}

	config.bodyParser = {
		enableTypes: ['json', 'form', 'text'],
		extendTypes: {
			text: ['text/xml', 'application/xml'],
		},
	}

	return {
		...config,
		...userConfig,
	}
}
