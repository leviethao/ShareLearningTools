var multer = require('multer')

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/public/images')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})

var upload = multer({ storage: Storage }).array('files', 50) // Field name and max count

module.exports = {
  getHomePage (req, res) {
  },
  uploadFile (req, res) {
    upload(req, res, function (err) {
      if (err) {
        throw err
      }

      let fileNames = []
      for (let file of req.files) {
        fileNames.push('images/' + file.filename)
      }

      res.send({isSuccess: true, fileNames: fileNames})
    })
  }
}
