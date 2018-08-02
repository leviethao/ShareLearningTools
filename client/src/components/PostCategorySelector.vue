<template>
  <div class="tool-category-selector">
    <b-form-select v-model="selected" @change="onSelectedChanged" :options="options" class="mb-3" :size="size">
    </b-form-select>
  </div>
</template>

<script>
import PostCategoryService from '../services/PostCategoryService'
import BusService from '../services/BusService'

export default {
  props: [
    'size',
    'ID'
  ],
  data () {
    return {
      selected: null,
      options: []
    }
  },
  async mounted () {
    try {
      const response = await PostCategoryService.getPostCategories()
      this.selected = response.data.postCategories ? response.data.postCategories[0]._id : null
      this.options = []
      for (let postCategory of response.data.postCategories) {
        this.options.push({value: postCategory._id, text: postCategory.name})
      }
    } catch (err) {
    }
  },
  methods: {
    onSelectedChanged (value) {
      BusService.$emit(this.ID + 'PostSelected', value)
    }
  }
}
</script>

<style>
.tool-category-selector {
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>
