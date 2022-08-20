'use strict'

const parser = require('ua-parser-js')
const moment = require('moment')
const geoip = require('geoip-lite')
const cities = require('../../assert/cities')
const countries = require('../../assert/countries')
const fs = require('fs')
const path = require('path')
const SourceMap = require('source-map')
const { SourceMapConsumer } = SourceMap

const Controller = require('egg').Controller

class LogStoreController extends Controller {
	// 日志上报接口
	async track() {
		const { ctx, service } = this
		let data = ctx.query.log || ctx.request.body
		if (!data) {
			return console.error('无效记录')
		}

		data = typeof data === 'string' ? JSON.parse(data) : data

		let log = {}

		let ip = ctx.request.ip // '112.10.130.86'
		// 根据ip解析地理位置
		let geo = geoip.lookup(ip)
		if (geo) {
			log.country = countries[geo.country]
			log.city = cities[geo.city]
		}
		// 解析user-agent
		let ua = parser(ctx.request.header['user-agent'])

		if (
			data.category === 'stability' &&
			data.type === 'error' &&
			data.errorType === 'jsError'
		) {
			// 针对js错误需要使用sourceMap进行position定位
			const rawSourceMap = JSON.parse(
				fs.readFileSync(path.join(__dirname, `../../assert/sourceMap/${data.filename}.map`))
			)
			SourceMapConsumer.with(rawSourceMap, null, consumer => {
				let position = data.position.split(':').map(item => parseInt(item))

				const pos = consumer.originalPositionFor({
					line: position[0],
					column: position[1],
				})

				data.filename = pos.source
				data.position = `${pos.line}:${pos.column}`
			})
		}

		log = {
			...log,

			ip,
			host: ctx.request.header['host'],
			os: ua.os.name ? ua.os.name.toLowerCase() : '',
			browser: ua.browser.name ? ua.browser.name.toLowerCase() : '',
			timeStamp: moment().format('YYYY-MM-DD hh:mm:ss'),

			// 日志公共信息
			uuid: data.uuid,
			category: data.category,
			type: data.type,
		}

		// 把已经设置过的信息过滤掉
		data.uuid = undefined
		data.category = undefined
		data.type = undefined
		data = JSON.stringify(data)
		log.detail = data

		// 保存日志
		try {
			await service.log.createOneLog(log)
		} catch (err) {
			console.error(err)
		}

		// 日志生成成功
		ctx.response.status = 200
	}

	// sourceMap上传接口
	async uploadMap() {
		const { ctx } = this
		console.log()

		const body = ctx.request.body
		for (let filename in ctx.request.body) {
			const writeStream = fs.createWriteStream(
				path.join(__dirname, '../../assert/sourceMap/', filename)
			)
			writeStream.write(body[filename])
			writeStream.end()
		}

		ctx.body = 'ok'
	}
}

module.exports = LogStoreController
