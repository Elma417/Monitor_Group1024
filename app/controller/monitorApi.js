'use strict'

const Controller = require('egg').Controller

const queryRule = {
	queryType: 'string',
	startTime: 'dateTime',
	endTime: 'dateTime',
	dim: { type: 'enum', values: ['min', 'hour', 'day'] },
}

class MonitorApiController extends Controller {
	/*
	 * 统一成功回调
	 */
	success(code, message, body) {
		this.ctx.status = code || 200
		this.ctx.body = {
			success: true,
			message: message || '成功',
			body: body,
		}
	}

	/*
	 * 统一错误处理
	 */
	error(code, message) {
		this.ctx.status = code || 500
		this.ctx.body = {
			success: false,
			message: message || 'service error',
		}
	}

	/*
	 * 图表数据：
	 */
	async chartData() {
		const { ctx, service } = this;
		// 参数校验
		try {
			ctx.validate(queryRule, ctx.query)
		} catch (e) {
			return this.error(422, `${e.code}: ${e.errors[0].field} ${e.errors[0].message}`)
		}

		let list = [];
		try {
			const { startTime, endTime, dim, queryType } = ctx.query
			list = await service.monitor.getChartData(startTime, endTime, dim, queryType)
		} catch (e) {
			return this.error(500, e.message)
		}

		if (list.length === 0) {
			return this.error(404,'没有请求的资源')
		} else {
			return this.success(200,'请求成功',list)
		}
	}

	/*
	 * 总览数据：
	 */
	async allData() {
		let list = []
		try {
			list = await this.service.monitor.getAllLog()
		} catch (e) {
			return this.error(500, e.message)
		}

		if (list.length === 0) {
			return this.error(404,'没有请求的资源')
		} else {
			return this.success(200,'请求成功',list)
		}
	}
}

module.exports = MonitorApiController
