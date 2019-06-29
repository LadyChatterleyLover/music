<template>
  <div class="me">
    <div class="no-login" v-if="!userId">
      <div class="n-desc">
        您还没有登录喔
      </div>
      <div>
        <van-button type="info" size="small" @click="goLogin">立即登录</van-button>
      </div>
    </div>
    <div v-else>
      <div class="content">
        <div class="img">
          <img :src="user.avatarUrl" alt="">
        </div>
        <div class="desc">
          <div class="name">
            {{user.nickname}}
          </div>
          <div class="type">
            Lv: {{user.userType}}
          </div>
        </div>
        <div class="sign">
          <div v-if="!isSign" class="s-item" @click="sign">签到</div>
          <div v-else class="s-item">已签到</div>
        </div>
      </div>
      <div class="container">
        <div class="c-item">
          <div class="num">
            {{dynamic}}
          </div>
          <div class="title">
            动态
          </div>
        </div>
        <div class="c-item">
          <div class="num">
            {{follow}}
          </div>
          <div class="title">
            关注
          </div>
        </div>
        <div class="c-item">
          <div class="num">
            {{fans}}
          </div>
          <div class="title">
            粉丝
          </div>
        </div>
        <div class="c-item" @click="edit">
          <div class="num">
            <van-icon name="edit" size="20px"></van-icon>
          </div>
          <div class="title">
            编辑资料
          </div>
        </div>
      </div>
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
        user: {},
        isSign: false, // 是否签到
        dynamic: 0, // 动态
        follow: 0, // 关注
        fans: 0, // 粉丝
        userId: ''
      }
    },
    methods: {
      goLogin() {
        this.$router.push('/login')
      },
      // 签到
      sign() {
        this.$com.req(`api/daily_signin?type=1`).then(res => {
          if (res.code === 200) {
            this.$toast.success('签到成功')
            this.isSign = true
          }
        })
      },
      logout() {
        this.$com.req('api/logout').then(res => {
          if (res.code === 200) {
            this.$store.state.user = null
            localStorage.removeItem('user')
            localStorage.removeItem('userId')
            this.$router.push('/')
            this.$toast.success('退出成功')
          }
        })

      },
      // 获取动态
      getDynamic() {
        this.$com.req(`api/user/event?uid=${this.userId}`).then(res => {
          if (res.code === 200) {
            this.dynamic = res.events.length
          }
        })
      },
      // 获取关注
      getFollow() {
        this.$com.req(`api/user/follows?uid=${this.userId}`).then(res => {
          if (res.code === 200) {
            this.follow = res.follow.length
          }
        })
      },
      // 获取粉丝
      getFans() {
        this.$com.req(`api/user/followeds?uid=${this.userId}`).then(res => {
          if (res.code === 200) {
            this.fans = res.followeds.length
          }
        })
      },
      // 编辑资料
      edit() {
        this.$router.push('/edit')
      },
      getUser() {
        this.$com.req(`api/user/detail?uid=${this.userId}`).then(res => {
          if (res) {
            this.user = res.profile
            console.log(this.user)
            this.isSign = res.pcSign
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(res.profile))
          }
        })
      }
    },
    mounted() {
      if (localStorage.userId){
        this.userId = localStorage.userId
        this.getDynamic()
        this.getFollow()
        this.getFans()
        this.getUser()
      }
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

    .content {
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-left: 40px;
      position: relative;

      .img {
        width: 120px;
        height: 120px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .desc {
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          margin-left: 40px;
          font-size: 32px;
        }

        .type {
          text-align: center;
          width: 100px;
          background: #eee;
          border-radius: 14px;
          position: relative;
          top: 12px;
        }
      }

      .sign {
        position: absolute;
        right: 40px;

        .s-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          border-radius: 14px;
          background: #ccc;
          color: #fff;
        }
      }
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 60px;

      .c-item {
        text-align: center;

        .num {
          font-size: 30px;
        }

        .title {
          color: #aaa;
        }
      }
    }

    .btn1 {
      display: flex;
      justify-content: center;
      margin-top: 100px;
    }
  }
</style>
