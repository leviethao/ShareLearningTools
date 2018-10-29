<template>
  <div id="home-page">
    <div class="header-bar-component">
      <header-bar v-bind:onSearch="onSearch"/>
    </div>

    <div class="global-container">
      <div id="home-left-hand-side">
        <catalog/>
      </div>
      <div id="home-center">
        <div class="create-post-component">
          <create-post :onCreatePost="onCreatePost"/>
        </div>
        <div v-for="post in posts" :key="post._id">
          <div class="post-component">
            <post :post_data="post"/>
          </div>
        </div>
      </div>
      <div id="home-right-hand-side">
        <tool-category-selector ID="filter"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CommonService from '../services/CommonService'
import HeaderBar from '../components/HeaderBar'
import Catalog from '../components/Catalog'
import ToolCategorySelector from '../components/ToolCategorySelector'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import BusService from '../services/BusService'
import PostService from '../services/PostService'
import SearchService from '../services/SearchService'

export default {
  name: 'HomePage',
  components: {
    HeaderBar,
    Catalog,
    ToolCategorySelector,
    Post,
    CreatePost
  },
  data () {
    return {
      posts: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async created () {
    try {
      if (!this.isUserLoggedIn) {
        this.$router.push({name: 'LoginPage'})
        return
      }
      const response = await CommonService.getHomePage()
      alert(response.data.username)
    } catch (err) {
      alert(err.response.data.error)
    }
  },
  async mounted () {
    BusService.$on('filterToolSelected', (value) => {

    })
    let postsRes = await PostService.getPosts()
    this.posts = postsRes.data.posts
  },
  methods: {
    onCreatePost (post) {
      this.posts.push(post)
    },

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
#home-left-hand-side {
  float: left;
}
#home-center {
  float: left;
}
#home-right-hand-side {
  float: left;
}

.header-bar-component {
}
.post-component, .create-post-component {
  margin-bottom: 12px;
}
</style>
