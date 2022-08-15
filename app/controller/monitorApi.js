'use strict'
const Controller = require('egg').Controller

class MonitorApiController extends Controller {
	// JS异常：
	async jsExcData() {
		// 时间、JS异常数量、页面访问量、（如果可以拿到独立访问量也可以传回来，加上即可）

		const { ctx } = this
		ctx.body = 'hi, jsExcData'
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
