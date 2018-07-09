// connect mongodb database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/sharelearningtools')
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

const app = express()
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
