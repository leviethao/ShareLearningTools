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
        <post-category-selector ID="filter" />
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
import PostCategorySelector from '../components/PostCategorySelector'
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
    PostCategorySelector,
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
      await CommonService.getHomePage()
    } catch (err) {
      alert(err.response.data.error)
    }
  },
  async mounted () {
    let postsRes = await PostService.getEnablePosts()
    this.posts = postsRes.data.posts

    BusService.$on('updatedPost', this.handleUpdatedPost)
  },
  methods: {
    onCreatePost (post) {
      this.posts.unshift(post)
    },

    async onSearch (strSearch) {
      let response = await SearchService.searchPost(strSearch)
      this.posts = response.data.posts
    },
    handleUpdatedPost (post) {
      let found = this.posts.find((p) => {
        return p._id === post._id
      })

      if (!found) return

      let index = this.posts.indexOf(found)
      let _posts = [...this.posts]
      _posts[index] = post
      this.posts = _posts
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
