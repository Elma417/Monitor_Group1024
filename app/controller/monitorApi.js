'use strict'
const Controller = require('egg').Controller

const queryRule = {
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
	 * JS异常：
	 */
	async jsExcData() {
		const { ctx, service } = this

		try {
			ctx.validate(queryRule, ctx.query)
		} catch (e) {
			return this.error(422, `${e.code}: ${e.errors[0].field} ${e.errors[0].message}`)
		}

		let list = []
		try {
			const { startTime, endTime, dim } = ctx.query
			list = await service.monitor.getJSExcLog(startTime, endTime, dim)
		} catch (e) {
			return this.error(500, e.message)
		}

		return this.success(200, '成功', list)
	}

	// API成功率：
	async apiSuccessRateData() {
		//时间、请求数量、成功率
	}

	// 页面性能：
	async pagepfmData() {
		//时间、 首屏绘制时间（First Paint，FP）、首屏内容绘制时间（First Contentful Paint，FCP）、 DOM Ready（页面解析完成的时间）
		// 注意：以ms为单位
	}

	// 资源异常：
	async ResourceExcData() {
		// 时间、 异常次数、页面访问量（pv）、用户访问量（uv）
	}

	// 白屏异常：
	async WhiteScreenData() {
		// 时间、 白屏异常次数
	}

	// 页面访问：
	async PageAccessData() {
		// 时间、 访问数、用户数
	}
}

module.exports = MonitorApiController
