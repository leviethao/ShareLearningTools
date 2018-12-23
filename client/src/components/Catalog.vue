<template>
  <div id="catalog-container">
    <router-link v-bind:to="''" class="catalog-item" @click.native="onSelectedIndex(0)" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/TongQuan.png" width="24px" height="24px" />
        <span class="catalog-item-text">Tổng quan</span>
      </div>
    </router-link>
    <router-link v-bind:to="''" class="catalog-item" @click.native="onSelectedIndex(1)" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/KiemDuyet.png" width="24px" height="24px" />
        <span class="catalog-item-text">Kiểm duyệt bài đăng</span>
      </div>
    </router-link>
    <router-link v-bind:to="''" class="catalog-item" @click.native="onSelectedIndex(2)" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/QuangCao.png" width="24px" height="24px" />
        <span class="catalog-item-text">Quản lý quảng cáo</span>
      </div>
    </router-link>
    <!-- <router-link v-bind:to="''" class="catalog-item" @click.native="onSelectedIndex(3)" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/ThongBaoSuKien.png" width="24px" height="24px" />
        <span class="catalog-item-text">Thông báo sự kiện</span>
      </div>
    </router-link> -->
    <router-link v-bind:to="''" class="catalog-item" @click.native="onSelectedIndex(3)" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/QuangCao.png" width="24px" height="24px" />
        <span class="catalog-item-text">Xử lý báo cáo tin</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: [
    'onSelectedIndex'
  ],
  data () {
    return {
    }
  }
}
</script>

<style>
#catalog-container {
  display: block;
  width: 250px;
  min-height: 500px;
  background-color: rgb(140, 137, 145);
  margin: auto;
}
.catalog-item {
  height: 30px;
  display: flex;
  align-items: center;
  background-color: rgb(140, 137, 145);
  color: #000;
  text-decoration: none;
  margin-bottom: 1px;
  border-radius: 5px;
}
.catalog-item:hover {
  background-color: rgb(240, 237, 245);
  transition-duration: 300ms;
  color: #000;
}
.catalog-item:active {
  background-color: rgb(111, 97, 138);
  transition-duration: 300ms;
  color: #000;
}
.catalog-item-content {
}
.catalog-item-icon {
  display: block;
  float: left;
  margin-left: 5px;
}
.catalog-item-text {
  display: block;
  float: left;
  font-weight: bold;
  margin-left: 5px;
}
</style>
