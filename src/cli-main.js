const chalk = require('chalk')
const minirocket = require('minirocket')
const { select } = require('action-selector')

module.exports = argv => new Cli(argv).main()

class Cli {
  constructor (argv) {
    this.argv = argv
  }

  main () {
    const argv = this.argv

    const v = argv.v
    const h = argv.h
    const version = argv.version
    const help = argv.help
    const action = argv._[0]

    select(this, {
      version: v || version,
      help: h || help,
      serve: !action,
      [action]: true
    })
    .on('action', action => action.call(this))
    .on('no-action', name => this.noAction(name))
  }

  noAction (name) {
    console.log(chalk.red('Error:'), `'${name}' is not a domaindoc command. See 'domaindoc --help'.`)
    process.exit(1)
  }

  'action:version' () {
    require('./actions/version')()
  }

  'action:help' () {
    require('./actions/help')()
  }

  'action:build' () {
    require('./actions/build')()
  }

  'action:serve' () {
    require('./actions/serve')()
  }
}
