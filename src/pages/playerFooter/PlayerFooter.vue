<template>
  <div class="container">
    <div class="img">
      <img :src="alPic" alt="" :class="{pause: isPlay === false }">
    </div>
    <div class="top">
      <div class="t-desc">
        <div class="songName">
          {{song.name}}
        </div>
        <div class="name">
          {{detailItem.name}}
        </div>
      </div>
    </div>
    <div class="p-item" @click="pause(isPlay)">
      <van-icon name="pause-circle-o" size="35px" v-if="playFlag"></van-icon>
      <van-icon name="play-circle-o" size="35px" v-else></van-icon>
    </div>
    <div class="dian" @click="goToPlay">
      <van-icon name="ellipsis" size="35px" color="#000"></van-icon>
    </div>
    <div class="audio">
      <audio :src="songUrl" autoplay ref="audio" @timeupdate="updateTime"></audio>
    </div>
  </div>

</template>

<script>
  export default {
    name: "PlayerFooter",
    components: {},
    props: {},
    data() {
      return {
        isPlay: true
      }
    },
    methods: {
      pause(isPlay) {
        this.isPlay = !this.isPlay
        this.$store.commit('set_playFlag', this.isPlay)
        if (!isPlay) {
          this.$refs.audio.pause()
        } else {
          this.$refs.audio.play()
        }
      },
      goToPlay () {
        this.$store.state.isFoot = false
        this.$router.push({name: 'player', params: {item: this.song,index: this.currentIndex, songs: this.songs, currentTime: this.currentTime}})
      },
      updateTime (e) {
        // console.log(e.target.currentTime)
        // console.log(this.$store.state.duration)
        let currentTime = e.target.currentTime
        this.$store.commit('set_currentTime', currentTime)
        let val = this.currentTime / this.$store.state.duration
        // console.log(val)
        this.$store.commit('set_slider', val)
      }
    },
    mounted() {
      this.isPlay = this.playFlag
      if (!this.playFlag) {
        this.$refs.audio.play()
        this.$refs.audio.currentTime = this.currentTime
      } else {
        this.$refs.audio.pause()
      }
    },
    created() {

    },
    filters: {},
    computed: {
      song() {
        return this.$store.state.song
      },
      detailItem() {
        return this.$store.state.detailItem
      },
      alPic() {
        return this.$store.state.alPic
      },
      songUrl () {
        return this.$store.state.songUrl
      },
      playFlag () {
        return this.$store.state.playFlag
      },
      songs () {
        return this.$store.state.songs
      },
      song () {
        return this.$store.state.song
      },
      currentIndex () {
        return this.$store.state.currentIndex
      },
      currentTime () {
        return this.$store.state.currentTime
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    box-shadow: 6px 6px 6px;
    background: #fff;
    padding-left: 40px;
    position: relative;
    .top {
      margin-left: 40px;
      .songName {
        font-size: 28px;
      }
      .name {
        color: #ccc;
      }
    }
    .img {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .p-item {
      width: 60px;
      height: 60px;
      position: absolute;
      right: 170px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .dian {
      position: absolute;
      right: 60px;
    }
  }
</style>