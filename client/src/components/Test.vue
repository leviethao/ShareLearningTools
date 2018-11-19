<!-- app -->
<template>

</template>

<script>
import ReplyService from '../services/ReplyService'

export default {
  props: [
    'comment'
  ],
  data () {
    return {
      commentState: this.comment,
      cmtOptionButtonShow: true
    }
  },
  methods: {
    async onReply (text, commentId) {
      let replyData = {
        content: text,
        comment: commentId
      }

      let response = await ReplyService.createReply(replyData)

      // insert reply to comment
      this.commentState.replies.push(response.data.reply)
    }
  }
}
</script>

<style>
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
  /* background-color: yellow; */
  display: flex;
  align-items: center;
}
.option-text {

}

/* comment reply box */
.comment-reply-box {
  width: 430px;
  float: right;
}

.add-reply {
  margin: 10px 0px 10px -10px;
  /* background-color: red; */
}
.add-reply .commenter-avatar img {
  width: 24px;
  height: 24px;
}
.comment-textarea {
  float: right;
  width: 410px;
  padding: 0px 0px 0px 10px;
  /* background-color: rgb(50, 250, 250); */
  text-align: left;
}
.comment-textarea .textarea {
  background-color: rgb(250, 250, 250);
  border-radius: 20px;
  padding: 2px 10px;
}

</style>
