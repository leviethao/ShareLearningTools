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
const NotifyController = require('./controllers/NotifyController')
const ExchangeController = require('./controllers/ExchangeController')

const PREFIX = '/server'

module.exports = (app) => {
  app.post(PREFIX + '/login', AuthenticationController.login)
  app.post(PREFIX + '/register', AuthenticationController.register)
  app.get(PREFIX + '/', isAuthenticated, CommonController.getHomePage)
  app.get(PREFIX + '/user', isAuthenticated, UserController.getMyUserInfo)
  app.get(PREFIX + '/mynotifies', isAuthenticated, UserController.getMyNotifies)
  app.post(PREFIX + '/notify/updatestatus/:id', isAuthenticated, NotifyController.updateNotifyStatus)
  app.get(PREFIX + '/toolCategories', ToolCategoryController.getAll)
  app.get(PREFIX + '/postCategories', PostCategoryController.getAll)
  app.get(PREFIX + '/postCategory/:id', PostCategoryController.getPostCategory)

  app.post(PREFIX + '/post/create', isAuthenticated, PostController.createPost)
  app.get(PREFIX + '/posts', PostController.getPosts)
  app.get(PREFIX + '/enablePosts', PostController.getEnablePosts)
  app.get(PREFIX + '/myPosts', isAuthenticated, PostController.getMyPosts)
  app.get(PREFIX + '/post/:id', isAuthenticated, PostController.getPostById)
  app.delete(PREFIX + '/post/delete/:id', isAuthenticated, PostController.deletePost)
  app.put(PREFIX + '/post/enable/:id', isAuthenticated, PostController.enablePost)
  app.put(PREFIX + '/post/disable/:id', isAuthenticated, PostController.disablePost)

  app.get(PREFIX + '/user/:id', UserController.getUserInfo)
  app.post(PREFIX + '/comment/create', isAuthenticated, CommentController.createComment)
  app.delete(PREFIX + '/comment/delete/:id', isAuthenticated, CommentController.deleteComment)
  app.get(PREFIX + '/comment/:id', isAuthenticated, CommentController.getCommentById)

  app.post(PREFIX + '/reply/create', isAuthenticated, ReplyController.createReply)
  app.delete(PREFIX + '/reply/delete/:id', isAuthenticated, ReplyController.deleteReply)
  app.post(PREFIX + '/user/update', isAuthenticated, UserController.updateUserInfo)
  app.post(PREFIX + '/upload', CommonController.uploadFile)

  app.post(PREFIX + '/exchange/receive', isAuthenticated, ExchangeController.receive)
  app.post(PREFIX + '/exchange/isReceived', isAuthenticated, ExchangeController.isReceived)
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
