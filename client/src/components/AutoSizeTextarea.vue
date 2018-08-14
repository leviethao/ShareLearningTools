<template>
  <textarea v-model="text" @input="onInput" @keyup="onComment" class="textarea" ref="textarea" rows='1' :placeholder='placeholderValue'></textarea>
</template>

<script>
import BusService from '../services/BusService'

export default {
  props: [
    'placeholderValue',
    'ID',
    'commentId'
  ],
  data () {
    return {
      text: ''
    }
  },
  mounted () {
    this.$refs.textarea.addEventListener('keydown', this.autosize)
    let self = this
    BusService.$on('cleanCreatePost', function () {
      if (self.ID === 'postContent' || self.ID === 'postCondition') {
        self.text = ''
      }
    })
  },
  methods: {
    autosize () {
      let self = this
      setTimeout(function () {
        self.$refs.textarea.style.cssText = 'color: red;'
        self.$refs.textarea.style.cssText = 'height:auto; padding:0'
        // for box-sizing other than "content-box" use:
        self.$refs.textarea.style.cssText = '-moz-box-sizing:content-box'
        self.$refs.textarea.style.cssText = 'height:' + self.$refs.textarea.scrollHeight + 'px'
      }, 0)
    },
    onInput () {
      if (this.ID === 'postContent' || this.ID === 'postCondition') {
        BusService.$emit(this.ID, this.text)
      }
    },
    onComment (e) {
      if (this.ID.indexOf('comment') >= 0) {
        let code = (e.keyCode ? e.keyCode : e.which)
        if (code === 13) { // enter keycode
          BusService.$emit(this.ID, this.text)
          this.text = ''
        }
        return
      }

      if (this.ID.indexOf('reply') >= 0) {
        let code = (e.keyCode ? e.keyCode : e.which)
        if (code === 13) { // enter keycode
          BusService.$emit(this.ID, this.text, this.commentId)
          this.text = ''
        }
        return
      }
    }
  }
}
</script>

<style>
.textarea {
  overflow: hidden;
  /* demo only: */
  padding: 0px 0px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  margin: auto;
  display: block;
  border: none;
  resize: none;
  outline: none;
}
</style>