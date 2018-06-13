const split = expr => expr.match(/[a-zA-Z0-9]+/g)
const { dirname, relative } = require('path')

class Model {
  /**
   * @param {string} name
   * @param {string[]} aliases
   * @param {string} groupLabel
   */
  constructor ({
    name,
    type,
    labels,
    path,
    aliases,
    groupLabel,
    groupColor,
    groupIndex,
    description,
    properties,
    sourceUrl,
    editUrl,
    notes
  }) {
    this.name = name
    this.type = type
    this.labels = labels
    this.path = path
    this.aliases = aliases
    this.groupLabel = groupLabel
    this.groupColor = groupColor
    this.groupIndex = groupIndex
    this.description = description
    this.properties = properties
    this.sourceUrl = sourceUrl
    this.editUrl = editUrl
    this.notes = notes
  }

  /**
   * Returns true if this model has the given model as a property.
   * @param {Model} model The model
   * @return {boolean}
   */
  has (model) {
    return this.properties.some(prop => split(prop.type).includes(model.name))
  }

  /**
   * @param {string} basepath
   */
  getHref (basepath) {
    return `${basepath}/${this.path}`
  }

  /**
   * Gets the basepath relative from this model
   */
  basepath () {
    return dirname(relative(this.path, ''))
  }

  /**
   * @param {Model} that
   * @return {number}
   */
  compare (that) {
    if (this.groupIndex !== that.groupIndex) {
      return this.groupIndex - that.groupIndex
    }

    return this.name > that.name ? 1 : this.name < that.name ? -1 : 0
  }
}

module.exports = Model
