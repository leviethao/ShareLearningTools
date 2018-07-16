<template>
  <div class="create-post">
    <div class="create-post-box">
      <div class="create-post-header">
        <span class="lbl-create-post">Đăng tin</span>
        <span class="create-post-tool-category-label">Loại dụng cụ</span>
        <div class="create-post-tool-category-selector">
          <tool-category-selector size='sm'/>
        </div>
        <span class="create-post-category-label">Loại tin</span>
        <div class="create-post-category-selector">
          <tool-category-selector size='sm'/>
        </div>
        <div class="clear-both"></div>
      </div>

      <div class="create-post-body">
        <div class="create-post-avatar">
          <img src="../assets/images/catalog/item.png" />
        </div>
        <div class="create-post-wrapper">
          <div class="create-post-content">
            <auto-size-textarea placeholderValue="Nội dung bài đăng"/>
          </div>
          <div class="create-post-exchange-condition">
            <auto-size-textarea placeholderValue="Điều kiện trao đổi"/>
          </div>
          <div class="create-post-multimedia">
          </div>
        </div>
        <div class="clear-both"></div>
      </div>

      <div class="create-post-footer">
        <a  href="">Ảnh/Video</a>
        <a href="">Tệp</a>
        <button class="create-post-btn btn btn-primary">Đăng</button>
      </div>
    </div>
  </div>
</template>

<script>
import AutoSizeTextarea from './AutoSizeTextarea'
import ToolCategorySelector from './ToolCategorySelector'

export default {
  components: {
    AutoSizeTextarea,
    ToolCategorySelector
  },
  data () {
    return {
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
  width: 200px;
  padding: 0px 5px;
  float: right;
  margin-left: 160px;
}
.clear-both {
  clear: both;
}
</style>