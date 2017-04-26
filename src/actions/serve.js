'use strict'

const liftoff = require('../util/liftoff')

module.exports = () => liftoff()
  .then(bulbo => bulbo.serve())
  .catch(e => console.log(e.stack || e))
