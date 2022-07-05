<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <button class="btn btn-lg btn-default logout-btn" @click="logout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateInfo } from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data() {
    return {
      user: {
        image: '',
        bio: '',
        username: '',
        email: '',  // lpzmail@163.com
        password: ''   // 12345678
      },
      errors: {} // 错误信息
    }
  },
  computed: {
    ...mapState({
      currUser: state => state.user
    })
  },
  created(){
    this.user = JSON.parse(JSON.stringify(this.currUser))
  },
  methods: {
    async onSubmit(){
      try {
        await updateInfo({
          user: this.user
        })
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    },
    logout(){
      Cookie.remove('user');
      this.$store.commit('removeUser')
      
      // 跳转到首页
      this.$router.push('/')
    }
  }
}
</script>

<style>
.logout-btn{
  width:120px;
  text-align:center;
  padding: 10px 20px;
  border-radius: 10px;
  outline: 0;
}
</style>
