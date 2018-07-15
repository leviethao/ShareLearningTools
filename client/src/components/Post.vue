<template>
  <div class="post">

    <div class="post-container">

      <div class="post-header">
        <img src="../assets/images/catalog/item.png"/>
        <div class="post-info">
          <span class="poster">poster poster posterposter</span>
          <br>
          <span class="post-time">time time time time</span>
        </div>
      </div>

      <div class="post-body">
        <span class="post-content">
          content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content 
        </span>
        <br>

        <span class="post-exchange-condition">
          Điều kiện trao đổi: &nbsp;
          exchangeexchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange exchange  
        </span>
      </div>

      <div class="post-footer">
        <div class="post-footer-btn-left post-footer-btn" @click="onBtnCmtClicked"><span>Bình luận</span></div>
        <div class="post-footer-btn-right post-footer-btn" @click="onBtnContactClicked"><span>Liên hệ</span></div>
      </div>

    </div>

    <!-- comment box -->
    <div class="comment-box">
      <div class="comment-list">
        <div class="comment">
          <div class="commenter-avatar">
            <img src="../assets/images/catalog/item.png" />
          </div>
          <div class="comment-container">
            <span class="commenter">leviethao</span>
            &nbsp;
            <span class="comment-content">cho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang cao</span>
          </div>
          <div class="clear-both"></div>
          <div class="comment-footer">
            <a href=""><span class="cmt-reply-link">Trả lời</span></a>
            <span class="comment-time">2 giờ trước</span>
          </div>
          <div class="clear-both"></div>

          <!-- comment replay box -->
          <div class="comment-replay-box">
            <div class="comment-list">
              <div class="comment">
                <div class="commenter-avatar">
                  <img src="../assets/images/catalog/item.png" />
                </div>
                <div class="comment-container">
                  <span class="commenter">leviethao</span>
                  &nbsp;
                  <span class="comment-content">cho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang cao</span>
                </div>
                <div class="clear-both"></div>
                <div class="comment-footer">
                  <span class="comment-time">2 giờ trước</span>
                </div>
                <div class="clear-both"></div>
              </div>
            </div>

            <!-- add replay -->
            <div class="add-replay">
              <div class="commenter-avatar">
                <img src="../assets/images/catalog/item.png" />
              </div>
              <div class="comment-textarea">
                <auto-size-textarea /> 
              </div>
              <div class="clear-both"></div>
            </div>

          </div>
          <div class="clear-both"></div>

        </div>

        <div class="comment">
          <div class="commenter-avatar">
            <img src="../assets/images/catalog/item.png" />
          </div>
          <div class="comment-container">
            <span class="commenter">leviethao</span>
            &nbsp;
            <span class="comment-content">cho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang cao</span>
          </div>
          <div class="clear-both"></div>
          <div class="comment-footer">
            <a href=""><span class="cmt-reply-link">Trả lời</span></a>
            <span class="comment-time">2 giờ trước</span>
          </div>
          <div class="clear-both"></div>

          <!-- comment replay box -->
          <div class="comment-replay-box">
            <div class="comment-list">
              <div class="comment">
                <div class="commenter-avatar">
                  <img src="../assets/images/catalog/item.png" />
                </div>
                <div class="comment-container">
                  <span class="commenter">leviethao</span>
                  &nbsp;
                  <span class="comment-content">cho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang caocho sach lap trinh huong doi tuong nang cao</span>
                </div>
                <div class="clear-both"></div>
                <div class="comment-footer">
                  <span class="comment-time">2 giờ trước</span>
                </div>
                <div class="clear-both"></div>
              </div>
            </div>

            <!-- add replay -->
            <div class="add-replay">
              <div class="commenter-avatar">
                <img src="../assets/images/catalog/item.png" />
              </div>
              <div class="comment-textarea">
                <auto-size-textarea /> 
              </div>
              <div class="clear-both"></div>
            </div>

          </div>
          <div class="clear-both"></div>

        </div>
      </div>

      <div class="add-comment">
        <div class="commenter-avatar">
          <img src="../assets/images/catalog/item.png" />
        </div>
        <div class="comment-textarea">
          <auto-size-textarea /> 
        </div>
        <div class="clear-both"></div>
      </div>

    </div>
  </div>
</template>

<script>
import AutoSizeTextarea from './AutoSizeTextarea'

export default {
  components: {
    AutoSizeTextarea
  },
  data () {
    return {

    }
  },
  methods: {
    onBtnCmtClicked () {
    },
    onBtnContactClicked () {
    }
  }
}
</script>

<style>
.post {
  width: 500px;
  background-color: rgb(241, 236, 243);
  margin: auto;
  border: 1px solid rgb(218, 215, 215);
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
.post-header img {
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
.post-footer {
  height: 40px;
  /* background-color: red; */
  border-top: 1px solid rgb(218, 215, 215);
  display: flex;
  align-items: center;
}
.post-footer-btn {
  height: 80%;
  float: left;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  /* disable select text */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
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
.post-footer-btn span {
  width: 100%;
}

/* commnet box */
.comment-box {
  border-top: 1px solid rgb(218, 215, 215);
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

/* comment replay box */
.comment-replay-box {
  width: 430px;
  float: right;
}
.comment-replay-box .comment {
  margin: 10px 0px 0px 0px;
}
.comment-replay-box .comment img {
  width: 24px;
  height: 24px;
}
.comment-replay-box .commenter-avatar {
  width: 24px;
}
.comment-replay-box .comment-container {
  width: 400px; 
}
.comment-replay-box .comment-footer {
  width: 400px;
}
.comment-replay-box .comment-time {
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

.add-replay {
  margin: 10px 0px 10px -10px;
  /* background-color: red; */
}
.add-replay .commenter-avatar img {
  width: 24px;
  height: 24px;
}
.add-replay .comment-textarea {
  width: 410px;
  padding: 0px 0px 0px 10px;
}
.add-replay .comment-textarea textarea {
  padding: 2px 10px;
}
</style>