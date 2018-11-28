<template>
  <div id="user-info" v-if="user">
    <div class="avatar">
      <img ref="avatar" :src="config.serverHost + user.avatar" @click="uploadImage" />
      <span class="edit-img-title disable-select" v-if="editing">Đổi ảnh</span>
    </div>
    <ul>
      <li v-if="!editing" class="user-name">{{user.name}}</li>
      <li v-if="editing"><input ref="name" class="form-control" type="text" :value="user.name" placeholder="Họ và tên" /></li>

      <li v-if="!editing">Ngày sinh: {{`${dateOfBirth.getDate()}-${dateOfBirth.getMonth() + 1}-${dateOfBirth.getFullYear()}`}}</li>
      <li v-if="editing"><input ref="dateOfBirth" class="form-control" type="date" :value="`${dateOfBirth.getFullYear()}-${dateOfBirth.getMonth() + 1}-${dateOfBirth.getDate()}`" /></li>

      <li v-if="!editing">Địa chỉ: {{user.address}}</li>
      <li v-if="editing"><textarea ref="address" class="form-control" :value="user.address" placeholder="Địa chỉ" ></textarea></li>

      <li v-if="!editing">Số điện thoại: {{user.phoneNumber}}</li>
      <li v-if="editing"><input ref="phoneNumber" class="form-control" type="number" :value="user.phoneNumber" placeholder="Số điện thoại" /></li>

      <li v-if="!editing">Giới tính: {{user.gender}}</li>
      <li v-if="editing">
        <select ref="gender" class="form-control" v-model="user.gender">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </li>
      <li><button v-if="!editing" class="btn-primary btn-edit" @click="onBtnEditClicked">Chỉnh sửa</button></li>
      <li>
        <button v-if="editing" class="btn-primary btn-cancel" @click="onBtnCancelClicked">Hủy</button>
        <button v-if="editing" class="btn-primary btn-update" @click="onBtnUpdateClicked">Lưu thay đổi</button>
      </li>
    </ul>
    <input class="file-input" type="file" ref="file" v-on:change="handleImageUpload"/>
  </div>
</template>

<script>
import config from '../config'
import CommonService from '../services/CommonService'

export default {
  props: [
    'user',
    'editing',
    'update'
  ],
  data () {
    return {
      config: config,
      file: null,
      css: {
        editing: '.avatar {opacity: 0.7;} .avatar:hover {opacity: 0.5;} .avatar:hover > .edit-img-title {opacity: 1;}',
        normal: '.avatar {opacity: 1;} .avatar:hover {opacity: 1;}'
      }
    }
  },
  computed: {
    dateOfBirth () {
      return new Date(this.user.dateOfBirth)
    }
  },
  mounted () {
  },
  methods: {
    changeAvatarStyle (css) {
      var style = document.createElement('style')
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.appendChild(document.createTextNode(css))
      }
      this.$refs.avatar.appendChild(style)
    },
    onBtnEditClicked () {
      this.changeAvatarStyle(this.css.editing)
      this.$emit('edit')
    },
    onBtnCancelClicked () {
      this.$refs.avatar.src = config.serverHost + this.user.avatar
      this.$refs.file.value = ''
      this.file = null
      this.changeAvatarStyle(this.css.normal)
      this.$emit('cancelEdit')
    },
    async onBtnUpdateClicked () {
      let _user = {
        name: this.$refs.name.value,
        dateOfBirth: new Date(this.$refs.dateOfBirth.value),
        address: this.$refs.address.value,
        phoneNumber: this.$refs.phoneNumber.value,
        gender: this.$refs.gender.options[this.$refs.gender.selectedIndex].value,
        avatar: this.user.avatar
      }

      if (this.file) {
        let formData = new FormData()
        formData.append('files', this.file)

        let response = await CommonService.uploadFile(formData)
        if (response.data.isSuccess && response.data.fileNames.length > 0) {
          _user.avatar = response.data.fileNames[0]
          this.file = null
        }
      }
      this.update(_user)

      this.changeAvatarStyle(this.css.normal)
    },
    uploadImage () {
      if (this.editing) {
        this.$refs.file.click()
      }
    },
    handleImageUpload () {
      this.file = this.$refs.file.files[0]
      if (!this.file) {
        return
      }

      let self = this
      let reader = new FileReader()
      reader.onloadend = function () {
        self.$refs.avatar.src = reader.result
      }
      reader.readAsDataURL(this.file)
    }
  }
}
</script>

<style>
#user-info {
  word-wrap: break-word;
  width: 300px;
}
#user-info ul {
  padding-left: 50px;
  width: 250px;
}
#user-info li {
  text-align: left;
  list-style-type: none;
  margin: 5px 0px;
}
.user-name {
  font-size: 20px;
  font-weight: bold;
}
.avatar {
}
.avatar img {
  border-radius: 50%;
  border: solid 5px #ffffff;
  width: 200px;
  height: 200px;
}
.btn-update {
}
.btn-cancel {
  width: 90px;
}
.file-input {
  opacity: 0;
  position: fixed;
  top: -1000px;
}
.edit-img-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color:#ffffff;
  font-size: 25px;
  cursor:default;
  opacity: 0.7;
}
.disable-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently supported by any browser but < IE9 */
}
</style>
