<template>
  <div id="profile">
    <div class="header-bar-component">
      <header-bar />
    </div>
    <div class="background-bar">
    </div>
    <div class="status-bar">
      <div class="status-list">
        <div class="status-item">
          <label>Số lần cho</label>
          <span>{{user.provides.length}}</span>
        </div>
        <div class="status-item">
          <label>Số lần nhận</label>
          <span>{{user.receives.length}}</span>
        </div>
      </div>
    </div>
    <div class="global-container body-wrapper">
      <div class="column-1">
        <user-info
          :user="user"
          :editing="editing"
          :update="updateUser"
          @edit="editing = true"
          @cancelEdit="editing = false"/>
      </div>
      <div class="column-2">
        <div v-for="post in posts" :key="post._id">
          <div class="post-component">
            <post :post_data="post"/>
          </div>
        </div>
      </div>
      <div class="column-3">
        <profile-filter />
      </div>
      <div class="clear-both"></div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar'
import UserService from '../services/UserService'
import config from '../config'
import PostService from '../services/PostService'
import Post from '../components/Post'
import UserInfo from '../components/UserInfo'
import ToolCategorySelector from '../components/ToolCategorySelector'
import PostCategorySelector from '../components/PostCategorySelector'
import ProfileFilter from '../components/ProfileFilter'

export default {
  components: {
    HeaderBar,
    Post,
    UserInfo,
    ToolCategorySelector,
    PostCategorySelector,
    ProfileFilter
  },
  data () {
    return {
      user: {},
      selectedGender: 'Nam',
      config: config,
      posts: null,
      editing: false
    }
  },
  async mounted () {
    const userRes = await UserService.getMyUserInfo()
    this.user = userRes.data.user

    let postRes = await PostService.getMyPosts()
    this.posts = postRes.data.posts
  },
  methods: {
    async updateUser (user) {
      let userRes = await UserService.updateUserInfo(user)
      if (userRes.data.user) {
        this.editing = false
        userRes = await UserService.getMyUserInfo()
        if (userRes.data.user) {
          this.user = userRes.data.user
        }
      }
    }
  }
}
</script>

<style>
#profile {
  display: flow-root;
}
div.body-wrapper {
  margin-top: 52px;
}
.background-bar {
  width: 100%;
  height: 150px;
  margin-top: 50px;
  margin-bottom: -170px;
  background-color: rgb(210, 224, 235);
}
.status-bar {
  width: 100%;
  height: 65px;
  margin-top: 170px;
  margin-bottom: -230px;
  background-color: #fff;
}
.status-list {
  margin-left: -300px;
}
.status-item {
  display: inline-block;
  font-weight: bold;
  padding: 3px 8px;
}
.status-item label {
  width: 100%;
  font-size: 14px;
  word-break: keep-all;
  color:rgb(110, 110, 110);
}
.status-item span {
  font-size: 18px;
  color: rgb(63, 62, 62);
}
.column-1 {
  float: left;
  width: 300px;
  margin: 10px 0px 0px -50px;
}
.column-2 {
  float: left;
  width: 500px;
  margin-top: 180px;
}
.column-3 {
  width: 230px;
  background-color: rebeccapurple;
  float: left;
  margin: 180px 0px 0px 10px;
}
.post-component {
  margin-bottom: 12px;
}
</style>
