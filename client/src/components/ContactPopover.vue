<template>
  <div>
    <b-popover :target="target"
      triggers="click blur"
      :show.sync="contactPopoverShow"
      placement="bottomleft"
      :container="container">

      <template slot="title" >
        <div>
          <span>{{contact}}</span>
        </div>
      </template>

    </b-popover>
  </div>
</template>

<script>
export default {
  props: [
    'target',
    'container',
    'contact'
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
