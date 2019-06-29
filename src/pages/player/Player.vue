<template>
  <div class="container">
    <div class="top">
      <div class="t-icon" @click="back">
        <van-icon name="arrow-left" size="20px" color="#fff"></van-icon>
      </div>
      <div class="t-desc">
        <div class="songName">
          {{song.name}}
        </div>
        <div class="name">
          {{detailItem.name}}
        </div>
      </div>
    </div>
    <div class="i-con">
      <div class="img">
        <img :src="alPic" alt="" :class="{pause: isPlay === false }">
      </div>
    </div>

    <div class="slider">
      <div class="start">
        {{start}}
      </div>
      <div class="slider-item">
        <van-slider
            @change="changeSlider"
            v-model="slider"
            bar-height="1px"
            active-color="#c10d0d"></van-slider>
      </div>
      <div class="duration">
        {{duration}}
      </div>
    </div>
    <div class="audio">
      <audio :src="url" autoplay ref="audio" @canplay="getDuration" @timeupdate="updateTime"></audio>
    </div>
    <div class="play">
      <div class="p-item" @click="changeLoop">
        <img src="../../icons/order.svg" alt="" v-if="loop === 1">
        <img src="../../icons/one.svg" alt="" v-else-if="loop === 2">
        <img src="../../icons/random.svg" alt="" v-else-if="loop === 3">
      </div>
      <div class="p-item" @click="preSong">
        <img src="../../icons/pre.svg" alt="">
      </div>
      <div class="p-item p-play" @click="pause(isPlay)">
        <img src="../../icons/pause.svg" alt="" v-if="playFlag">
        <img src="../../icons/play.svg" alt="" v-else>
      </div>
      <div class="p-item" @click="nextSong">
        <img src="../../icons/next.svg" alt="">
      </div>
      <div @click="collection(isCollection)">
        <van-icon name="like-o" size="30px" color="#fff" v-if="!isCollection"></van-icon>
        <van-icon name="like" size="30px" color="#fff" v-else></van-icon>
      </div>
    </div>
    <van-dialog
        v-model="showDialog"
        message="只有登录过后才能收藏喔"
        cancel-button-text="继续浏览"
        confirm-button-text="前往登录"
        show-cancel-button
        @confirm="confirm"
    ></van-dialog>
  </div>

</template>

