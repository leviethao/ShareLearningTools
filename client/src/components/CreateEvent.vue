<template>
  <div class="create-event">
    <div class="create-event-box">
      <div class="create-event-header">
        <span class="lbl-create-event">Đăng tin</span>
        <div class="clear-both"></div>
      </div>

      <div class="create-event-body">
        <div class="create-event-avatar">
          <img :src="config.serverHost + user.avatar" />
        </div>
        <div class="create-event-wrapper">
          <div class="create-event-content">
            <auto-size-textarea
              ID="postContent"
              :content="contentText"
              placeholderValue="Nội dung thông báo sự kiện"
              :onPostContent="onPostContent"/>
          </div>
          <div class="create-event-multimedia">
            <upload />
          </div>
        </div>
        <div class="clear-both"></div>
      </div>

      <div class="create-event-footer">
        <a  href="#" v-on:click.prevent="addImageVideo">Ảnh/Video/Tệp</a>
        <button @click="onEventSubmit" class="create-event-btn btn btn-primary">{{eventId ? 'Lưu chỉnh sửa': 'Đăng tin'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import AutoSizeTextarea from './AutoSizeTextarea'
import BusService from '../services/BusService'
import Upload from './Upload'
import config from '../config'
import UserService from '../services/UserService'
import EventService from '../service/EventService'

export default {
  components: {
    AutoSizeTextarea,
    Upload
  },
  props: [
    'onCreatePost',
    'contentText',
    'conditionText',
    'onUpdateEvent',
    'eventId'
  ],
  data () {
    return {
      config: config,
      user: null,

      content: null
    }
  },
  async created () {
    let userRes = await UserService.getMyUserInfo()
    this.user = userRes.data.user
  },
  async mounted () {
    BusService.$on('uploadSuccess', async (fileNames) => {
      let data = {
        content: this.content,
        fileNames: fileNames
      }
      if (this.eventId) {
        // data._id = this.postId
        // await this.onUpdatePost(data)
        // BusService.$emit('cleanCreatePost')
      } else {
        let response = await PostService.createPost(data)
        if (response.data.post) {
          this.onCreatePost(response.data.post)
          BusService.$emit('cleanCreatePost')
        }
      }
    })
  },
  methods: {
    onEventSubmit () {
      BusService.$emit('upload')
    },
    onPostContent (content) {
      this.content = content
    },
    addImageVideo () {
      BusService.$emit('addImageVideo')
    }
  }
}
</script>

<style>
.create-event {
  width: 500px;
  background-color: #fff;
  margin: auto;
  border: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-event-box {
  /* background-color: rgb(147, 147, 206); */
}
.create-event-header {
  height: 35px;
  border-bottom: solid rgba(196, 190, 190, 0.377) 1px;
  /* background-color: rgb(71, 71, 194); */
  display: flex;
  align-items: center;
}
.lbl-create-event {
  float: left;
  padding: 0px 5px 0px 10px;
}

.create-event-body {
  margin: 10px 10px;
}
.create-event-avatar {
  width: 60px;
  height: 60px;
  float: left;
}
.create-event-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.create-event-wrapper {
  float: left;
  margin: 18px 0px 0px 10px;
}
.create-event-content {
  width: 400px;
}
.create-event-content .textarea {
  font-size: 20px;
}
.create-event-content {
  padding-bottom: 5px;
  border-bottom: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-event-footer {
  height: 35px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  padding: 5px 0px;
  border-top: solid rgba(196, 190, 190, 0.377) 1px;
  /* background-color: rgb(26, 26, 190); */
}
.create-event-footer a {
  float: left;
  padding: 0px 5px;
  border-left: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-event-footer a:first-of-type {
  border: none;
  padding-left: 10px;
}
.create-event-btn {
  height: 30px;
  width: 190px;
  padding: 0px 5px;
  float: right;
  margin-left: 160px;
}
.clear-both {
  clear: both;
}
</style>
