<template>
  <div id="admin-home">
    <div class="header-bar-component">
      <header-bar />
    </div>
    <div class="global-container body-wrapper">
      <div class="column-1">
        <catalog @selectedIndexChange="onSelectedIndexChange"/>
      </div>
      <div class="column-2">
        <analysis v-show="selectedIndex === 0" />
        <browse-post v-show="selectedIndex === 1" />
        <handle-report v-show="selectedIndex === 3" />
      </div>
      <div class="column-3">
      </div>
      <div class="clear-both"></div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar'
import Catalog from '../components/Catalog'
import Analysis from '../components/Analysis'
import BrowsePost from '../components/BrowsePost'
import HandleReport from '../components/HandleReport'

export default {
  components: {
    HeaderBar,
    Catalog,
    Analysis,
    BrowsePost,
    HandleReport
  },
  data () {
    return {
      selectedIndex: 0
    }
  },
  async mounted () {
  },
  computed: {
  },
  methods: {
    onSelectedIndexChange (index) {
      this.selectedIndex = index
    }
  }
}
</script>

<style>
#admin-home {
  display: flow-root;
}
.column-1 {
  float: left;
  min-width: 300px;
  min-height: 100px;
  margin-top: 10px;
}
.column-2 {
  float: left;
  width: 700px;
  margin-left: 0px;
  margin-top: 10px;
}
.column-3 {
  float: left;
  margin-top: 10px;
}
div.body-wrapper {
  margin-top: 52px;
}
</style>
