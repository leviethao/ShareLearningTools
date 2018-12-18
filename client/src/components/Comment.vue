<!-- app -->
<template>
  <div :id="commentState._id" class="comment" v-if="this.commentState && isShow()">
    <div class="commenter-avatar">
      <img :src="config.serverHost + commentState.commenter.avatar" />
    </div>
    <div :class="isEdit ? 'comment-container edit-cmt' : 'comment-container'">
      <a href="" class="commenter" v-show="!isEdit">{{commentState.commenter.name}}</a>
      <span class="comment-content" v-show="!isEdit">
        {{commentState.content}}
      </span>
      <div class="comment-edit" v-show="isEdit">
        <auto-size-textarea
          ref="editBox"
          :ID="'comment'+commentState._id"
          :content="commentState.content"
          :onComment="saveEdit"/>
      </div>
      <div style="clear: both;"></div>
    </div>
    <router-link
      class="cmt-option-icon"
      v-if="cmtOptionButtonShow"
      :id="'option' + commentState._id" to=''>
      <img src="../assets/images/post/optionIcon.png" class="icon" />
    </router-link>
    <div class="clear-both"></div>
    <div class="comment-footer" v-show="!isEdit">
      <a href=""><span class="cmt-reply-link">Trả lời</span></a>
      <span class="comment-time">{{`${new Date(commentState.created).toLocaleTimeString()} - ${new Date(commentState.created).getDate()}/${new Date(commentState.created).getMonth() + 1}/${new Date(commentState.created).getFullYear()}`}}</span>
    </div>
    <div class="clear-both"></div>

    <!-- comment options popover -->
    <b-popover :target="'option' + commentState._id"
      triggers="focus"
      placement="bottomleft"
      container="">

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

    <!-- comment reply box -->
    <div class="comment-reply-box">
      <div class="comment-list">
        <div v-for="reply in commentState.replies" :key="reply">
          <div class="comment">
            <reply :reply="reply" />
          </div>
        </div>
      </div>

      <!-- add reply -->
      <div class="add-reply">
        <div class="commenter-avatar">
          <img :src="config.serverHost + user.avatar" />
        </div>
        <div class="comment-textarea">
          <auto-size-textarea
            :ID="'reply' + commentState.post"
            :commentId="commentState._id"
            :onReply="onReply"/>
        </div>
        <div class="clear-both"></div>
      </div>

    </div>
    <div class="clear-both"></div>

  </div>
</template>

<script>
import ReplyService from '../services/ReplyService'
import Reply from './Reply'
import AutoSizeTextarea from './AutoSizeTextarea'
import UserService from '../services/UserService'
import PostService from '../services/PostService'
import ExchangeService from '../services/ExchangeService'
import CommentService from '../services/CommentService'
import config from '../config'

export default {
  components: {
    Reply,
    AutoSizeTextarea
  },
  props: [
    'comment'
  ],
  computed: {
  },
  data () {
    return {
      config: config,
      commentState: null,
      cmtOptionButtonShow: true,
      post: null,
      received: false,
      optionButtonShow: true,
      options: [],
      user: null,
      isEdit: false
    }
  },
  async created () {
    this.commentState = this.comment
    // get my user info
    let userRes = await UserService.getMyUserInfo()
    this.user = userRes.data.user
  },
  async mounted () {
    let postRes = await PostService.getPostById(this.commentState.post)
    this.post = postRes.data.post
    this.initOptions()
  },
  watch: {
    isEdit () {
      // this.$refs.editBox.getElementsByTagName('input')[0].focus()
    }
  },
  methods: {
    isShow () {
      return this.comment.commenter._id === this.user._id || this.post.poster === this.user._id
    },
    async saveEdit (content) {
      let cmtRes = await CommentService.updateComment(this.commentState._id, content)
      if (cmtRes.data.comment) {
        this.commentState = cmtRes.data.comment
        this.isEdit = false
      }
    },
    async onReply (text, commentId) {
      let replyData = {
        content: text,
        comment: commentId
      }

      let response = await ReplyService.createReply(replyData)

      // insert reply to comment
      this.commentState.replies.push(response.data.reply)
    },
    async initOptions () {
      let meResponse = await UserService.getMyUserInfo()
      let me = meResponse.data.user
      let self = this
      if (me._id === this.commentState.commenter._id) {
        this.options = [
          {
            name: 'Chỉnh sửa',
            method: () => {
              this.isEdit = true
            }
          },
          {
            name: 'Xóa',
            method: async () => {
              let response = await CommentService.deleteComment(this.commentState._id)
              if (response.data.comment) {
                this.commentState = null
              } else {
                alert('Không thể xóa bình luận')
              }
            }
          }
        ]
      } else if (me._id === this.post.poster) {
        // poster can delete any comment of other commenter
        if (this.options.find(option => option.name === 'Xóa') === undefined) {
          this.options.push(
            {
              name: 'Xóa',
              method: async () => {
                let response = await CommentService.deleteComment(this.commentState._id)
                if (response.data.comment) {
                  this.commentState = null
                } else {
                  alert('Không thể xóa bình luận')
                }
              }
            }
          )
        }

        // poster receive from provider
        if (this.post.postCategory.name.toLowerCase() === 'cần tìm') {
          let isReceivedRes = await ExchangeService.isReceived(this.post._id)
          this.received = isReceivedRes.data.isReceived
          this.options.push(
            {
              name: this.received ? 'Bỏ xác nhận' : 'Xác nhận đã nhận',
              async method () {
                if (self.received) {
                  return
                } else {
                  let res = await ExchangeService.receiveFromComment(self.commentState._id)
                  if (!res.data.exchange) {
                    alert('Lỗi hệ thống')
                    return
                  }
                  this.name = 'Bỏ xác nhận'
                  self.received = true
                }
              }
            }
          )
        }
      } else {
        this.cmtOptionButtonShow = false
      }
    }
  }
}
</script>

<style>
.comment-edit {
  width: 100%;
  float: left;
  background-color: rgb(250, 250, 250);
}
.edit-cmt {
  background-color: rgb(250, 250, 250);
}
.edit-cmt textarea {
  background-color: rgb(250, 250, 250);
}
/*
.comment {
  margin: 10px 10px 0px 10px;
}
.commenter-avatar {
  width: 32px;
  height: 100%;
  float: left;
}
.commenter-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.comment-container {
  float: left;
  width: 400px;
  padding: 5px 10px;
  background-color: rgba(197, 123, 226, 0.274);
  border-radius: 20px;
  text-align: left;
  margin-left: 5px;
}
.comment-content {
}
.clear-both {
  clear: both;
}
.comment-footer {
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

.cmt-option-icon {
  float: left;
  margin-left: 5px;
}
.cmt-option-icon img {
  border-radius: 50%;
  width: 20px;
  margin-top: 7px;
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
  display: flex;
  align-items: center;
}
.option-text {

}

.comment-reply-box {
  width: 430px;
  float: right;
}
.add-reply {
  margin: 10px 0px 10px -10px;
}
.add-reply .commenter-avatar img {
  width: 24px;
  height: 24px;
}
.comment-textarea {
  float: right;
  width: 410px;
  padding: 0px 0px 0px 10px;
  text-align: left;
}
.comment-textarea .textarea {
  background-color: rgb(250, 250, 250);
  border-radius: 20px;
  padding: 2px 10px;
}
*/
</style>