<script>
  export default {
    name: "Player",
    components: {},
    props: {},
    data() {
      return {
        song: {},
        currentIndex: 0,
        songs: [],
        url: '',
        start: '0:00',
        duration: 0, // 播放时长
        alPic: '', // 专辑封面
        isPlay: true, // 是否播放
        isCollection: false, // 是否收藏
        loop: 1, // 播放模式 1代表顺序播放 2代表单曲循环 3代表随机播放
        showDialog: false
      }
    },
    methods: {
      back() {
        this.$router.back()
        this.$store.state.isFoot = true
        this.$store.commit('set_currentIndex', this.currentIndex)
      },
      getSongUrl() {
        this.$com.req(`api/song/url?id=${this.song.id}`)
            .then(res => {
              this.url = res.data[0].url
              this.$store.state.songUrl = res.data[0].url
            })
      },
      pause(isPlay) {
        this.isPlay = !this.isPlay
        this.$store.commit('set_playFlag', this.isPlay)
        if (isPlay) {
          this.$refs.audio.pause()
        } else {
          this.$refs.audio.play()
        }
      },
      collection(isCollection) {
        let user = localStorage.user
        if (!user) {
          this.showDialog = true
        } else {
          this.isCollection = !this.isCollection
        }
      },
      changeLoop() {
        this.loop++
        if (this.loop === 4) this.loop = 1
        if (this.loop === 1) {
          this.$toast('已切换成顺序播放')
        }
        if (this.loop === 2) {
          this.$toast('已切换成单曲循环')
        }
        if (this.loop === 3) {
          this.$toast('已切换成随机播放')
        }
      },
      // 切换滑块
      changeSlider(val) {
        this.$store.commit('set_slider', val)
        let duration = this.$refs.audio.duration
        this.$refs.audio.currentTime = duration * (val / 100)
        if (val === 100) {
          if (this.loop === 1) {
            this.currentIndex ++
            this.song = this.songs[this.currentIndex]
            this.getSongUrl()
            this.getAlPic()
          }
          if (this.loop === 2) {
            this.$refs.audio.currentTime = 0
            this.start = '0:00'
            this.$refs.audio.play()
          }
          if (this.loop === 3) {
            this.currentIndex = parseInt(Math.random() * this.songs.length)
            this.song = this.songs[this.currentIndex]
            this.getSongUrl()
            this.getAlPic()
          }
        }
      },
      // 获取专辑封面
      getAlPic() {
        console.log(this.$store.state.song)
        this.$com.req(`api/album?id=${this.$store.state.song.al.id}`).then(res => {
          this.alPic = res.album.picUrl
          this.$store.state.alPic = res.album.picUrl
        })
      },
      // 获取音频时长
      getDuration() {
        let duration = this.$refs.audio.duration
        let m = (duration / 60).toString().substr(0, 1)
        if (m < 10) m = '0' + m
        let s = (duration % 60).toFixed(0)
        if (s < 10) s = '0' + s
        this.duration = `${m}:${s}`
        this.$store.state.duration = duration
      },
      updateTime(e) {
        let currentTime = e.target.currentTime.toFixed(0)
        this.$store.state.currentTime = currentTime
        if (e.target.currentTime > 0) {
          this.$store.commit('set_slider', (e.target.currentTime / this.$store.state.duration) * 100)
        }
        if (currentTime < 10) {
          this.start = '0:0' + currentTime
        }
        if (currentTime >= 10 && currentTime < 60) {
          this.start = '0:' + currentTime
        }
        if (currentTime >= 60) {
          let m = (currentTime / 60).toString().substr(0, 1)
          if (m < 10) m = '0' + m
          let s = (currentTime % 60).toFixed(0)
          if (s < 10) s = '0' + s
          this.start = `${m}:${s}`
        }
        if (e.target.currentTime === this.$store.state.duration) {
          if (this.loop === 1) {
            this.currentIndex ++
            this.song = this.songs[this.currentIndex]
            this.getSongUrl()
            this.getAlPic()
          }
          if (this.loop === 2) {
            this.$refs.audio.currentTime = 0
            this.$refs.audio.play()
            this.start = '0:00'
          }
          if (this.loop === 3) {
            this.currentIndex = parseInt(Math.random() * this.songs.length)
            this.song = this.songs[this.currentIndex]
            this.getSongUrl()
            this.getAlPic()
          }
        }
      },
      // 上一首
      preSong () {
        if (this.currentIndex === 0) {
          this.$toast('已经是第一首啦')
        } else {
          this.currentIndex --
          this.isPlay = true
          this.song = this.songs[this.currentIndex]
          this.getSongUrl()
          this.getAlPic()
        }
      },
      // 下一首
      nextSong () {
        if (this.currentIndex === this.songs.length - 1) {
          this.$toast('已经是最后一首啦')
        } else {
          this.isPlay = true
          this.currentIndex ++
          this.song = this.songs[this.currentIndex]
          this.getSongUrl()
          this.getAlPic()
        }
      },
      confirm () {
        this.$router.push('/login')
      }
    },
    mounted() {
      this.song = this.$route.params.item
      this.$store.state.song = this.$route.params.item
      this.currentIndex = this.$store.state.currentIndex
      this.songs = this.$route.params.songs
      this.$store.state.songs = this.$route.params.songs
      this.getSongUrl()
      this.getAlPic()
      this.$refs.audio.currentTime = this.currentTime
      console.log(this.currentIndex)
    },
    created() {

    },
    filters: {
      toFiexd(val) {
        return val.toString().substr(0, 2)
      }
    },
    computed: {
      detailItem() {
        return this.$store.state.detailItem
      },
      currentTime () {
        return this.$store.state.currentTime
      },
      slider: {
        get () {
          return this.$store.state.slider
        },
        set (val) {

        },
      },
      playFlag () {
        return this.$store.state.playFlag
      }
    },
    watch: {

    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .pause {
    animation-play-state: paused !important;
  }

  .container {
    height: 100vh;
    background: rgba(0, 0, 0, .3);

    .top {
      position: relative;
      top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;

      .t-icon {
        position: absolute;
        left: 40px;
      }

      .t-desc {
        width: 100%;
        text-align: center;

        .songName {
          font-size: 32px;
          color: #fff;
          margin-bottom: 8px;
        }

        .name {
          width: 100%;
          color: #ccc;
          font-size: 28px;
        }
      }
    }

    .i-con {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      top: 100px;

      .img {
        width: 500px;
        height: 500px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: rotate 20s infinite linear;
          position: relative;
        }
      }
    }

    .slider {
      position: relative;
      top: 250px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
      font-size: 28px;

      .slider-item {
        width: 60%;
      }
    }

    .audio {
      margin-top: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .play {
      margin-top: 200px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .p-item {
        width: 60px;
        height: 60px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .p-play {
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
