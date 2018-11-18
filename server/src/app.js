// connect mongodb database
const mongoose = require('mongoose')
// var mongodbUrl = 'mongodb://admin1:admin1@ds239638.mlab.com:39638/nckhdb'
var mongodbUrl = 'mongodb://localhost:27017/sharelearningtools'
mongoose.connect(mongodbUrl, {useNewUrlParser: true})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection succeeded')
})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

require('./routes')(app)

// sequelize.sync({force: false})
//   .then(() => {
//     app.listen(config.port)
//     console.log(`Server started on port ${config.port}`)
//   })
app.listen(config.port)
console.log(`Server started on port ${config.port}`)
