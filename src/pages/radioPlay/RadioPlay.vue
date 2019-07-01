<template>
  <div class="container">
    <div class="back">
      <div class="icon" @click="$router.back()">
        <van-icon name="arrow-left" size="26px" color="#fff"></van-icon>
      </div>
      <div class="title">
        电台
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="w-content">
        <div class="img">
          <img :src="picUrl" alt="">
        </div>
        <div class="userName">
          <div>
            {{name}}
          </div>
        </div>
        <div class="name">
          {{subCount}} 人订阅
        </div>
        <div class="content">
          <div class="c-top">
            <div class="c-icon">
              <van-icon name="play-circle-o" size="20px"></van-icon>
            </div>
            <div class="play">
              播放全部 (共{{playList.length}}期)
            </div>
          </div>
          <div class="item" v-for="(item, index) in playList" :key="index" @click="goToPlay(item, index)">
            <div class="index">
              {{index + 1}}
            </div>
            <div class="i-desc">
              <div class="i-name">
                <div class="d-name">
                  {{item.name}}
                </div>
              </div>
              <div class="d-con">
                <div class="createTime">
                  {{item.createTime}}
                </div>
                <div class="play">
                  <div class="p-icon">
                    <van-icon name="play"></van-icon>
                  </div>
                  <div class="p-count">
                    {{item.listenerCount}}
                  </div>
                </div>
                <div class="clock">
                  <div class="c-icon">
                    <van-icon name="clock-o"></van-icon>
                  </div>
                  <div class="c-time">
                    {{item.duration}}
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
    name: "SearchPlay",
    components: {},
    props: {},
    data() {
      return {
        picUrl: '', // 封面
        playList: [],
        name: '', // 名称
        subCount: '' // 订阅人数
      }
    },
    methods: {
      goToPlay (item, index) {
        this.$router.push({name: 'player', params: {item: item, index: index, songs: this.playList}})
      }
    },
    mounted() {
      this.$com.req(`api/dj/detail?rid=${this.radioId}`).then(res => {
        console.log(res)
        this.picUrl = res.djRadio.picUrl
        this.name = res.djRadio.name
        this.subCount = res.djRadio.subCount
      })
      this.$com.req(`api/dj/program?rid=${this.radioId}`).then(res => {
        this.playList = res.programs
        this.playList.map(item => {
          item.createTime = this.$moment(item.createTime).format('YYYY-MM-DD')
          item.duration = (item.duration / 60 / 1000).toFixed(2).replace('.', ':')
        })
      })
      this.$nextTick(() => {
        let wrapper = this.$refs.wrapper
        this.scroll = new this.$BScroll(wrapper, {
          click: true,
          probeType: 3
        })
      })
    },
    created() {

    },
    filters: {},
    computed: {
      radioId() {
        return this.$store.state.radioId
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
    position: relative;
    height: 100vh;
    overflow: hidden;

    .w-content {
      height: auto;
      position: relative;
      .userName {
        font-size: 32px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 20px;
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
        font-size: 24px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .d-con {
              display: flex;
              align-items: center;
              color: #ccc;
              .createTime {

              }
              .play {
                display: flex;
                align-items: center;
                margin: 0 20px;
                .p-icon {
                  display: flex;
                  align-items: center;
                  margin-right: 10px;
                }
              }
              .clock {
                display: flex;
                align-items: center;
                .c-icon {
                  display: flex;
                  align-items: center;
                  margin-right: 10px;
                }
              }
            }
            .i-name {
              display: flex;
              align-items: center;
              font-size: 28px;
            }

            .i-singer {
              display: flex;
              align-items: center;
              color: #ccc;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }

  }

</style>
