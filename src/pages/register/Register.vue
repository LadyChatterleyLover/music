<template>
  <div>
    <div class="top">
      欢迎登录网易云音乐
    </div>
    <div class="content">
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
                left-icon="photo-o"
                required
                clearable
                placeholder="请输入密码"
        ></van-field>
        <van-field
                v-model="captcha"
                label="验证码"
                left-icon="label-o"
                required
                clearable
                placeholder="请输入验证码"
        >
          <van-button type="primary" slot="button" size="small" @click="send">
            {{sendValue}}
          </van-button>
        </van-field>
        <van-field
                v-model="nickname"
                center
                label="密码"
                left-icon="user-o"
                required
                clearable
                placeholder="请输入昵称"
        ></van-field>
      </van-cell-group>
      <div class="btn">
        <van-button type="danger" @click="$router.push('/login')">前往登录</van-button>
        <van-button type="warning"  @click="register">立即注册</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Register",
    components: {},
    props: {},
    data() {
      return {
        phone: '',
        password: '',
        captcha: '',
        nickname: '',
        sendValue: '发送验证码',
        time: 30,
        timer: null
      }
    },
    methods: {
      register () {
        this.$com.req(`api/captch/verify?phone=${this.phone}&captcha=${this.captcha}`)
          .then(res => {
            if (res.code === 200) {
              this.$com.req(`api/captch/register?phone=${this.phone}&password=${this.password}&captcha=${this.captcha}&nickname=${this.nickname}`)
                .then(res => {
                  if (res.code === 200) {
                    this.$router.push('/login')
                    this.$toast.success('注册成功')
                  }
                }).catch(err => {
                  if (err) {
                    this.$toast.fail('注册失败,请稍后再试')
                  }
              })
            }
          }).catch(err => {
            if (err) {
              this.$toast('验证码错误')
            }
        })
      },
      send () {
        if (this.timer) clearInterval(this.timer)
        if (this.phone === '') {
          this.$toast.fail('手机号不能为空')
          return
        } else {
          this.timer = setInterval(() => {
            this.time --
            this.sendValue = this.time + 's'
            if (this.time === 0) {
              this.sendValue = '重新发送'
              clearInterval(this.timer)
            }
          }, 1000)
          if (this.sendValue === '重新发送') {
            if (this.timer) clearInterval(this.timer)
            this.time = 30
            this.timer = setInterval(() => {
              this.time --
              this.sendValue = this.time + 's'
              if (this.time === 0) {
                this.sendValue = '重新发送'
                clearInterval(this.timer)
              }
            }, 1000)
          }
          this.$com.req(`api/captch/sent?phone=${this.phone}`).then(res => {
            if (res.code === 200) {
              this.$toast.success('短信验证码发送成功')
            }
          })
        }
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
  .content {
    margin-top: 40px;
  }
  .btn {
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
  }
</style>
