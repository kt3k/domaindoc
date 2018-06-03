const { describe, it } = require('kocha')
const { execSync } = require('child_process')
const path = require('path')

describe('domaindoc', () => {
  describe('build', () => {
    it('builds the doc website', () => {
      execSync('../cli.js build', { cwd: path.join(__dirname, 'example')})
    })
  })
})
