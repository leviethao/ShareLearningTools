<template>
  <div class="report">
    <div class="row1">
      <!-- Báo cáo từ <router-link :to="''">{{report.reporter.name}}</router-link> về tin của <router-link :to="''">{{poster.name}}</router-link> -->
    </div>
    <div class="row2">
      <!-- Thời gian tạo: <span>{{`${new Date(report.created).toLocaleTimeString()} - ${new Date(report.created).getDate()}/${new Date(report.created).getMonth() + 1}/${new Date(report.created).getFullYear()}`}}</span> -->
    </div>
    <div :class="'row3' + (isCollapse ? ' collapse-text' : '')" ref='contentTextContainer' >
      Nội dung: <span ref='contentText'>afsjlkfjk</span>
      &nbsp; <button class="btn-primary" @click="$emit('showPost')">Xem tin</button>
    </div>
    <!-- <button class="btn-primary" @click="expandText" v-show="isCollapse">Xem đầy đủ</button> -->
    <!-- <button class="btn-primary" @click="collapseText" v-show="!isCollapse">Thu gọn</button> -->
  </div>
</template>

<script>
// import UserService from '../services/UserService'

export default {
  props: [
    'report'
  ],
  data () {
    return {
      isCollapse: true,
      poster: null
    }
  },
  async created () {
    // let posterRes = await UserService.getUserInfo(this.report.post.poster)
    // this.poster = posterRes.data.user
  },
  mounted () {
    alert(this.$refs.contentText)
    // if (this.$refs.contentText.offsetWidth > this.$refs.contentTextContainer.offsetWidth) {
    //   console.log('hihii')
    // }
  },
  methods: {
    expandText () {
      this.isCollapse = false
    },
    collapseText () {
      this.isCollapse = true
    }
  }
}
</script>

<style>
.report {
  line-height: 0.9rem;
  text-align: left;
  background-color: rgba(228, 235, 240, 0.959);
  padding: 5px 10px;
  width: 500px;
}
.report .row1, .report .row2 {
  font-size: 11px;
}
.report .row3 {
  line-height: 1rem;
  padding-top: 5px;
}
.collapse-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
