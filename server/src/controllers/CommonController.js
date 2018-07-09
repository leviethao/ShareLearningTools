module.exports = {
  getHomePage (req, res) {
    res.send({username: req.user.name})
  }
}
