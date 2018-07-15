<template>
  <div class="tool-category-selector">
    <b-form-select v-model="selected" :options="options" class="mb-3">
    </b-form-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'Tất cả' },
        { value: 'a', text: 'Sách' },
        { value: 'b', text: 'Giáo trình' },
        { value: 'c', text: 'Tài liệu photo' },
        { value: 'd', text: 'Khác' }
      ]
    }
  }
}
</script>

<style>
.tool-category-selector {
  margin: auto;
}
</style>