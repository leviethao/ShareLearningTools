<!-- app -->
<template>
  <div class="comment" v-if="replyState">
    <div class="commenter-avatar">
      <img src="../assets/images/catalog/item.png" />
    </div>
    <div class="comment-container">
      <a href="" class="commenter">{{replyState.replyer.name}}</a>
      &nbsp;
      <span class="comment-content">{{replyState.content}}</span>
    </div>
    <router-link
      class="reply-option-icon"
      v-if="replyOptionButtonShow"
      :id="'option' + replyState._id" to=''>
      <img src="../assets/images/post/optionIcon.png" class="icon" />
    </router-link>
    <div class="clear-both"></div>
    <div class="comment-footer">
      <span class="comment-time">{{`${new Date(replyState.created).toLocaleTimeString()} - ${new Date(replyState.created).getDate()}/${new Date(replyState.created).getMonth() + 1}/${new Date(replyState.created).getFullYear()}`}}</span>
    </div>
    <div class="clear-both"></div>

    <!-- reply options popover -->
    <b-popover :target="'option' + replyState._id"
      triggers="focus"
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

  </div>
</template>

<script>
import UserService from '../services/UserService'
import ReplyService from '../services/ReplyService'
import CommentService from '../services/CommentService'
import PostService from '../services/PostService'

export default {
  props: [
    'reply'
  ],
  data () {
    return {
      replyState: this.reply,
      replyOptionButtonShow: true,
      post: null,
      options: []
    }
  },
  async mounted () {
    let commentRes = await CommentService.getCommentById(this.replyState.comment)
    if (commentRes.data.comment) {
      let postRes = await PostService.getPostById(commentRes.data.comment.post)
      if (postRes.data.post) {
        this.post = postRes.data.post
      }
    }

    this.initOptions()
  },
  methods: {
    async initOptions () {
      let meResponse = await UserService.getMyUserInfo()
      let me = meResponse.data.user
      // let self = this
      if (me._id === this.replyState.replyer._id) {
        this.options = [
          {
            name: 'Chỉnh sửa',
            method: null
          },
          {
            name: 'Xóa',
            method: async () => {
              let response = await ReplyService.deleteReply(this.replyState._id)
              if (response.data.reply) {
                this.replyState = null
              } else {
                alert('Không thể xóa trả lời')
              }
            }
          }
        ]
      } else if (me._id === this.post.poster) {
        // poster can delete any reply of other replyer
        if (this.options.find(option => option.name === 'Xóa') === undefined) {
          this.options.push(
            {
              name: 'Xóa',
              method: async () => {
                let response = await ReplyService.deleteReply(this.replyState._id)
                if (response.data.reply) {
                  this.replyState = null
                } else {
                  alert('Không thể xóa trả lời')
                }
              }
            }
          )
        }
      } else {
        this.replyOptionButtonShow = false
      }
    }
  }
}
</script>

<style>
/*
.comment {
  margin: 10px 0px 0px 0px;
}
.comment img {
  width: 24px;
  height: 24px;
}
.commenter-avatar {
  width: 24px;
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
  width: 400px;
}
.comment-time {
  margin-left: 0px;
}
*/
</style>
