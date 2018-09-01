
var common = require('./common')
var envConfig = require(`./${process.env.NODE_ENV || 'prod'}`)
var config = Object.assign(common, envConfig)

export default config
