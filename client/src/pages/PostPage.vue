<template>
  <div id="home-page">
    <div class="header-bar-component">
      <header-bar v-bind:onSearch="onSearch"/>
    </div>

    <div class="global-container body-wrapper">
      <div id="home-left-hand-side">
      </div>
      <div id="home-center">
        <div class="post-component">
          <post :post_data="post"
          v-if="post"/>
        </div>
      </div>
      <div id="home-right-hand-side">
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// import CommonService from '../services/CommonService'
import HeaderBar from '../components/HeaderBar'
import Catalog from '../components/Catalog'
import ToolCategorySelector from '../components/ToolCategorySelector'
import Post from '../components/Post'
// import CreatePost from '../components/CreatePost'
// import BusService from '../services/BusService'
import PostService from '../services/PostService'
import SearchService from '../services/SearchService'

export default {
  name: 'HomePage',
  components: {
    HeaderBar,
    Catalog,
    ToolCategorySelector,
    Post
    // CreatePost
  },
  data () {
    return {
      post: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  watch: {
    $route (to, from) {
      location.reload()
    }
  },
  created () {
    try {
      if (!this.isUserLoggedIn) {
        this.$router.push({name: 'LoginPage'})
        return
      }
    } catch (err) {
    }
  },
  async mounted () {
    let postRes = await PostService.getPostById(this.$route.params.id)
    this.post = postRes.data.post
  },
  methods: {
    async onSearch (strSearch) {
      let response = await SearchService.searchPost(strSearch)
      this.posts = response.data.posts
    }
  }
}
</script>

<style>
#home-page {
  display: flow-root;
}
.global-container {
}
div.body-wrapper {
  margin-top: 52px;
}
#home-left-hand-side {
  float: left;
  width: 250px;
  min-height: 500px;
  margin-top: 10px;
}
#home-center {
  float: left;
  margin-top: 10px;
}
#home-right-hand-side {
  float: left;
  margin-top: 10px;
}
.header-bar-component {
}
.post-component, .create-post-component {
  margin-bottom: 12px;
}
</style>
