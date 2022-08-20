const { Service } = require('egg')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

class MonitorService extends Service {
	// 时间粒度统一处理
	formatDim(dim) {
		let timeDim = null
		switch (dim) {
			case 'min':
				timeDim = '%H:%i'
				break
			case 'hour':
				timeDim = '%H:00'
				break
			case 'day':
				timeDim = '%m-%d'
				break
			default:
				timeDim = '%m-%d'
				break
		}
		return timeDim;
	}

	//图表数据
	async getChartData(startTime, endTime, dim, queryType) {
		//时间粒度处理
		let timeDim = this.formatDim(dim);

		// type处理

		const JSExcLog = await this.ctx.model.Log.findAll({
			attributes: [
				'detail',
				[sequelize.fn('COUNT', sequelize.col('uuid')), 'pv'],
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			group: [
				sequelize.Sequelize.fn(
					'DATE_FORMAT',
					sequelize.Sequelize.col('created_at'),
					timeDim
				),
			],
			where: {
				type: {
					[Op.or]: ['pv', 'error'],
				},
				detail: {
					[Op.regexp]: 'jsError'
				},
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		const apiSuccessLog = await this.ctx.model.Log.findAll({
			attributes: [
				'type', 'detail',
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			where: {
				type: 'xhr',
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		const pagePfmLog = await this.ctx.model.Log.findAll({
			attributes: [
				'detail',
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			where: {
				type: {
					[Op.or]: ['paint', 'timing']
				},
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		const resourceExcLog = await this.ctx.model.Log.findAll({
			attributes: [
				[sequelize.fn('COUNT', sequelize.col('uuid')), 'pv'],
				'uuid', 'detail',
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			group: [
				sequelize.Sequelize.fn(
					'DATE_FORMAT',
					sequelize.Sequelize.col('created_at'),
					timeDim
				),
			],
			where: {
				detail: {
					[Op.regexp]: 'resourceError'
				},
				type: 'error',
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		const whiteScreenLog = await this.ctx.model.Log.findAll({
			attributes: [
				[sequelize.literal("count(case when type='whiteScreen' then 1 end)"), 'num'],
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			where: {
				type: 'whiteScreen',
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		const pageAccessLog = await this.ctx.model.Log.findAll({
			attributes: [
				[sequelize.fn('COUNT', sequelize.col('uuid')), 'uv'],
				[sequelize.literal("count(case when type='pv' then 1 end)"), 'pv'],
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			group: [
				sequelize.Sequelize.fn(
					'DATE_FORMAT',
					sequelize.Sequelize.col('created_at'),
					timeDim
				),
			],
			where: {
				type: 'pv',
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		switch (queryType) {
			case 'JSexc':
				return JSExcLog
			case 'APISuccessRate':
				return apiSuccessLog
			case 'PagePfm':
				return pagePfmLog
			case 'ResourceExc':
				return resourceExcLog
			case 'WhiteScreen':
				return whiteScreenLog
			case 'PageAccess':
				return pageAccessLog
			default:
				return null
		}
	}

	//其余数据接口
	//无请求参数
	async getAllLog() {
		return await this.ctx.model.Log.findAll({
			attributes: [
				'uuid', 'type', 'city',
				'browser', 'os', 'detail',
				['created_at', 'time']
			],
			group: 'created_at'
		})
	}
}

module.exports = MonitorService
