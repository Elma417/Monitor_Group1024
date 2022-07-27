'use strict'

const parser = require('ua-parser-js')
const moment = require('moment')
const geoip = require('geoip-lite')
const cities = require('../../assert/cities')
const countries = require('../../assert/countries')

const Controller = require('egg').Controller

class LogStoreController extends Controller {
	async track() {
		const { ctx, service } = this
		let data = ctx.query.log || ctx.request.body
		if (!data) {
			return console.error('无效记录')
		}

		data = typeof data === 'string' ? JSON.parse(data) : data

		let ip = ctx.request.ip
		console.log(ctx.request.ip)
		// var ip = '112.10.130.86'
		let ua = parser(ctx.request.header['user-agent'])

		let log = {
			ip,
			host: ctx.request.header['host'],
			os: ua.os.name ? ua.os.name.toLowerCase() : '',
			browser: ua.browser.name ? ua.browser.name.toLowerCase() : '',

			timeStamp: moment().format('YYYY-MM-DD hh:mm:ss'),

			uuid: data.uuid,
			category: data.category,
			type: data.type,
		}

		// 根据ip解析地理位置
		let geo = geoip.lookup(ip)
		if (geo) {
			log.country = countries[geo.country]
			log.city = cities[geo.city]
		}

		// 把已经设置过的信息过滤掉
		data.uuid = undefined
		data.category = undefined
		data.type = undefined
		data = JSON.stringify(data)
		log.detail = data

		// console.log(log)

		// 保存日志
		try {
			// await service.log.createOneLog(log)
		} catch (err) {
			console.error(err)
		}

		ctx.response.status = 200
	}
}

module.exports = LogStoreController
