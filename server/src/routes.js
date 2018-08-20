const AuthenticationController = require('./controllers/AuthenticationController')
const CommonController = require('./controllers/CommonController')
// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')
const UserController = require('./controllers/UserController')
const ToolCategoryController = require('./controllers/ToolCategoryController')
const PostCategoryController = require('./controllers/PostCategoryController')
const PostController = require('./controllers/PostController')
const CommentController = require('./controllers/CommentController')
const ReplyController = require('./controllers/ReplyController')

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
  app.post('/register', AuthenticationController.register)
  app.get('/', isAuthenticated, CommonController.getHomePage)
  app.get('/user', isAuthenticated, UserController.getMyUserInfo)
  app.get('/toolCategories', ToolCategoryController.getAll)
  app.get('/postCategories', PostCategoryController.getAll)
  app.post('/post/create', isAuthenticated, PostController.createPost)
  app.get('/posts', PostController.getPosts)
  app.get('/user/:id', UserController.getUserInfo)
  app.post('/comment/create', isAuthenticated, CommentController.createComment)
  app.post('/reply/create', isAuthenticated, ReplyController.createReply)
  app.post('/user/update', isAuthenticated, UserController.updateUserInfo)

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
