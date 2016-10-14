'use strict'

const bulbo = require('bulbo')

module.exports = () => bulbo.cli.liftoff('domaindoc', {configIsOptional: true})
.then(domaindoc => {
  try {
    domaindoc(bulbo)

    bulbo.build()
  } catch (e) {
    console.log(e.stack)
  }
})
