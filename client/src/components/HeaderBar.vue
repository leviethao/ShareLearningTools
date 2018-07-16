<template>
  <div id='toolbar'>
    <div class="global-container">
      <div id="search" class="input-group">
        <input type="text" class="form-control" placeholder="Tìm kiếm">
        <button type="button" class="btn btn-primary"><img src="../assets/images/header_bar/searchIcon.png" width="20" height="20" /></button>
      </div><!-- /input-group -->

      <div id="toolbar-items">
        <router-link v-bind:to="{name: 'HomePage'}" class="toolbar-item" v-b-tooltip.hover.bottom title="Trang cá nhân">
          <img class="avatar" :src="serverHost+user.avatar" width="34" height="34" />
          <span>{{user.name}}</span>
        </router-link>

        <router-link v-bind:to="{name: 'HomePage'}" class="toolbar-item">
          <span>Trang chủ</span>
        </router-link>

        <router-link v-bind:to="{name: 'HomePage'}"
          id="notify-icon" class="toolbar-item icon" v-b-tooltip.hover.bottom title="Thông báo"
          v-on:click.native="notifyPopoverShow = !notifyPopoverShow">
          <img src="../assets/images/header_bar/notifyIcon.png" width="24" height="24"/>
        </router-link>

        <router-link v-bind:to="{name: 'HomePage'}"
          id="setting-icon" class="toolbar-item icon" v-b-tooltip.hover.bottom title="Cài đặt"
          v-on:click.native="settingPopoverShow = !settingPopoverShow">
          <img src="../assets/images/header_bar/settingIcon.png" width="24" height="24"/>
        </router-link>
      </div>

      <!-- notify popover -->
      <b-popover target="notify-icon"
        triggers="focus"
        :show.sync="notifyPopoverShow"
        placement="bottomleft"
        container="toolbar"
        @show="onNotifyShow"
        @shown="onNotifyShown"
        @hidden="onNotifyHidden">
        
        <template slot="title" >
          Thông báo
        </template>

        <div class="vuebar-element" v-bar> <!-- el1 -->
          <div id="notify-list"> <!-- el2 -->
            <router-link v-bind:to="{name: 'LoginPage'}" class="notify-item" >
              <div class="notify-content">
                <img class="notify-avatar avatar" :src="serverHost+user.avatar" width="60px" height="60px" />
                <div class="notify-text">
                  leviethao leviethao leviethao leviethao leviethao leviethaolev
                  <br/>
                  <span>Hôm qua lúc 02:20</span>
                </div>
              </div>
            </router-link>
          </div>
          <!-- dragger will be automatically added here -->
        </div>
      </b-popover>

      <!-- setting popover -->
      <b-popover target="setting-icon"
        triggers="focus"
        :show.sync="settingPopoverShow"
        placement="bottomleft"
        container="toolbar">
        
        <template slot="title" >
          Cài đặt
        </template>

        <div id="setting-list">
          <router-link v-bind:to="{name: 'LoginPage'}" class="setting-item" >
            <div class="setting-content">
              <div class="setting-text">
                leviethao leviethao
              </div>
            </div>
          </router-link>
            <router-link v-bind:to="{name: 'LoginPage'}" class="setting-item" >
            <div class="setting-content">
              <div class="setting-text">
                leviethao leviethao
              </div>
            </div>
          </router-link>
          <router-link v-bind:to="{name: 'LoginPage'}" class="setting-item" >
            <div class="setting-content">
              <div class="setting-text">
                leviethao leviethao
              </div>
            </div>
          </router-link>
        </div>
      </b-popover>
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService'
import config from '../config'

export default {
  data () {
    return {
      notifyPopoverShow: false,
      settingPopoverShow: false,
      user: {},
      serverHost: config.serverHost
    }
  },
  async mounted () {
    const userResponse = await UserService.getMyUserInfo()
    this.user = userResponse.data.user
  },
  methods: {
    // on popover close
    onClose () {
      this.notifyPopoverShow = false
      this.settingPopoverShow = false
    },
    onNotifyShow () {

    },
    onNotifyShown () {

    },
    onNotifyHidden () {

    }
  }
}
</script>

<style>
.global-container {
  max-width: 1000px;
  margin: auto;
}
#toolbar {
  width: 100%;
  height: 50px;
  background: #A33BBA;
}

#search {
  width: 40%;
  height: 38px;
  margin-left: 3px;
  margin-top: 6px;
  float: left;
}

#toolbar-items {
  float: right;
  margin-right: 3px;
}

.toolbar-item {
  margin-top: 6px;
  margin-left: 20px;
  padding: 0px 10px;
  height: 38px;
  width: auto;
  float: left;
}

.toolbar-item span {
  display: inline-block;
  text-decoration: none;
  color: #ffffff;
  margin-top: 7px;
}

.toolbar-item:hover {
  background-color:#2a202e3d;
}

.avatar {
  border-radius: 50%;
}

.toolbar-item .avatar {
  margin-bottom: 2px;
}

.icon:hover {
  background-color: #A33BBA;
}

.icon img {
  margin-top: 7px;
}

.btn {
  background-color: rgb(171, 86, 250);
}
.btn:hover {
  background-color: rgb(198, 140, 252);
}

.popover {
  max-width: 100%;
}
.popover-body {
  padding: 0 0;
}
.popover-header {
  font-size: 13px;
  background-color: #f7f7f7;
}

/* popover notify ============ */
#notify-list,
#setting-list {
  display: block;
}
.notify-item,
.setting-item{
  display: block;
  width: 500px;
  height: 70px;
  padding: 5px 10px;
  background-color: rgb(238, 212, 245);
  border-bottom: solid 1px rgb(203, 199, 206);
}
.notify-item:link,
.setting-item:link {
  text-decoration: none;
}
.notify-item:hover,
.setting-item:hover {
  background-color: rgb(224, 190, 231);
}
.notify-item:active,
.setting-item:active {
  background-color: #A33BBA;
}
.notify-content,
.setting-content {
  height: 100%;
  /* background-color: yellow; */
  display: flex;
  align-items: center;
}
.notify-avatar {
  float: left;
}
.notify-text {
  float: left;
  padding-left: 10px;
}
.notify-text span {
  font-size: 12px;
}
.clear-both {
  clear: both;
}

/* scrollbar custom vuebar */
.vuebar-element {
  height: 500px;
  width: 100%;
  max-width: 500px;
  background: #dfe9fe;
}

.vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}
/* end scrollbar custom vuebar */
/* popover notify END============ */

/* popover setting (override from notify popover adtribute) */
.setting-item {
  width: 300px;
  height: 40px;
}
/* popover setting end */

</style>
