const ToolCategory = require('../models/tool_category')

module.exports = {
  async getAll (req, res) {
    await ToolCategory.find({}, function (err, toolCategories) {
      if (err) throw err
      res.send({toolCategories: toolCategories})
    })
  }
}
