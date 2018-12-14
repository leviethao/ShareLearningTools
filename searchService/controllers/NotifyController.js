const AppService = require('../services/AppService')
const Post = require('../models/post')
const Notify = require('../models/notify')
const User = require('../models/user')

var queue = []
var isRuning = false

module.exports = {
  addPostToQueue (req, res) {
    queue.push(req.body.postId)
    res.send('')
    // AppService.sendPostNotify('id001', ['111', '222'])
  }
}

// run repeat forever
// run()
setInterval(execute, 3000)

function run () {
  console.log('==================RUNING====================')
  setInterval(async () => {
    if (!isRuning) {
      await execute()
    }
  }, 3000)
}

async function execute () {
  // console.log('TEST1 =================================== ')
  // console.log('IS RUNING: ', isRuning)
  // if (isRuning) return
  isRuning = true
  // console.log('LENGTH: ', queue.length)
  if (queue.length === 0) return
  // console.log('TEST2 =================================== ')
  let copyQueue = []
  copyQueue.push(...queue)
  queue = []

  let prevPosts = await Post.find()
  // console.log('TEST: ', prevPosts.length)
  for (let postId of copyQueue) {
    let post = await Post.findById(postId).where('enable').equals(true).exec()
    if (!post) continue

    for (let prevPost of prevPosts) {
      if (post.postCategory.toString() === prevPost.postCategory.toString() ||
          post.poster.toString() === prevPost.poster.toString()) continue
      if (checkMatchKeyWord(post.content, prevPost.content)) {
        //create notify
        let notify = new Notify({
          content: 'Có bài đăng mới có thể phù hợp với bạn',
          user: prevPost.poster,
          link: post.url
        })
        let _notify = await notify.save()
        if (!_notify) continue
        console.log(_notify.content + ' : ' + prevPost.content + '=================================')
        
        // add notify to poster
        let user = await User.findById(prevPost.poster)
        if (!user) continue
        user.notifies.push(_notify._id)
        user.save()

        let notify2 = new Notify({
          content: 'Có bài đăng mới có thể phù hợp với bạn',
          user: post.poster,
          link: prevPost.url
        })
        let _notify2 = await notify2.save()
        if (!_notify2) continue
        console.log(_notify2.content + ' : ' + post.content + '=================================')
        
        // add notify to poster
        let user2 = await User.findById(post.poster)
        if (!user2) continue
        user2.notifies.push(_notify2._id)
        user2.save()
      }
    }
  }
  isRuning = false
}

function checkMatchKeyWord (postContent1, postContent2) {
  let count = 0
  let wordArr1 = postContent1.split(' ')
  //normalize words
	for (let i = 0; i < wordArr1.length; i++) {
		wordArr1[i] = wordArr1[i].trim();
  }
  let wordArr2 = postContent2.split(' ')
  //normalize words
	for (let i = 0; i < wordArr2.length; i++) {
		wordArr2[i] = wordArr2[i].trim();
  }
  
  for (let word1 of wordArr1) {
    for (let word2 of wordArr2) {
      if (word1.toLowerCase() === word2.toLowerCase()) {
        count++
      }
    }
  }
  console.log('COUNT: ', count)
  return count / postContent1.length > 0.1
}


