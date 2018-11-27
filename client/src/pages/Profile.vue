<template>
  <div id="profile">
    <div class="header-bar-component">
      <header-bar />
    </div>
    <div class="global-container">
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
        <tool-category-selector ID="filter"/>
        <post-category-selector ID="filter"/>
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

export default {
  components: {
    HeaderBar,
    Post,
    UserInfo,
    ToolCategorySelector,
    PostCategorySelector
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
.column-1 {
  float: left;
  width: 300px;
}
.column-2 {
  float: left;
  width: 500px;
  margin-left: 0px;
}
.column-3 {
  float: left;
}
</style>
