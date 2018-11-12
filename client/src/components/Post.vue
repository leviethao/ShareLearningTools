<template>
  <div :id="postId" class="post" v-if="postData">

    <div class="post-container">

      <div class="post-header">
        <img class="poster-avatar" src="../assets/images/catalog/item.png"/>
        <div class="post-info">
          <span class="poster">{{poster.name}}</span>
          <br>
          <span class="post-time">{{new Date(postData.created).toLocaleString('vi-GB', { timeZone: 'UTC' })}}</span>
        </div>
        <router-link
          v-if="optionButtonShow"
          class="option-icon"
          :id="postData._id" to=''>
          <img src="../assets/images/post/optionIcon.png" class="icon" />
        </router-link>
      </div>

      <!-- options popover -->
      <b-popover :target="postData._id"
        triggers="focus"
        :show.sync="optionPopoverShow"
        placement="bottomleft"
        container="toolbar">

        <div class="options-list" v-bar> <!-- el1 -->
          <router-link
            v-for="option in options"
            v-bind:key="option.name"
            to="" class="option-item"
            v-on:click.native="option.method">
            <div class="option-content">
              <div class="option-text">
                {{option.name}}
              </div>
            </div>
          </router-link>
        </div>
      </b-popover>


      <div class="post-body">
        <span class="post-content">
          {{postData.content}}
        </span>
        <br>

        <span v-if="postData.postCategory.name === 'Cung Cấp'" class="post-exchange-condition">
          Điều kiện trao đổi: &nbsp;
          {{postData.exchangeCondition}}
        </span>
        <div v-if="postData.fileNames.length > 0">
          <div class="file-post-container">
            <span v-for="fileName in postData.fileNames" :key="fileName" >
              <a
                class="file-post"
                :href="config.serverHost + fileName"
                download
                target="_blank"
                v-if="(/\.(gif|jpg|jpeg|tiff|png|mp4)$/i).test(fileName) === false" >
                <p>{{fileName}}</p>
              </a>
            </span>
          </div>
          <div class="image-post-container">
            <span v-for="fileName in postData.fileNames" :key="fileName" >
              <img
                class="image-post"
                @click="showImageModal"
                v-if="(/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileName)"
                :src="config.serverHost + fileName"/>
            </span>
          </div>
          <div class="video-post-container">
            <span v-for="fileName in postData.fileNames" :key="fileName" >
              <video
                class="video-post"
                controls
                v-if="(/\.(mp4)$/i).test(fileName)" >
                <source :src="config.serverHost + fileName" type="video/mp4">
              </video>
            </span>
          </div>
          <image-modal
            :imgSrc="imgSrc"
            v-if="isShowImageModal"
            @close="isShowImageModal = false"/>
        </div>
      </div>

      <div class="post-footer">
        <button class="post-footer-btn-left post-footer-btn" @click="onBtnCmtClicked"><span>Bình luận</span></button>
        <button :id="`contact-btn-${postId}`" class="post-footer-btn-right post-footer-btn"><span>Liên hệ</span></button>
      </div>

      <!-- contact popover -->
      <contact-popover
        :target="`contact-btn-${postId}`"
        :container="postId"
        :contact="poster.phoneNumber || 'Không có liên hệ'" />

    </div>

    <!-- comment box -->
    <div class="comment-box" v-show="isShowCommentBox">
      <div class="comment-list">
        <div v-for="comment in postData.comments" :key="comment">
          <div class="comment">
            <div class="commenter-avatar">
              <img src="../assets/images/catalog/item.png" />
            </div>
            <div class="comment-container">
              <a href="" class="commenter">{{comment.commenter.name}}</a>
              &nbsp;
              <span class="comment-content">{{comment.content}}</span>
            </div>
            <div class="clear-both"></div>
            <div class="comment-footer">
              <a href=""><span class="cmt-reply-link">Trả lời</span></a>
              <span class="comment-time">{{new Date(comment.created).toLocaleString('vi-GB', { timeZone: 'UTC' })}}</span>
            </div>
            <div class="clear-both"></div>

            <!-- comment reply box -->
            <div class="comment-reply-box">
              <div class="comment-list">
                <div v-for="reply in comment.replies" :key="reply">
                  <div class="comment">
                    <div class="commenter-avatar">
                      <img src="../assets/images/catalog/item.png" />
                    </div>
                    <div class="comment-container">
                      <a href="" class="commenter">{{reply.replyer.name}}</a>
                      &nbsp;
                      <span class="comment-content">{{reply.content}}</span>
                    </div>
                    <div class="clear-both"></div>
                    <div class="comment-footer">
                      <span class="comment-time">{{new Date(reply.created).toLocaleString('vi-GB', { timeZone: 'UTC' })}}</span>
                    </div>
                    <div class="clear-both"></div>
                  </div>
                </div>
              </div>

              <!-- add reply -->
              <div class="add-reply">
                <div class="commenter-avatar">
                  <img src="../assets/images/catalog/item.png" />
                </div>
                <div class="comment-textarea">
                  <auto-size-textarea
                    :ID="'reply' + postData._id"
                    :commentId="comment._id"
                    :onReply="onReply"/>
                </div>
                <div class="clear-both"></div>
              </div>

            </div>
            <div class="clear-both"></div>

          </div>
        </div>
      </div>

      <div class="add-comment">
        <div class="commenter-avatar">
          <img src="../assets/images/catalog/item.png" />
        </div>
        <div class="comment-textarea">
          <auto-size-textarea
            :ID="'comment'+postData._id"
            placeholderValue="Viết bình luận"
            :onComment="onComment"/>
        </div>
        <div class="clear-both"></div>
      </div>

    </div>
  </div>
