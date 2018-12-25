<template>
  <textarea @input="onInput" @keyup="onKeyDown" class="textarea" ref="textarea" :value="content" rows='1' :placeholder='placeholderValue'></textarea>
</template>

<script>
import BusService from '../services/BusService'

export default {
  props: [
    'placeholderValue',
    'ID',
    'commentId',
    'onComment',
    'onReply',
    'onPostContent',
    'onPostCondition',
    'content'
  ],
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.$refs.textarea.addEventListener('keydown', this.autosize)
    let self = this
    BusService.$on('cleanCreatePost', function () {
      if (self.ID === 'postContent' || self.ID === 'postCondition') {
        self.$refs.textarea.value = ''
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
      // if (this.ID === 'postContent' || this.ID === 'postCondition') {
      //   BusService.$emit(this.ID, this.text)
      // }
      if (this.ID === 'postContent') {
        this.onPostContent(this.$refs.textarea.value)
      }
      if (this.ID === 'postCondition') {
        this.onPostCondition(this.$refs.textarea.value)
      }
    },
    onKeyDown (e) {
      if (this.ID.indexOf('comment') >= 0) {
        let code = (e.keyCode ? e.keyCode : e.which)
        if (code === 13) { // enter keycode
          // BusService.$emit(this.ID, this.text)
          this.onComment(this.$refs.textarea.value.trim())
          this.$refs.textarea.value = ''
        }
        return
      }

      if (this.ID.indexOf('reply') >= 0) {
        let code = (e.keyCode ? e.keyCode : e.which)
        if (code === 13) { // enter keycode
          // BusService.$emit(this.ID, this.text, this.commentId)
          this.onReply(this.$refs.textarea.value.trim(), this.commentId)
          this.$refs.textarea.value = ''
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
