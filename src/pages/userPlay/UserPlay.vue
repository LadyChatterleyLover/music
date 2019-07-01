<template>
  <div class="container">
    <div class="back">
      <div class="icon" @click="$router.back()">
        <van-icon name="arrow-left" size="26px" color="#fff"></van-icon>
      </div>
      <div class="title">
        用户
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="w-content">
        <div class="img">
          <img :src="profile.backgroundUrl" alt="">
        </div>
        <div class="name">
          {{profile.nickname}}
        </div>
        <div class="description">
          {{profile.description}}
        </div>
        <div class="desc">
          <div class="follows">
            关注: {{profile.follows}}
          </div>
          <div class="follows">
            粉丝: {{profile.followeds}}
          </div>
          <div class="follows">
            {{bir}}后
          </div>
        </div>
        <div class="content">
          <div class="c-top">
            <div class="c-icon">
              <van-icon name="play-circle-o" size="20px"></van-icon>
            </div>
            <div class="play">
              播放全部 (共{{playList.length}}首)
            </div>
          </div>
          <div class="item" v-for="(item, index) in playList" :key="index" @click="goToPlay(item, index)">
            <div class="index">
              {{index + 1}}
            </div>
            <div class="i-desc">
              <div class="i-img">
                <img :src="item.coverImgUrl" alt="">
              </div>
              <div class="i-con">
                <div class="i-name">
                  <div>
                    {{item.name}}
                  </div>
                </div>
                <div class="i-count">
                  <div class="count">
                    {{item.trackCount}}首,
                  </div>
                  <div class="play-count">
                    播放{{item.playCount}}次
                  </div>
                </div>
              </div>
              
            </div>
            <div class="con-icon">
              <van-icon name="play-circle-o" size="20px"></van-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "AlbumPlay",
    components: {},
    props: {},
    data() {
      return {
        picUrl: '', // 专辑封面
        profile: {}, // 用户信息
        publishTime: '', // 发行时间
        description: '', // 简介
        playList: [],
        name: '', // 用户名称
        bir: '', // 生日
      }
    },
    methods: {
      goToPlay (item, index) {
        console.log(item)
        // this.$com.req(`api/playlist/detail?id=${item.id}`).then(res => {
        //   if (res.code === 200) {
        //     console.log(res.playlist)
        //     let playList = res.playlist.tracks
        //   }
        // })
       this.$store.state.sheetId = item.id
        this.$router.push('/sheetPlay')
      },
      getPlayList () {
        this.$com.req(`api/user/playlist?uid=${this.userId}`).then(res => {
          this.playList = res.playlist
          console.log(res)
        })
      }
    },
    mounted() {
      this.$com.req(`api/user/detail?uid=${this.userId}`).then(res => {
        console.log(res)
        this.profile = res.profile
        let time  = this.$moment(res.profile.birthday).format('YY')
        if (time.substr(1,1) >= 5) this.bir = time.substr(0, 1) + '5'
        else this.bir = time.substr(0, 1) + '0'
      })
      this.$nextTick(() => {
        let wrapper = this.$refs.wrapper
        this.scroll = new this.$BScroll(wrapper, {
          click: true,
          probeType: 3
        })
      })
      this.getPlayList()
    },
    created() {

    },
    filters: {},
    computed: {
      userId() {
        return this.$store.state.userId
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #c10d0d;
    height: 80px;
    z-index: 99;
    box-shadow: 2px 2px 2px;

    .title {
      font-size: 32px;
      color: #fff;
    }

    .icon {
      position: absolute;
      left: 40px;
    }
  }

  .wrapper {
    position: fixed;
    height: 100vh;
    overflow: hidden;
    bottom: 20px;
    top: 0;

    .w-content {
      height: auto;
      position: relative;

      .description {
        font-size: 24px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 6.5%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 60px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
      }
      .img {
        width: 100%;
        height: 600px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        font-size: 32px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 6%;
        left: 50%;
        transform: translateX(-50%);
      }
      .desc {
        display: flex;
        align-items: center;
        position: absolute;
        font-size: 24px;
        color: #fff;
        width: 80%;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        div {
          &:first-child {
            margin-left: 0;
          }
          margin-left: 20px;
        }
      }
      .time {
        color: skyblue;
        font-size: 28px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10%;
      }

      .content {
        position: relative;

        .con-icon {
          position: absolute;
          right: 40px;
        }

        .c-top {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          height: 80px;
          position: relative;

          .c-icon {
            display: flex;
            align-items: center;
            margin: 0 40px;
          }

          .play {
            font-size: 28px;
          }

          .col {
            background: #c10d0d;
            color: #fff;
            font-size: 28px;
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 0;
            height: 100%;
          }
        }

        .item {
          display: flex;
          align-items: center;
          margin: 20px 20px;

          .index {
            margin-right: 30px;
            margin-left: 10px;
            color: #ccc;
            font-size: 28px;
          }

          .i-desc {
            width: 80%;
            display: flex;
            align-items: center;
            .i-img {
              width: 60px;
              height: 60px;
              margin-right: 20px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .i-count {
              display: flex;
              align-items: center;
              color: #ccc;
              .count {
                margin-right: 20px;
              }
            }
            .i-con {
              .i-name {
                font-size: 28px;
              }
            }
          }
        }
      }
    }

  }

</style>
