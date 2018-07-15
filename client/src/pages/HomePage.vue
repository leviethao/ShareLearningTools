<template>
  <div>
    <header-bar />
    <div class="global-container">
      <div id="home-left-hand-side">
        <catalog/>
      </div>
      <div id="home-center">
        <post postid="p1"/>
        <post postid="p2"/>
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

export default {
  components: {
    HeaderBar,
    Catalog,
    ToolCategorySelector,
    Post
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
#home-left-hand-side {
  float: left;
}
#home-center {
  float: left;
}
#home-right-hand-side {
  float: left;
}
</style>
