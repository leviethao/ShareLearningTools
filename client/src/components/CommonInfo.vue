<template>
  <div id="common-info">
    <div class="common-info-title">Thông tin chung</div>
    <div class="common-info-row">
      <label>Số lượng người dùng: </label>
      <span>{{userCount}}</span>
    </div>
    <div class="common-info-row">
      <label>Số lượt trao đổi: </label>
      <span>{{exchangeCount}}</span>
    </div>
    <div class="common-info-row">
      <label>Dụng cụ đang cung cấp: </label>
      <span>{{nonProvidedPostsCount}}</span>
    </div>
    <div class="common-info-row">
      <label>Dụng cụ đang cần tìm: </label>
      <span>{{nonReceivedPostsCount}}</span>
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService'
import ExchangeService from '../services/ExchangeService'
import PostService from '../services/PostService'

export default {
  data () {
    return {
      userCount: 0,
      exchangeCount: 0,
      nonProvidedPostsCount: 0,
      nonReceivedPostsCount: 0
    }
  },
  async mounted () {
    let userCountRes = await UserService.count()
    this.userCount = userCountRes.data.count

    let exchangeCountRes = await ExchangeService.count()
    this.exchangeCount = exchangeCountRes.data.count

    let nonProvidedPostsCount = await PostService.countNonProvidedPosts()
    this.nonProvidedPostsCount = nonProvidedPostsCount.data.count

    let nonReceivedPostsCountRes = await PostService.countNonReceivedPosts()
    this.nonReceivedPostsCount = nonReceivedPostsCountRes.data.count
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
