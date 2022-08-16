const { Service } = require('egg')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

class MonitorService extends Service {
	//时间粒度统一处理
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

	// 获取日志
	// 数据格式：时间、JS异常数量、页面访问量
	async getJSExcLog(startTime, endTime, dim) {
		const { ctx } = this

		let timeDim = this.formatDim(dim);

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

		let timeDim = this.formatDim(dim);

		const ret = await ctx.model.Log.findAll({
			attributes: [
				'detail',
				// [sequelize.literal("SELECT COUNT(*) FROM Log"), 'resNum'],
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			// group: [
			// 	sequelize.Sequelize.fn(
			// 		'DATE_FORMAT',
			// 		sequelize.Sequelize.col('created_at'),
			// 		timeDim
			// 	),
			// ],
			where: {
				type: 'xhr',
				created_at: {
					[Op.between]: [startTime, endTime],
				},
			},
		})

		//对detail进行筛选


		return ret
	}

	//获取页面性能
	async getPagePfmData(startTime, endTime, dim) {

		let timeDim = this.formatDim(dim);

		const result = await this.ctx.model.Log.findAll({
			attributes: [
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			where: {
				type: {
					[Op.or]: ['paint', 'timing']
				},
				created_at: {
					[Op.between]: [startTime, endTime]
				}
			}
		})

		return result;
	}

	// 资源异常
	// 数据格式：时间、异常次数、页面访问量（pv）、用户访问量（uv）
	async getResourceExcData(startTime, endTime, dim) {
		let timeDim = this.formatDim(dim);

		const result = await this.ctx.model.Log.findAll({
			attributes: [
				[sequelize.literal("count(case when type='pv' then 1 end)"),'pv'],
				// [sequelize.literal("count(case when type='timing' then 1 end)")],
				[sequelize.literal("count(case when uuid)"),'uv'],
				[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), timeDim), 'time'],
			],
			where: {
				type: {
					[Op.or]: ['pv', 'timing']
				}
			}
		})

		return result;
	}

	// 白屏异常
	// 数据格式：时间、 白屏异常次数
	async getWhiteScreenData(startTime, endTime, dim) {
		let timeDim = this.formatDim(dim);

		const result = await this.ctx.model.Log.findAll({

		})

		return result;
	}

	// 页面访问
	// 数据格式：时间、访问数(pv)、用户数(uv)
	async getPageAccessData(startTime, endTime, dim) {
		let timeDim = this.formatDim(dim);


	}
}

module.exports = MonitorService
