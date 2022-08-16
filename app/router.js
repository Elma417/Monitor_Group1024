'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app
	router.get('/', controller.home.index)

	/*
	 * SDK接口
	 */
	// 上传日志
	router.all('/logstore/track', controller.logstore.track)

	/*
	 * 中台可视化接口
	 */
	// JS异常：
	router.get('/api/JSexcData', controller.monitorApi.jsExcData)
	// API成功率：
	router.get('/api/APISuccessRateData', controller.monitorApi.apiSuccessRateData)
	// 页面性能：
	router.get('/api/pagepfmData', controller.monitorApi.pagepfmData)
	// 资源异常：
	router.get('/api/ResourceExcData', controller.monitorApi.ResourceExcData)
	// 白屏异常：
	router.get('/api/WhiteScreenData', controller.monitorApi.WhiteScreenData)
	// 页面访问：
	router.get('/api/PageAccessData', controller.monitorApi.PageAccessData)
}
