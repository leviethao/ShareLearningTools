<template>
  <div :id="postId" class="post">

    <div class="post-container">

      <div class="post-header">
        <img src="../assets/images/catalog/item.png"/>
        <div class="post-info">
          <span class="poster">{{poster.name}}</span>
          <br>
          <span class="post-time">{{postData.created}}</span>
        </div>
      </div>

      <div class="post-body">
        <span class="post-content">
          {{postData.content}}
        </span>
        <br>

        <span v-if="postData.postCategory.name === 'Cung Cấp'" class="post-exchange-condition">
          Điều kiện trao đổi: &nbsp;
          {{postData.exchangeCondition}}
        </span>
      </div>

      <div class="post-footer">
        <button class="post-footer-btn-left post-footer-btn" @click="onBtnCmtClicked"><span>Bình luận</span></button>
        <button :id="`contact-btn-${postId}`" class="post-footer-btn-right post-footer-btn"><span>Liên hệ</span></button>
      </div>

      <!-- contact popover -->
      <contact-popover :target="`contact-btn-${postId}`" :container="postId" />
      
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
                <auto-size-textarea placeholderValue="Trả lời bình luận"/> 
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
          <auto-size-textarea placeholderValue="Viết bình luận"/> 
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

export default {
  components: {
    AutoSizeTextarea,
    ContactPopover
  },
  props: [
    'postData'
  ],
  data () {
    return {
      contactPopoverShow: false,
      poster: {}
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
    this.poster = await this.getPoster()
  },
  methods: {
    onBtnCmtClicked () {
    },
    async getPoster () {
      let userRes = await UserService.getUserInfo(this.postData.poster)
      return userRes.data.user
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