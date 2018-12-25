<template>
  <div id="home-page">
    <div class="header-bar-component">
      <header-bar v-bind:onSearch="onSearch"/>
    </div>

    <div class="global-container body-wrapper">
      <div class="home-left-hand-side">
        <ul class="left-panel-ads-list">
          <li>
            <ads class="left-panel-ads"
              :adsUrl="'https://unica.vn/hoc-seo-len-top-cung-chuyen-gia'"
              :imgSrc="'https://static.unica.vn/uploads/images/hongvt@unica.vn/hocseolentopcungchuyengia-nguyenhuulam_m.jpg'"/>
          </li>
          <li>
            <ads class="left-panel-ads"
              :adsUrl="'https://unica.vn/hacker-mu-trang-aeh'"
              :imgSrc="'https://static.unica.vn/uploads/images/linhntd@unica.vn/hacker-mu-trang_m.jpg'"/>
          </li>
          <li>
            <ads class="left-panel-ads"
              :adsUrl="'https://unica.vn/lap-trinh-java-trong-4-tuan'"
              :imgSrc="'https://static.unica.vn/uploads/linhntd@unica.vn/lap-trinh-java-trong-4-tuan_m.jpg'"/>
          </li>
          <li>
            <ads class="left-panel-ads"
              :adsUrl="'https://unica.vn/xay-dung-website-hoan-chinh-voi-laravel-php-framework'"
              :imgSrc="'https://static.unica.vn/uploads/images/doanhuyen209@gmail.com/Laravel_PHP_Framework_m.jpg'"/>
          </li>
        </ul>
      </div>
      <div class="home-center">
        <div class="create-post-component">
          <create-post :onCreatePost="onCreatePost"/>
        </div>
        <div v-for="post in posts" :key="post._id">
          <div class="post-component">
            <post :post_data="post" isShorthand="true"/>
          </div>
        </div>
      </div>
      <div class="home-right-hand-side">
        <home-filter />
        <common-info class="common-info" />
      </div>
      <div class="clear-both"></div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CommonService from '../services/CommonService'
import HeaderBar from '../components/HeaderBar'
import ToolCategorySelector from '../components/ToolCategorySelector'
import PostCategorySelector from '../components/PostCategorySelector'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import BusService from '../services/BusService'
import PostService from '../services/PostService'
import SearchService from '../services/SearchService'
import Ads from '../components/Ads'
import HomeFilter from '../components/HomeFilter'
import CommonInfo from '../components/CommonInfo'

export default {
  name: 'HomePage',
  components: {
    HeaderBar,
    ToolCategorySelector,
    PostCategorySelector,
    Post,
    CreatePost,
    Ads,
    HomeFilter,
    CommonInfo
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
      let response = await SearchService.searchPosts(strSearch)
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
div.body-wrapper {
  margin-top: 52px;
}
.home-left-hand-side {
  float: left;
  min-width: 250px;
  min-height: 100px;
  margin-top: 10px;
}
.common-info {
  margin-top: 200px;
  width: 252px;
  min-height: 420px;
}
.home-center {
  float: left;
  margin-top: 10px;
  border: 1px rgba(160, 158, 158, 0.377) solid;
  background-color: rgb(208, 193, 226);
}
.home-right-hand-side {
  width: 230px;
  float: left;
  margin: 10px 0px 0px 10px;
}

.header-bar-component {
}
.post-component, .create-post-component {
  /* margin-bottom: 12px; */
}
.create-post-component {
  margin-bottom: 10px;
}
.left-panel-ads {
  max-width: 250px;
  min-height: 100px;
  background-color: blue;
  margin-bottom: 7px;
}
.left-panel-ads-list {
  position: fixed;
  margin: 0px 0px 0px -100px;
  list-style-type: none;
}
.clear-both {
  clear:both;
}
</style>
