<template>
  <div>
    <b-popover :target="target"
      triggers="click blur"
      :show.sync="contactPopoverShow"
      placement="bottomleft"
      :container="container">
      
      <template slot="title" >
        <div>
          <span>016838734398</span>
        </div>
      </template>

    </b-popover>
  </div>
</template>

<script>
export default {
  props: [
    'target',
    'container'
  ],
  data () {
    return {
      contactPopoverShow: false
    }
  }
}
</script>

<style>
</style>