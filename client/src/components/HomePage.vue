<template>
  <div>
    <h1>This is home page</h1>
    <p v-if="!isUserLoggedIn">don't sigged in</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CommonService from '../services/CommonService'

export default {
  components: {

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
        this.$router.push({name: 'Login'})
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