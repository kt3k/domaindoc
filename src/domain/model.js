class Model {
  /**
   * @param {string} name
   * @param {string[]} aliases
   * @param {string} groupLabel
   */
  constructor ({
    name,
    aliases,
    groupLabel,
    description,
    properties,
    sourceUrl,
    editUrl
  }) {
    this.name = name
    this.aliases = aliases
    this.groupLabel = groupLabel
    this.description = description
    this.properties = properties
    this.sourceUrl = sourceUrl
    this.editUrl = editUrl
  }
}

module.exports = Model
