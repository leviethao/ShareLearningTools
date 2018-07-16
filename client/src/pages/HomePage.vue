<template>
  <div id="home-page">
    <div class="header-bar-component">
      <header-bar />
    </div>

    <div class="global-container">
      <div id="home-left-hand-side">
        <catalog/>
      </div>
      <div id="home-center">
        <div class="create-post-component">
          <create-post />
        </div>

        <div class="post-component">
          <post postid="p1"/>
        </div>
        <div class="post-component">
          <post postid="p2"/>
        </div>
      </div>
      <div id="home-right-hand-side">
        <tool-category-selector id="tool-category-filter"/>
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
