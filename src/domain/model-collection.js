const ModelGroup = require('./model-group')
const nunjucks = require('nunjucks')
const split = expr => expr.match(/[a-zA-Z0-9]+|[^a-zA-Z0-9]+/g)
const escapeHtml = require('escape-html')

class ModelCollection {
  /**
   * @param {Model[]} models
   */
  constructor (models = []) {
    this.models = []
    this.groups = {}
    this.modelMap = {}

    models.forEach(model => {
      this.add(model)
    })
  }

  /**
   * Sorts the models.
   */
  sort () {
    this.models.sort((x, y) => x.compare(y))
    Object.keys(this.groups).forEach(key => {
      this.groups[key].models.sort((x, y) => x.compare(y))
    })
  }

  getGroups () {
    return Object.keys(this.groups).map(label => this.groups[label])
  }

  /**
   * @param {Model}
   * @return {Model[]}
   */
  getOwners (child) {
    return this.models.filter(parent => parent.has(child))
  }

  /**
   * @param {string} name The name of the model
   */
  getByName (name) {
    return this.modelMap[name]
  }

  createGroupOfLabel (label, color) {
    this.groups[label] = new ModelGroup({ label, color })
  }

  /**
   * @param {Model} model
   */
  add (model) {
    this.models.push(model)

    this.modelMap[model.name] = model

    if (model.aliases) {
      model.aliases.forEach(alias => {
        this.modelMap[alias] = model
      })
    }

    if (!this.groups[model.groupLabel]) {
      this.createGroupOfLabel(model.groupLabel, model.groupColor)
    }

    this.groups[model.groupLabel].add(model)
  }

  /**
   * @param {string} text
   * @param {string} basepath
   * @param {string} tmpl nunjucks template
   */
  linkType (text, basepath, tmpl) {
    return split(text)
      .map(expr => {
        const model = this.getByName(expr)

        if (!model) {
          return escapeHtml(expr)
        }

        return nunjucks.renderString(tmpl, {
          href: model.getHref(basepath),
          type: expr
        })
      })
      .join('')
  }
}

module.exports = ModelCollection
