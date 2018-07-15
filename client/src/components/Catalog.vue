<template>
  <div id="catalog-container">
    <router-link v-bind:to="{name: 'Test'}" class="catalog-item" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/item.png" width="24px" height="24px" />
        <span class="catalog-item-text">Quản lý bài đăng</span>
      </div>
    </router-link>
    <router-link v-bind:to="{name: 'HomePage'}" class="catalog-item" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/item.png" width="24px" height="24px" />
        <span class="catalog-item-text">Quản lý tìm kiếm</span>
      </div>
    </router-link>
    <router-link v-bind:to="{name: 'HomePage'}" class="catalog-item" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/item.png" width="24px" height="24px" />
        <span class="catalog-item-text">Quản lý người dùng</span>
      </div>
    </router-link>
    <router-link v-bind:to="{name: 'HomePage'}" class="catalog-item" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/item.png" width="24px" height="24px" />
        <span class="catalog-item-text">Quản lý bài đăng người dùng</span>
      </div>
    </router-link>
    <router-link v-bind:to="{name: 'HomePage'}" class="catalog-item" >
      <div class="catalog-item-content">
        <img class="catalog-item-icon" src="../assets/images/catalog/item.png" width="24px" height="24px" />
        <span class="catalog-item-text">Quản lý thông báo sự kiện</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
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
  margin: auto;
}
.catalog-item {
  height: 30px;
  display: flex;
  align-items: center;
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
  margin-left: 5px;
}
</style>