<template>
  <div id="analysis">
    <div class="analysis-row">
      <div class="report-item" style="background-color: aqua;">
        <label>Số lượng người dùng</label>
        <span>{{userCount}}</span>
      </div>
      <div class="report-item" style="background-color: aqua;">
        <label>Số lượt trao đổi</label>
        <span>{{exchangeCount}}</span>
      </div>
      <div class="clear-both"></div>
    </div>
    <div class="analysis-row">
      <div class="report-item" style="background-color: aqua;">
        <label>Số bài đăng đang hoạt động</label>
        <span>{{enablePostsCount}}</span>
      </div>
      <div class="report-item" style="background-color: aqua;">
        <label>Số bài đăng ngừng hoạt động</label>
        <span>{{disablePostsCount}}</span>
      </div>
      <div class="clear-both"></div>
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
      disablePostsCount: 0,
      enablePostsCount: 0
    }
  },
  async mounted () {
    let userCountRes = await UserService.count()
    this.userCount = userCountRes.data.count

    let exchangeCountRes = await ExchangeService.count()
    this.exchangeCount = exchangeCountRes.data.count

    let disablePostsCountRes = await PostService.countDisablePosts()
    this.disablePostsCount = disablePostsCountRes.data.count

    let enablePostsCountRes = await PostService.countEnablePosts()
    this.enablePostsCount = enablePostsCountRes.data.count
  },
  methods: {
  }
}
</script>

<style>
#analysis {
  width: 500px;
  background-color: azure;
  padding: 15px 10px;
}
.report-item {
  width: 200px;
  height: 100px;
  float: left;
  margin-left: 20px;
  align-items: center;
  font-weight: bold;
  padding: 10px 8px;
}
.report-item label {
  width: 100%;
}
.report-item span {
  font-size: 25px;
  color: red;
}
.analysis-row {
  margin: 15px 10px;
}
</style>
