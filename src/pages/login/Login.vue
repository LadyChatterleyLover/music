<template>
  <div class="login">
    <div class="top">
      欢迎登录网易云音乐
    </div>
    <div class="tab">
      <van-tabs v-model="active">
        <van-tab title="手机号登录">
          <div class="desc">
            <van-cell-group>
              <van-field
                  type="tel"
                  left-icon="phone-o"
                  v-model="phone"
                  label="手机号"
                  required
                  clearable
                  placeholder="请输入手机号"
              ></van-field>
              <van-field
                  type="password"
                  v-model="password"
                  label="密码"
                  left-icon="manager-o"
                  required
                  clearable
                  placeholder="请输入密码"
              ></van-field>
            </van-cell-group>
          </div>
          <div class="btn">
            <van-button type="danger" @click="phoneLogin">立即登录</van-button>
          </div>
        </van-tab>
        <van-tab title="邮箱登录">
          <div class="desc">
            <van-cell-group>
              <van-field
                  type="email"
                  left-icon="phone-o"
                  v-model="email"
                  label="邮箱"
                  required
                  clearable
                  placeholder="请输入网易邮箱"
              ></van-field>
              <van-field
                  type="password"
                  v-model="password2"
                  label="密码"
                  left-icon="envelop-o"
                  required
                  clearable
                  placeholder="请输入密码"
              ></van-field>
            </van-cell-group>
          </div>
          <div class="btn">
            <van-button type="danger" @click="emailLogin">立即登录</van-button>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Login",
    components: {},
    props: {},
    data() {
      return {
        user: {},
        active: 1,
        phone: '',
        password: '',
        email: '',
        password2: ''
      }
    },
    methods: {
      phoneLogin() {
        if (this.phone === '') {
          this.$toast.fail('手机号不能为空')
          return
        }
        if (this.password === '') {
          this.$toast.fail('密码不能为空')
          return
        }
        this.$com.req(`api/login/cellphone?phone=${this.phone}&password=${this.password}`)
            .then(res => {
              if (res) {
                let user = res.profile
                localStorage.setItem('user', JSON.stringify(user))
                this.$store.state.user = user
                this.$router.push('/me')
                this.$toast.success('登录成功')
              }

            }).catch(err => {
          if (err) {
              this.$toast.fail('账号或密码错误')
          }
        })
      },
      emailLogin () {
        if (this.email === '') {
          this.$toast.fail('手机号不能为空')
          return
        }
        if (this.password2 === '') {
          this.$toast.fail('密码不能为空')
          return
        }
        this.$com.req(`api/login/email?email=${this.email}&password=${this.password2}`)
            .then(res => {
              if (res) {
                let user = res.profile
                localStorage.setItem('user', JSON.stringify(user))
                this.$store.state.user = user
                this.$router.push('/me')
                this.$toast.success('登录成功')
              }

            }).catch(err => {
          console.log(err)
          if (err) {
            this.$toast.fail('账号或密码错误')
          }
        })
      }
    },
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .login {
    .top {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      width: 100%;
      background: #c10d0d;
      color: #fff;
      font-size: 28px;
    }

    .desc {
      margin-top: 40px;
    }

    .btn {
      display: flex;
      justify-content: center;
      margin-top: 100px;
    }
  }
</style>