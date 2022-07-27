'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app
	// router.get('/', controller.home.index)

	// 上传日志
	router.all('/logstore/track', controller.logstore.track)
}