</template>

<script>
import AutoSizeTextarea from './AutoSizeTextarea'
import ContactPopover from './ContactPopover'
import UserService from '../services/UserService'
// import BusService from '../services/BusService'
import CommentService from '../services/CommentService'
import ReplyService from '../services/ReplyService'
import config from '../config'
import ImageModal from './ImageModal'
import PostService from '../services/PostService'
// import PostCategoryService from '../services/PostCategoryService'
import ExchangeService from '../services/ExchangeService'

export default {
  components: {
    AutoSizeTextarea,
    ContactPopover,
    ImageModal
  },
  props: [
    'post_data'
  ],
  data () {
    return {
      contactPopoverShow: false,
      poster: {},
      postData: {},
      config: config,
      imgSrc: '',
      isShowImageModal: false,
      isShowCommentBox: false,
      optionPopoverShow: false,
      options: [],
      optionButtonShow: true,
      received: false
    }
  },
  computed: {
    postId: {
      get () {
        return '_' + this.postData._id
      }
    }
  },
  async mounted () {
    this.postData = this.post_data
    this.poster = await this.getPoster()
    // BusService.$on('comment' + this.postData._id, async (text) => {
    //   let commentData = {
    //     content: text,
    //     post: this.postData._id
    //   }
    //   await CommentService.createComment(commentData)
    // })

    // BusService.$on('reply' + this.postData._id, async (text, commentId) => {
    //   let replyData = {
    //     content: text,
    //     comment: commentId
    //   }
    //   await ReplyService.createReply(replyData)
    // })

    this.initOptions()
  },
  methods: {
    onBtnCmtClicked () {
      this.isShowCommentBox = !this.isShowCommentBox
    },
    async getPoster () {
      let userRes = await UserService.getUserInfo(this.postData.poster)
      return userRes.data.user
    },
    async getUserInfo (id) {
      let commenterRes = await UserService.getUserInfo(id)
      return commenterRes.data.user
    },
    async onComment (text) {
      let commentData = {
        content: text,
        post: this.postData._id
      }
      let response = await CommentService.createComment(commentData)
      this.postData.comments.push(response.data.comment)
    },
    async onReply (text, commentId) {
      let replyData = {
        content: text,
        comment: commentId
      }

      let response = await ReplyService.createReply(replyData)

      // find current comment and insert reply for it
      for (let comment of this.postData.comments) {
        if (comment._id === commentId) {
          comment.replies.push(response.data.reply)
        }
      }
    },
    showImageModal (event) {
      this.imgSrc = event.target.src
      this.isShowImageModal = true
    },
    async initOptions () {
      let meResponse = await UserService.getMyUserInfo()
      let me = meResponse.data.user
      let self = this

      if (me._id === this.poster._id) {
        this.options = [
          {
            name: 'Chỉnh sửa',
            method: null
          },
          {
            name: 'Xóa',
            method: async () => {
              let response = await PostService.deletePost(this.postData._id)
              if (response.data.post._id) {
                this.postData = null
              } else {
                alert('Không thể xóa bài đăng')
              }
            }
          },
          {
            name: this.postData.enable ? 'Tắt thông báo' : 'Bật thông báo',
            async method () {
              if (self.postData.enable) {
                let res = await PostService.disablePost(self.postData._id)
                if (res.data.post) {
                  self.postData.enable = false
                  this.name = 'Bật thông báo'
                }
              } else {
                let res = await PostService.enablePost(self.postData._id)
                if (res.data.post) {
                  self.postData.enable = true
                  this.name = 'Tắt thông báo'
                }
              }
            }
          }
        ]
      } else if (this.postData.postCategory.name.toLowerCase() === 'cung cấp') {
        let isReceivedRes = await ExchangeService.isReceived(this.postData._id)
        this.received = isReceivedRes.data.isReceived
        this.options = [
          {
            name: this.received ? 'Bỏ xác nhận' : 'Xác nhận đã nhận',
            async method () {
              if (self.received) {
                return
              } else {
                let res = await ExchangeService.receive(self.postData._id)
                if (!res.data.exchange) {
                  alert('Lỗi hệ thống')
                  return
                }
                this.name = 'Bỏ xác nhận'
                self.received = true
              }
            }
          }
        ]
      } else {
        this.optionButtonShow = false
      }
    }
  }
}
</script>

