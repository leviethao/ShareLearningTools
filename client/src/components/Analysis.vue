<template>
  <div id="analysis">
    <div class="analysis-row">
      <div class="report-item">
        <label>Số lượng người dùng</label>
        <span>{{userCount}}</span>
      </div>
      <div class="report-item">
        <label>Số lượng dụng cụ học tập trên hệ thống</label>
        <span>{{providePostsCount}}</span>
      </div>
      <div class="report-item">
        <label>Số lượng dụng cụ học tập đã cho</label>
        <span>{{providedPostsCount}}</span>
      </div>
      <div class="clear-both"></div>
    </div>
    <div class="analysis-row">
      <div class="report-item">
        <label>Số lượng dụng cụ học tập chưa cho</label>
        <span>{{nonProvidedPostsCount}}</span>
      </div>
      <div class="report-item">
        <label>Số bài đăng tìm dụng cụ học tập trên hệ thống</label>
        <span>{{receivePostsCount}}</span>
      </div>
      <div class="report-item">
        <label>Số bài đăng đang tìm</label>
        <span>{{nonReceivedPostsCount}}</span>
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
      enablePostCount: 0,
      providePostsCount: 0,
      providedPostsCount: 0,
      nonProvidedPostsCount: 0,
      receivePostsCount: 0,
      nonReceivedPostsCount: 0
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

    let providePostsCountRes = await PostService.countProvidePosts()
    this.providePostsCount = providePostsCountRes.data.count

    let providedPostsCountRes = await PostService.countProvidedPosts()
    this.providedPostsCount = providedPostsCountRes.data.count

    let nonProvidedPostsCount = await PostService.countNonProvidedPosts()
    this.nonProvidedPostsCount = nonProvidedPostsCount.data.count

    let receivePostsCountRes = await PostService.countReceivePosts()
    this.receivePostsCount = receivePostsCountRes.data.count

    let nonReceivedPostsCountRes = await PostService.countNonReceivedPosts()
    this.nonReceivedPostsCount = nonReceivedPostsCountRes.data.count
  },
  methods: {
  }
}
</script>

<style>
#analysis {
  width: 700px;
  height: 500px;
  background-color: azure;
  padding: 15px 10px;
}
.report-item {
  width: 200px;
  height: 120px;
  float: left;
  margin-left: 20px;
  align-items: center;
  font-weight: bold;
  padding: 10px 8px;
  background-color: rgba(218, 227, 242, 0.6);
}
.report-item label {
  width: 100%;
  font-size: 15px;
  word-break: keep-all;
}
.report-item span {
  font-size: 22px;
  color: red;
}
.analysis-row {
  margin: 15px 10px;
}
</style>
