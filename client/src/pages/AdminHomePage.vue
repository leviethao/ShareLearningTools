<template>
  <div id="admin-home">
    <div class="header-bar-component">
      <header-bar />
    </div>
    <div class="global-container">
      <div class="column-1">
        <catalog />
      </div>
      <div class="column-2">
        <analysis />
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

export default {
  components: {
    HeaderBar,
    Catalog,
    Analysis
  },
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style>
.column-1 {
  float: left;
  min-width: 300px;
  min-height: 100px;
  margin-top: 10px;
}
.column-2 {
  float: left;
  width: 500px;
  margin-left: 0px;
  margin-top: 10px;
}
.column-3 {
  float: left;
  margin-top: 10px;
}
</style>
