<template>
  <div>
    <div id='loggedout-menubar-container'>
      <div class='float-left' style='padding-top: 5px;'>
          <span id='logo-text'>Chia Sẻ Dụng Cụ Học Tập</span>
      </div>
      <div id='login-form'>
          <table>
            <tr>
              <td><input id="loginNameLogin" class='form-control' type='text' name='loginName' placeholder="Tên đăng nhập" /></td>
              <td><input id="passwordLogin" class='form-control' type='password' name='password' placeholder="Mật khẩu" /></td>
              <td><button class='btn btn-primary' @click="login">Đăng nhập</button></td>
            </tr>
          </table>
      </div>
    </div>
    <div class='clear-both'></div>

    <div id='content'>
      <div class='float-left'>

      </div>
      <div id='create-account-form'>
        <h2>Tạo tài khoản mới</h2>
          <div class='form-group'>
            <input id='name' class='form-control' type='text' name='name' value='' placeholder='Tên người dùng' v-on:input="checkName" required v-model="name"/>
            <p v-show="isNameError" style="float: left; color: red;">{{errors.name}}</p>
          </div>
          <div class='form-group'>
            <input id='loginName' class='form-control' type='text' name='loginName' value='' placeholder='Tên đăng nhập' v-on:input="checkLoginName" required v-model="loginName"/>
            <p v-show="isLoginNameError" style="float: left; color: red;">{{errors.loginName}}</p>
          </div>
          <div class='form-group'>
            <input id='password' class='form-control' type='password' name='password' value='' placeholder='Mật khẩu mới' v-on:input="checkPassword" required v-model="password"/>
            <p v-show="isPasswordError" style="float: left; color: red;">{{errors.password}}</p>
          </div>
          <div class='form-group'>
            <input id='confirmPassword' class='form-control' type='password' name='confirmPassword' value='' placeholder='Xác nhận mật khẩu' required v-on:input='checkConfirmPassword' v-model="confirmPassword"/>
            <p v-show="isComfirmError" style="float:left; color: red;">Mật khẩu không trùng khớp</p>
          </div>
          <button class='btn btn-primary' @click="register">Tạo tài khoản</button>
      </div>
    </div>
    <!-- <div>{{$data | json}}</div> -->
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  name: 'LoginPage',
  data () {
    return {
      name: '',
      loginName: '',
      password: '',
      confirmPassword: '',
      isComfirmError: false,
      isLoginNameError: false,
      isNameError: false,
      isPasswordError: false,

      errors: {
        name: '',
        loginName: '',
        password: ''
      }
    }
  },
  created () {
    // CommonServices.gotoLoginPage()
  },

  methods: {
    async login () {
      try {
        let loginNameLogin = document.getElementById('loginNameLogin').value
        let passwordLogin = document.getElementById('passwordLogin').value
        let response = await AuthenticationService.login({
          loginName: loginNameLogin,
          password: passwordLogin
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$router.push({name: 'HomePage'})
      } catch (error) {
        alert(error.response.data.error)
      }
    },

    async register () {
      try {
        if (this.isComfirmError || this.isLoginNameError || this.isNameError || this.isPasswordError) {
          return
        }
        const response = await AuthenticationService.register({
          name: this.name,
          loginName: this.loginName,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$router.push({name: 'HomePage'})
      } catch (err) {
        alert(err.response.data.error)
      }
    },

    checkConfirmPassword () {
      let input = document.getElementById('confirmPassword')
      this.isComfirmError = input.value !== document.getElementById('password').value
    },

    checkName () {
      let input = document.getElementById('name')
      if (input.value.length < 1) {
        this.errors.name = 'Tên người dùng không được để trống'
        this.isNameError = true
      } else if (input.value.length > 32) {
        this.errors.name = 'Tên người dùng phải <= 32 ký tự'
        this.isNameError = true
      } else {
        this.errors.name = ''
        this.isNameError = false
      }
    },

    checkLoginName () {
      let input = document.getElementById('loginName')
      if (input.value.length < 1) {
        this.errors.loginName = 'Tên đăng nhập không được để trống'
        this.isLoginNameError = true
      } else if (input.value.length > 30) {
        this.errors.loginName = 'Tên đăng nhập phải <= 30 ký tự'
        this.isLoginNameError = true
      } else {
        this.errors.loginName = ''
        this.isLoginNameError = false
      }
    },

    checkPassword () {
      let input = document.getElementById('password')
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
    }
  }
}
</script>

<style>
#loggedout-menubar-container {
  background-color: #A33BBA;
  width: 100%;
  height: 90px;
  padding-top: 17px;
  padding-right: 130px;
  padding-left: 130px;
}

#logo-text {
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
}

#login-form{
  float:right;
}

#login-form table {
  border-collapse: separate;
  border-spacing: 10px;
}

.caption {
  text-align: center
}
#content {
  width: 80%;
  height: 400px;
  margin: auto;
}
#create-account-form {
  width: 44%;
  float: right;
  margin-top: 60px;
}
</style>
