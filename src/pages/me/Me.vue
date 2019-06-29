<template>
  <div class="me">
    <div class="no-login" v-if="!user">
      <div class="n-desc">
        您还没有登录喔
      </div>
      <div>
        <van-button type="info" size="small" @click="goLogin">立即登录</van-button>
      </div>
    </div>
    <div v-else>
      <div class="btn1">
        <van-button type="warning" @click="logout">退出登录</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Me",
    components: {},
    props: {},
    data() {
      return {
        user: {}
      }
    },
    methods: {
      goLogin () {
        this.$router.push('/login')
      },
      logout () {
        this.$store.state.user = null
        localStorage.removeItem('user')
        this.$router.push('/')
        this.$toast.success('退出成功')
      }
    },
    mounted() {
      if (localStorage.user) this.user = JSON.parse(localStorage.user)
      else this.user = null
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
  .me {
    .no-login {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50%;
      .n-desc {
        font-size: 28px;
        margin: 20px 0;
      }
    }
  }
</style>
