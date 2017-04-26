'use strict'

const bulbo = require('bulbo')
require('require-yaml')

module.exports = () => bulbo.cli.liftoff('domaindoc', {
  configName: '.domaindoc',
  configIsOptional: true
})
.then(({ module: domaindoc, config }) => {
  config = config || {}

  if (config.port) { domaindoc.port(config.port) }
  if (config.dest) { domaindoc.dest(config.dest) }
  if (config.title) { domaindoc.title(config.title) }
  if (config.source) { domaindoc.source(config.source) }
  if (config.basepath) { domaindoc.basepath(config.basepath) }

  domaindoc(bulbo)

  return bulbo
})
