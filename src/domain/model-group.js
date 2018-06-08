class ModelGroup {
  /**
   * @param {string} label
   * @param {string} color
   * @param {Model[]} models
   */
  constructor ({ label, color, models }) {
    this.label = label
    this.color = color
    this.models = models || []
  }

  add (model) {
    this.models.push(model)
  }
}

module.exports = ModelGroup
