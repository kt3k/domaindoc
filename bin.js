#!/usr/bin/env node
'use strict'

const bulbo = require('bulbo')

bulbo.cli.liftoff('domaindoc', {configIsOptional: true}).then(domaindoc => {
  try {
    domaindoc(bulbo)

    bulbo.serve()
  } catch (e) {
    console.log(e.stack)
  }
})
