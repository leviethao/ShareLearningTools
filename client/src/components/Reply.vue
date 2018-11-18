<!-- app -->
<template>
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
      <span class="comment-time">{{`${new Date(reply.created).toLocaleTimeString()} - ${new Date(reply.created).getDate()}/${new Date(reply.created).getMonth() + 1}/${new Date(reply.created).getFullYear()}`}}</span>
    </div>
    <div class="clear-both"></div>
  </div>
</template>

<script>
export default {
  props: [
    'reply'
  ],
  data () {
    return {
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
