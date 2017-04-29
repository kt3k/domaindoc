'use strict'

const bulbo = require('bulbo')
require('require-yaml')

module.exports = () => bulbo.cli.liftoff('domaindoc', {
  configName: '.domaindoc',
  configIsOptional: true
})
.then(({ module: domaindoc, config }) => {
  config = config || {}

  domaindoc(bulbo, config)

  return bulbo
})
