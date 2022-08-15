const { Service } = require('egg')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

class MonitorService extends Service {
	// 获取日志
	async getJSExcLog(startTime, endTime, dim) {
		const { ctx } = this

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

		const ret = await ctx.model.Log.findAll({
			attributes: [
				[sequelize.literal("count(case when type='error' then 1 end)"), 'JSexcNum'],
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
				type: {
					[Op.or]: ['pv', 'error'],
				},
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		return ret
	}

	// 获取api成功率
	async getApiSuccessRateData(startTime, endTime, dim) {
		const { ctx } = this

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

		const ret = await ctx.model.Log.findAll({
			attributes: [
				[sequelize.literal("count(case when type='error' then 1 end)"), 'JSexcNum'],
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
				type: {
					[Op.or]: ['pv', 'error'],
				},
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		return ret
	}
}

module.exports = MonitorService
