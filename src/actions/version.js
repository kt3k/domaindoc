const pkg = require('../../package')

/**
 * Shows the version.
 */
module.exports = () => {
  console.log(`domaindoc@${pkg.version}`)
}
