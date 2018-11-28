<template>
  <div id="home-filter">
    <div class="home-filter-title">Lọc bài đăng</div>
    <div class="home-filter-row">
      <label>Loại dụng cụ</label>
      <div class="tool-category-filter">
        <b-form-select v-model="toolSelected" @input="onFilterChanged" :options="toolOptions" class="mb-3">
        </b-form-select>
      </div>
    </div>
    <div class="home-filter-row">
      <label>Loại bài đăng</label>
      <div class="post-category-filter">
        <b-form-select v-model="postSelected" @input="onFilterChanged" :options="postOptions" class="mb-3">
        </b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
import ToolCategoryService from '../services/ToolCategoryService'
import PostCategoryService from '../services/PostCategoryService'
import BusService from '../services/BusService'

export default {
  data () {
    return {
      toolOptions: [],
      toolSelected: null,

      postOptions: [],
      postSelected: null
    }
  },
  async mounted () {
    try {
      // init tool category selector
      const toolResponse = await ToolCategoryService.getToolCategories()
      this.toolOptions = []
      for (let toolCategory of toolResponse.data.toolCategories) {
        this.toolOptions.push({value: toolCategory._id, text: toolCategory.name})
      }
      this.toolOptions.unshift({value: '', text: 'Tất cả'})
      this.toolSelected = this.toolOptions[0].value

      // init post category selector
      const postResponse = await PostCategoryService.getPostCategories()
      this.postOptions = []
      for (let postCategory of postResponse.data.postCategories) {
        this.postOptions.push({value: postCategory._id, text: postCategory.name})
      }
      this.postOptions.unshift({value: '', text: 'Tất cả'})
      this.postSelected = this.postOptions[0].value
    } catch (err) {
    }
  },
  methods: {
    onFilterChanged () {
      BusService.$emit('HomeFilter', {
        toolCategory: this.toolSelected,
        postCategory: this.postSelected
      })
    }
  }
}
</script>

<style>
  #home-filter {
    position: fixed;
    background-color: rebeccapurple;
  }
  .home-filter-title {
    font-weight: bold;
    color: aliceblue;
  }
  .tool-category-filter {
    float: left;
    width: 90%;
  }
  .post-category-filter {
    float: left;
    width: 90%;
  }
  .home-filter-row {
    margin-left: 20px;
    color:aliceblue;
    text-align: left;
  }
</style>
