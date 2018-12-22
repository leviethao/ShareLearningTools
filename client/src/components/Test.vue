<template>
  <div id="common-info">
    <div class="common-info-title">Thông tin chung</div>
    <div class="common-info-row">
      <label>Số lượng người dùng: </label>
      <span>300</span>
    </div>
    <div class="common-info-row">
      <label>Số lượt trao đổi: </label>
      <span>300</span>
    </div>
    <div class="common-info-row">
      <label>Dụng cụ đang cung cấp: </label>
      <span>300</span>
    </div>
    <div class="common-info-row">
      <label>Dụng cụ đang cần tìm: </label>
      <span>300</span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style>
  #common-info {
    position: fixed;
    background-color: rebeccapurple;
    padding: 0px 10px;
  }
  .common-info-title {
    font-weight: bold;
    color: aliceblue;
  }
  .common-info-row {
    color:aliceblue;
    text-align: left;
  }
</style>
