const minirocket = require('minirocket')

module.exports = argv => {
  const v = argv.v
  const h = argv.h
  const version = argv.version
  const help = argv.help
  const action = argv._[0]

  minirocket({
    version: v || version,
    help: h || help,
    serve: !action,
    [action]: true
  }, action => action(argv)).on('no-action', name => {
    console.log(`Error: Action not found: ${name}`)
    require('./actions/help')()
    process.exit(1)
  })
}
