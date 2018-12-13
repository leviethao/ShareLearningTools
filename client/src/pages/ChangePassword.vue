<template>
  <div id="changePassword">
    <div class="global-container body-wrapper changePW" v-if="!isChangeSuccess">
      <h2>Thay đổi mật khẩu</h2>
      <p v-show="isChangeError" style="float: left; color: red;">{{'Mật khẩu không hợp lệ'}}</p>
      <div class='form-group'>
        <input id='password' class='form-control' type='password' name='password' value='' placeholder='Mật khẩu hiện tại' required v-model="password"/>
      </div>
      <div class='form-group'>
        <input id='newPassword' class='form-control' type='password' name='newPassword' value='' placeholder='Mật khẩu mới' v-on:input="checkPassword" required v-model="newPassword"/>
        <p v-show="isPasswordError" style="float: left; color: red;">{{errors.password}}</p>
      </div>
      <div class='form-group'>
        <input id='confirmPassword' class='form-control' type='password' name='confirmPassword' value='' placeholder='Xác nhận mật khẩu' required v-on:input='checkConfirmPassword' v-model="confirmPassword"/>
        <p v-show="isConfirmError" style="float:left; color: red;">Mật khẩu không trùng khớp</p>
      </div>
      <button class='btn btn-primary' @click="onBtnSaveClicked">Lưu thay đổi</button>
    </div>
    <div class="successForm" v-show="isChangeSuccess">
      <h2>Thay đổi mật khẩu thành công</h2>
      <button class='btn btn-primary' @click="onBtnLoginClicked">Đi tới trang đăng nhập</button>
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService'
export default {
  props: [
  ],
  data () {
    return {
      password: null,
      newPassword: null,
      isConfirmError: false,
      isPasswordError: false,
      isChangeSuccess: false,
      isChangeError: false,
      errors: {
        password: null
      }
    }
  },
  methods: {
    checkConfirmPassword () {
      let input = document.getElementById('confirmPassword')
      this.isConfirmError = input.value !== document.getElementById('newPassword').value
    },
    checkPassword () {
      let input = document.getElementById('newPassword')
      if (input.value.length < 6) {
        this.errors.password = 'Mật khẩu phải dài hơn 6 ký tự'
        this.isPasswordError = true
      } else if (input.value.length > 20) {
        this.errors.password = 'Mật khẩu không được dài quá 20 ký tự'
        this.isPasswordError = true
      } else {
        this.errors.password = ''
        this.isPasswordError = false
      }
    },
    async onBtnSaveClicked () {
      if (this.isPasswordError || this.isConfirmError) {
        return
      }
      let userRes = await UserService.changePassword({oldPW: this.password, newPW: this.newPassword})
      if (!userRes.data.user) {
        this.isChangeError = true
      } else {
        // logout
        this.$store.dispatch('logout')
        this.isChangeError = false
        this.isChangeSuccess = true
      }
    },
    onBtnLoginClicked () {
      this.$router.push({name: 'LoginPage'})
    }
  }
}
</script>

<style>
#changePassword {
  display: flow-root;
}

.changePW {
  width: 400px;
  padding: 10px 20px;
  background-color: white;
  margin: auto;
  margin-top: 52px;
}
</style>
