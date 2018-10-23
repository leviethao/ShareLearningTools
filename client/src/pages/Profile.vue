<template>
  <div id="profile">
    <div class="header-bar-component">
      <header-bar />
    </div>
    <div class="global-container">
      <div class="column-1">
        <div class="profile-avatar">
          <img :src="config.serverHost + user.avatar" />
        </div>
      </div>
      <div class="column-2">
        <table id="profile-info">
          <tr>
            <td class="c1">Tên người dùng: </td>
            <td class="c2"><input ref="name" type="text" :value="user.name" disabled /></td>
            <td class="c3"><button ref="btn1" @click="onModifyBtnClicked('name', 'btn1')">Chỉnh sửa</button></td>
          </tr>
          <tr>
            <td class="c1">Ngày sinh: </td>
            <td class="c2"><input ref="dateOfBirth" type="date" :value="user.dateOfBirth.split('T')[0]" disabled /></td>
            <td class="c3"><button ref="btn2" @click="onModifyBtnClicked('dateOfBirth', 'btn2')">Chỉnh sửa</button></td>
          </tr>
          <tr>
            <td class="c1">Địa chỉ: </td>
            <td class="c2"><textarea ref="address" :value="user.address" disabled></textarea></td>
            <td class="c3"><button ref="btn3" @click="onModifyBtnClicked('address', 'btn3')">Chỉnh sửa</button></td>
          </tr>
          <tr>
            <td class="c1">Số điện thoại: </td>
            <td class="c2"><input ref="phoneNumber" type="number" :value="user.phoneNumber" disabled /></td>
            <td class="c3"><button ref="btn4" @click="onModifyBtnClicked('phoneNumber', 'btn4')">Chỉnh sửa</button></td>
          </tr>
          <tr>
            <td class="c1">Giới tính: </td>
            <td class="c2">
              <select ref="gender" v-model="selectedGender" disabled>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </td>
            <td class="c3"><button ref="btn5" @click="onModifyBtnClicked('gender', 'btn5')">Chỉnh sửa</button></td>
          </tr>
        </table>
      </div>
      <div class="clear-both"></div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar'
import UserService from '../services/UserService'
import config from '../config'

export default {
  components: {
    HeaderBar
  },
  data () {
    return {
      user: {},
      selectedGender: 'Nam',
      config: config
    }
  },
  async mounted () {
    const userRes = await UserService.getMyUserInfo()
    this.user = userRes.data.user
    this.selectedGender = this.user.gender
  },
  methods: {
    async onModifyBtnClicked (inputRef, btnRef) {
      if (this.$refs[btnRef].innerHTML !== 'Lưu') {
        this.$refs[inputRef].disabled = false
        this.$refs[inputRef].focus()
        this.$refs[btnRef].innerHTML = 'Lưu'
      } else {
        this.$refs[inputRef].disabled = true
        this.$refs[btnRef].innerHTML = 'Chỉnh sửa'

        if (inputRef === 'dateOfBirth') {
          this.user[inputRef] = new Date(this.$refs[inputRef].value)
        } else {
          this.user[inputRef] = this.$refs[inputRef].value
        }
        await UserService.updateUserInfo(this.user)
      }
    }
  }
}
</script>

<style>
.column-1 {
  float: left;
}
.column-2 {
  float: left;
  width: 700px;
  margin-left: 100px;
}
#profile-info .c1 {
  width: 150px;
  text-align:left;
  padding-bottom: 10px;
}
#profile-info .c2 {
  width: 400px;
  text-align:left;
  padding-bottom: 10px;
}
#profile-info .c3 {
  padding-bottom: 10px;
}
</style>
