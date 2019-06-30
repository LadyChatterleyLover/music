<template>
  <div class="container">
    <div class="back">
      <div class="icon" @click="$router.back()">
        <van-icon name="arrow-left" size="26px" color="#fff"></van-icon>
      </div>
      <div class="title">
        歌单
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="w-content">
        <div class="img">
          <img :src="picUrl" alt="">
        </div>
        <div class="name">
          {{picName}}
        </div>
        <div class="content">
          <div class="c-top">
            <div class="c-icon">
              <van-icon name="play-circle-o" size="20px"></van-icon>
            </div>
            <div class="play">
              播放全部 (共{{playList.length}}首)
            </div>
            <div class="col">
              + 收藏 ({{subscribedCount}})
            </div>
          </div>
          <div class="item" v-for="(item, index) in playList" :key="index" @click="goToPlay(item, index)">
            <div class="index">
              {{index + 1}}
            </div>
            <div class="i-desc">
              <div class="i-name">
                <div>
                  {{item.name}}
                </div>
                <div class="item1" v-for="(item1, index1) in item.alia" v-if="item.alia.length > 0" :key="index1">
                  ({{item1}})
                </div>
              </div>
              <div class="i-singer">
                <div class="singer" v-for="(item2, index2) in item.ar" :key="index2">
                  {{item2.name}} <span v-if="index2 !== item.ar.length - 1">&nbsp;/&nbsp;</span>
                  <span v-if="index2 === item.ar.length - 1">-&nbsp;</span>
                </div>
                <div class="al">
                  {{item.al.name}}
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
    name: "PlayList",
    components: {},
    props: {},
    data() {
      return {
        playList: [], // 播放列表
        trackUpdateTime: '', // 更新时间
        subscribedCount: 0,
        picName: '',
        id: '',
        picUrl: ''
      }
    },
    methods: {
      goToPlay(item, index) {
        this.$store.state.detailItem.name = item.ar
        this.$com.req(`api/song/detail?ids=${item.id}`).then(res => {
          if (res.code === 200) {
            let song = res.songs[0]
            this.$router.push({name: 'player', params: {item: song, index: index, songs: this.playList}})
          }
        })
      }
    },
    mounted() {
      this.$com.req(`api/playlist/detail?id=${this.playListId}`).then(res => {
        this.playList = res.playlist.tracks
        this.trackUpdateTime = this.$moment(res.playlist.trackUpdateTime).format('MM月DD日')
        this.subscribedCount = res.playlist.subscribedCount
        this.picName = res.playlist.name
        this.picUrl= res.playlist.coverImgUrl
      })
      let wrapper = this.$refs.wrapper
      this.$nextTick(() => {
        new this.$BScroll(wrapper, {
          click: true,
          probeType: 3
        })
      })
    },
    created() {

    },
    filters: {},
    computed: {
      detailItem () {
        return this.$store.state.detailItem
      },
      playListId () {
        return this.$store.state.playListId
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
      .img {
        width: 100%;
        height: 600px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        font-size: 48px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 6%;
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
            text-overflow:ellipsis;
            white-space: nowrap;
            .i-name {
              display: flex;
              align-items: center;
              font-size: 28px;
              .item1 {
                margin-left: 10px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }
            .i-singer {
              display: flex;
              align-items: center;
              color: #ccc;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }

  }

</style>
