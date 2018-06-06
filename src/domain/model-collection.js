class ModelCollection {
  /**
   * @param {Model[]} models
   */
  constructor (models = []) {
    this.models = []

    models.forEach(model => {
      this.add(model)
    })
  }
  /**
   * @return {ModelCollection[]}
   */
  getGroups () {
    // TODO:
  }

  /**
   * @param {Model} model
   */
  add (model) {
    // TODO:
  }
}

module.exports = ModelCollection
