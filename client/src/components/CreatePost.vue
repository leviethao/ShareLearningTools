<template>
  <div class="create-post">
    <div class="create-post-box">
      <div class="create-post-header">
        <span class="lbl-create-post">Đăng tin</span>
        <span class="create-post-tool-category-label">Loại dụng cụ</span>
        <div class="create-post-tool-category-selector">
          <tool-category-selector size='sm' ID="createPost"/>
        </div>
        <span class="create-post-category-label">Loại tin</span>
        <div class="create-post-category-selector">
          <post-category-selector size='sm' ID="createPost"/>
        </div>
        <div class="clear-both"></div>
      </div>

      <div class="create-post-body">
        <div class="create-post-avatar">
          <img :src="config.serverHost + user.avatar" />
        </div>
        <div class="create-post-wrapper">
          <div class="create-post-content">
            <auto-size-textarea
              ID="postContent"
              :content="contentText"
              placeholderValue="Tên dụng cụ học tập"
              :onPostContent="onPostContent"/>
          </div>
          <div class="create-post-exchange-condition">
            <auto-size-textarea
              ID="postCondition"
              :content="conditionText"
              v-if="isShowCondition"
              placeholderValue="Điều kiện trao đổi"
              :onPostCondition="onPostCondition"/>
          </div>
          <div class="create-post-multimedia">
            <upload />
          </div>
        </div>
        <div class="clear-both"></div>
      </div>

      <div class="create-post-footer">
        <a  href="#" v-on:click.prevent="addImageVideo">Ảnh/Video/Tệp</a>
        <button @click="onPostSubmit" class="create-post-btn btn btn-primary">{{postId ? 'Lưu chỉnh sửa': 'Đăng tin'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import AutoSizeTextarea from './AutoSizeTextarea'
import ToolCategorySelector from './ToolCategorySelector'
import PostCategorySelector from './PostCategorySelector'
import BusService from '../services/BusService'
import PostCategoryService from '../services/PostCategoryService'
import PostService from '../services/PostService'
import Upload from './Upload'
import config from '../config'
import UserService from '../services/UserService'

export default {
  components: {
    AutoSizeTextarea,
    ToolCategorySelector,
    PostCategorySelector,
    Upload
  },
  props: [
    'onCreatePost',
    'contentText',
    'conditionText',
    'onUpdatePost',
    'postId'
  ],
  data () {
    return {
      config: config,
      user: null,
      isShowCondition: true,

      postCategory: null,
      toolCategory: null,
      content: null,
      exchangeCondition: null
    }
  },
  async created () {
    let userRes = await UserService.getMyUserInfo()
    this.user = userRes.data.user
  },
  async mounted () {
    BusService.$on('createPostToolSelected', (value) => {
      this.toolCategory = value
    })
    BusService.$on('createPostPostSelected', async (value) => {
      this.postCategory = value
      const response = await PostCategoryService.getPostCategories()
      for (let postCategory of response.data.postCategories) {
        if (postCategory._id === this.postCategory && postCategory.name === 'Cung Cấp') {
          this.isShowCondition = true
          break
        }
        this.isShowCondition = false
      }
    })
    BusService.$on('uploadSuccess', async (fileNames) => {
      let data = {
        postCategory: this.postCategory,
        toolCategory: this.toolCategory,
        content: this.content,
        exchangeCondition: this.exchangeCondition,
        fileNames: fileNames
      }
      if (this.postId) {
        data._id = this.postId
        await this.onUpdatePost(data)
        BusService.$emit('cleanCreatePost')
      } else {
        let response = await PostService.createPost(data)
        if (response.data.post) {
          this.onCreatePost(response.data.post)
          BusService.$emit('cleanCreatePost')
        }
      }
    })

    // BusService.$on('postContent', (content) => {
    //   this.content = content
    // })
    // BusService.$on('postCondition', (condition) => {
    //   this.exchangeCondition = condition
    // })
  },
  methods: {
    onPostSubmit () {
      BusService.$emit('upload')
    },
    onPostContent (content) {
      this.content = content
    },
    onPostCondition (condition) {
      this.exchangeCondition = condition
    },
    addImageVideo () {
      BusService.$emit('addImageVideo')
    }
  }
}
</script>

<style>
.create-post {
  width: 500px;
  background-color: #fff;
  margin: auto;
  border: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-post-box {
  /* background-color: rgb(147, 147, 206); */
}
.create-post-header {
  height: 35px;
  border-bottom: solid rgba(196, 190, 190, 0.377) 1px;
  /* background-color: rgb(71, 71, 194); */
  display: flex;
  align-items: center;
}
.lbl-create-post {
  float: left;
  padding: 0px 5px 0px 10px;
}
.create-post-tool-category-label {
  float: left;
  padding-left: 5px;
  border-left: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-post-tool-category-selector {
  float: left;
  width: 158px;
  margin-top: 15px;
  padding: 0px 5px;
}
.create-post-category-label {
  float: left;
  padding-left: 5px;
  border-left: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-post-category-selector {
  float: left;
  width: 100px;
  margin-top: 15px;
  padding-left: 5px;
}

.create-post-body {
  margin: 10px 10px;
}
.create-post-avatar {
  width: 60px;
  height: 60px;
  float: left;
}
.create-post-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.create-post-wrapper {
  float: left;
  margin: 18px 0px 0px 10px;
}
.create-post-content, .create-post-exchange-condition {
  width: 400px;
}
.create-post-content .textarea, .create-post-exchange-condition .textarea {
  font-size: 20px;
}
.create-post-content {
  padding-bottom: 5px;
  border-bottom: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-post-exchange-condition {
  padding-top: 5px;
}

.create-post-footer {
  height: 35px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  padding: 5px 0px;
  border-top: solid rgba(196, 190, 190, 0.377) 1px;
  /* background-color: rgb(26, 26, 190); */
}
.create-post-footer a {
  float: left;
  padding: 0px 5px;
  border-left: solid rgba(196, 190, 190, 0.377) 1px;
}
.create-post-footer a:first-of-type {
  border: none;
  padding-left: 10px;
}
.create-post-btn {
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