<style>
.post {
  width: 500px;
  background-color: #fff;
  margin: auto;
  border: solid rgba(196, 190, 190, 0.377) 1px;
}
.post-container {
  /* background-color: blue; */
  margin: 10px 10px 0px 10px;
}
.post-header {
  /* background-color: orange; */
  height: 60px;
  display: flex;
  align-items: center;
}
.poster-avatar {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.post-info {
  float: left;
  /* background-color: yellow; */
  margin-left: 10px;
  text-align:left;
}
.post-time {
  font-size: 14px;
  text-align:left;
}
.post-body {
  text-align: left;
  margin: 5px 0px;
}
.postImage:hover {
  background-color:  rgba(255, 0, 255, 1);
}
.post-footer {
  height: 40px;
  /* background-color: red; */
  border-top: solid rgba(196, 190, 190, 0.377) 1px;
  display: flex;
  align-items: center;
}
.post-footer-btn {
  height: 80%;
  border: none;
  background-color: rgba(0, 0, 255, 0);
}
.post-footer-btn:focus {
  outline: none;
}
.post-footer-btn:hover {
  background-color: rgba(172, 149, 177, 0.267);
}
.post-footer-btn:active {
  background-color: rgba(102, 63, 110, 0.493);
}
.post-footer-btn-left {
  width: 50%;
  margin-right: 10px;
}
.post-footer-btn-right {
  width: 50%;
  margin-left: 10px;
}

/* commnet box */
.comment-box {
  border-top: solid rgba(196, 190, 190, 0.377) 1px;
  /* background-color: yellow; */
}
.comment {
  margin: 10px 10px 0px 10px;
}
.commenter-avatar {
  width: 32px;
  height: 100%;
  float: left;
  /* background-color: red; */
}
.commenter-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.comment-container {
  float: right;
  width: 440px;
  padding: 5px 10px;
  background-color: rgba(197, 123, 226, 0.274);
  border-radius: 20px;
  text-align: left;
}
.clear-both {
  clear: both;
}
.comment-footer {
  /* background-color:rgb(169, 134, 204); */
  width: 440px;
  float: right;
  padding: 0px 10px;
}
.cmt-reply-link {
  float: left;
}
.comment-time {
  float: left;
  margin-left: 20px;
}

/* comment reply box */
.comment-reply-box {
  width: 430px;
  float: right;
}
.comment-reply-box .comment {
  margin: 10px 0px 0px 0px;
}
.comment-reply-box .comment img {
  width: 24px;
  height: 24px;
}
.comment-reply-box .commenter-avatar {
  width: 24px;
}
.comment-reply-box .comment-container {
  width: 400px;
}
.comment-reply-box .comment-footer {
  width: 400px;
}
.comment-reply-box .comment-time {
  margin-left: 0px;
}

/* add comment */
.add-comment {
  /* background-color: red; */
  margin: 10px 10px;
}
.comment-textarea {
  float: right;
  width: 440px;
  padding: 0px 0px 0px 10px;
  /* background-color: rgb(50, 250, 250); */
  text-align: left;
}
.comment-textarea .textarea {
  background-color: rgb(250, 250, 250);
  border-radius: 20px;
  padding: 6px 10px;
}

.add-reply {
  margin: 10px 0px 10px -10px;
  /* background-color: red; */
}
.add-reply .commenter-avatar img {
  width: 24px;
  height: 24px;
}
.add-reply .comment-textarea {
  width: 410px;
  padding: 0px 0px 0px 10px;
}
.add-reply .comment-textarea textarea {
  padding: 2px 10px;
}

.option-list {
  display: block;
}
.option-item{
  display: block;
  width: 230px;
  height: 30px;
  padding: 5px 10px;
  background-color: rgb(238, 212, 245);
  border-bottom: solid 1px rgb(203, 199, 206);
}
.option-item:link {
  text-decoration: none;
}
.option-item:hover {
  background-color: rgb(224, 190, 231);
}
.option-item:active {
  background-color: #A33BBA;
}
.option-content {
  height: 100%;
  /* background-color: yellow; */
  display: flex;
  align-items: center;
}
.option-text {

}
.option-icon {
  float: left;
  margin-left: 200px;
}
.option-icon img {
  border-radius: 50%;
  width: 30px;
}
.image-post {
  padding: 5px 5px;
  width: 159px;
  height: 200px;
}
.video-post {
  padding: 5px 5px;
  width: 238px;
}
.image-post-container {
  width: 100%;
}
.video-post-container {
  width: 100%;
}
</style>
