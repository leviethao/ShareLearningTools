<template>
  <div id="report-item">
    <report
      :report="report"
      v-show="!isShowPost"
      @showPost="isShowPost = true"
    />
    <post
      :post_data="report.post"
      v-show="isShowPost"
      isReport="true"
      @hide="isShowPost = false"
    />
  </div>
</template>

<script>
import Post from './Post'
import Report from './Report'

export default {
  components: {
    Post,
    Report
  },
  props: [
    'report'
  ],
  data () {
    return {
      isShowPost: false
    }
  },
  async created () {
  },
  methods: {
  }
}
</script>

<style>

</style>
