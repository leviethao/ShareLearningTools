const AuthenticationController = require('./controllers/AuthenticationController')
const CommonController = require('./controllers/CommonController')
// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')
const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
  app.post('/register', AuthenticationController.register)
  app.get('/', isAuthenticated, CommonController.getHomePage)
  app.get('/user', isAuthenticated, UserController.getMyUserInfo)
  // app.post('/register',
  //   AuthenticationControllerPolicy.register,
  //   AuthenticationController.register)
  // app.post('/login',
  //   AuthenticationController.login)

  // app.get('/songs',
  //   SongsController.index)
  // app.get('/songs/:songId',
  //   SongsController.show)
  // app.put('/songs/:songId',
  //   SongsController.put)
  // app.post('/songs',
  //   SongsController.post)

  // app.get('/bookmarks',
  //   isAuthenticated,
  //   BookmarksController.index)
  // app.post('/bookmarks',
  //   isAuthenticated,
  //   BookmarksController.post)
  // app.delete('/bookmarks/:bookmarkId',
  //   isAuthenticated,
  //   BookmarksController.remove)

  // app.get('/histories',
  //   isAuthenticated,
  //   HistoriesController.index)
  // app.post('/histories',
  //   isAuthenticated,
  //   HistoriesController.post)
}
