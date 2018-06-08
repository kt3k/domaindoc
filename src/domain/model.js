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
}

module.exports = Model
