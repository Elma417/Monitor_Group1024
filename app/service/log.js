const { Service } = require('egg')

class LogService extends Service {
	// 保存日志
	async createOneLog(log) {
		const { ctx } = this

		await ctx.model.Log.create(log).catch(err => console.error(err))
	}
}

module.exports = LogService
