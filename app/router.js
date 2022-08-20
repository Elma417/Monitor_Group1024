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

	// 总览数据：
	router.get('/api/getAllData', controller.monitorApi.allData)
	// 图表数据
	router.get('/api/getChartData', controller.monitorApi.chartData)
}
