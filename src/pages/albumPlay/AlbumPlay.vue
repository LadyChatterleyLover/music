<template>
  <div class="container">
    <div class="back">
      <div class="icon" @click="$router.back()">
        <van-icon name="arrow-left" size="26px" color="#fff"></van-icon>
      </div>
      <div class="title">
        专辑
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="w-content">
        <div class="img">
          <img :src="picUrl" alt="">
        </div>
        <div class="singerName">
          <div v-for="(item, index) in singerName" :key="index">
             歌手: {{item.name}}
          </div>
        </div>
        <div class="name">
          专辑: {{name}}
        </div>
        <div class="publishTime">
          发行时间: {{publishTime}}
        </div>
        <div class="description">
          简介: {{description}}
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
    name: "AlbumPlay",
    components: {},
    props: {},
    data() {
      return {
        picUrl: '', // 专辑封面
        singerName: [], // 歌手名字
        publishTime: '', // 发行时间
        description: '', // 简介
        playList: [],
        name: '', // 专辑名称
      }
    },
    methods: {
      goToPlay (item, index) {
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
      this.$com.req(`api/album?id=${this.albumId}`).then(res => {
        this.picUrl = res.album.picUrl
        this.singerName = res.album.artists
        this.publishTime = this.$moment(res.album.publishTime).format('YYYY-MM-DD')
        this.description = res.album.description
        this.playList = res.songs
        this.name = res.album.name
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
      albumId() {
        return this.$store.state.albumId
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
    top: 0px;

    .w-content {
      position: relative;
      .singerName {
        font-size: 32px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 8%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 20px;
      }
      .publishTime {
        font-size: 32px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 40px;
      }
      .description {
        font-size: 32px;
        color: #fff;
        position: absolute;
        width: 80%;
        top: 12%;
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

            .i-name {
              display: flex;
              align-items: center;
              font-size: 28px;

              .item1 {
                margin-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
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
