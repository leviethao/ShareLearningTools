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

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
  app.post('/register', AuthenticationController.register)
  app.get('/', isAuthenticated, CommonController.getHomePage)
  app.get('/user', isAuthenticated, UserController.getMyUserInfo)
  app.get('/mynotifies', isAuthenticated, UserController.getMyNotifies)
  app.post('/notify/updatestatus/:id', isAuthenticated, NotifyController.updateNotifyStatus)
  app.get('/toolCategories', ToolCategoryController.getAll)
  app.get('/postCategories', PostCategoryController.getAll)
  app.get('/postCategory/:id', PostCategoryController.getPostCategory)

  app.post('/post/create', isAuthenticated, PostController.createPost)
  app.get('/posts', PostController.getPosts)
  app.get('/enablePosts', PostController.getEnablePosts)
  app.get('/myPosts', isAuthenticated, PostController.getMyPosts)
  app.get('/post/:id', isAuthenticated, PostController.getPostById)
  app.delete('/post/delete/:id', isAuthenticated, PostController.deletePost)
  app.put('/post/enable/:id', isAuthenticated, PostController.enablePost)
  app.put('/post/disable/:id', isAuthenticated, PostController.disablePost)

  app.get('/user/:id', UserController.getUserInfo)
  app.post('/comment/create', isAuthenticated, CommentController.createComment)
  app.delete('/comment/delete/:id', isAuthenticated, CommentController.deleteComment)
  app.get('/comment/:id', isAuthenticated, CommentController.getCommentById)

  app.post('/reply/create', isAuthenticated, ReplyController.createReply)
  app.delete('/reply/delete/:id', isAuthenticated, ReplyController.deleteReply)
  app.post('/user/update', isAuthenticated, UserController.updateUserInfo)
  app.post('/upload', CommonController.uploadFile)

  app.post('/exchange/receive', isAuthenticated, ExchangeController.receive)
  app.post('/exchange/isReceived', isAuthenticated, ExchangeController.isReceived)
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
