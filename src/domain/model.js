const split = expr => expr.match(/[a-zA-Z0-9]+/g)

class Model {
  /**
   * @param {string} name
   * @param {string[]} aliases
   * @param {string} groupLabel
   */
  constructor ({
    name,
    path,
    aliases,
    groupLabel,
    groupColor,
    description,
    properties,
    sourceUrl,
    editUrl
  }) {
    this.name = name
    this.path = path
    this.aliases = aliases
    this.groupLabel = groupLabel
    this.groupColor = groupColor
    this.description = description
    this.properties = properties
    this.sourceUrl = sourceUrl
    this.editUrl = editUrl
  }

  /**
   * Returns true if this model has the given model as a property.
   * @param {Model} model The model
   * @return {boolean}
   */
  has (model) {
    return this.properties.some(prop => split(prop.type).includes(model.name))
  }
}

module.exports = Model
