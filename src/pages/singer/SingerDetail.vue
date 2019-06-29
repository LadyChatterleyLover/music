<template>
  <div class="container" >
      <div class="top">
        <div class="icon" @click="back">
          <van-icon name="arrow-left" size="20px"></van-icon>
        </div>
        <div class="name">
          {{detailItem.name}}
        </div>
      </div>
      <div class="img">
        <img :src="detailItem.picUrl" alt="">
        <div class="play">
          <div class="p-icon">
            <van-icon name="play-circle-o" size="16px"></van-icon>
          </div>
          <div class="p-desc" @click="playAll">
            随机播放全部
          </div>
        </div>
      </div>
      <div class="content" ref="wrapper">
        <div class="w-content">
          <div class="c-item" v-for="(item, index) in songs" :key="index">
            <div class="c-name">
              {{item.name}}
            </div>
            <div class="al" @click="goToPlay(item, index)">
              <div v-for="(item1, index1) in item.ar" :key="index1" class="a-name">
                {{item1.name}} <span v-if="index1 !== item.ar.length - 1">/</span>
                <span v-if="index1 === item.ar.length - 1">·&nbsp;</span>
              </div>
              <div class="al-name">
                {{item.al.name}}
              </div>
            </div>
            <div class="c-icon">
              <van-icon name="play-circle-o" size="18px"></van-icon>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
  export default {
    name: "SingerDetail",
    components: {},
    props: {},
    data() {
      return {
        songs: []
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      goToPlay(item, index) {
        this.$store.commit('set_currentIndex', index)
        this.$router.push({name: 'player', params: {item: item,index: index, songs: this.songs}})
      },
      playAll () {
        let index = parseInt(Math.random() * this.songs.length)
        this.$store.state.currentIndex = index
        let item = this.songs[index]
        this.$router.push({name: 'player', params: {item: item,index: index, songs: this.songs}})
      }
    },
    mounted() {
      this.$com.req(`api/artists?id=${this.detailItem.id}`).then(res => {
        this.songs = res.hotSongs
      })
      this.$nextTick(() => {
        let wrapper = this.$refs.wrapper
        this.wrapperScroll = new this.$BScroll(wrapper, {
          click: true
        })
      })
    },
    created() {

    },
    filters: {},
    computed: {
      detailItem () {
        return this.$store.state.detailItem
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .container {
    padding-top: 20px;
    overflow: hidden;
    .top {
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      .icon {
        position: absolute;
        left: 80px;
        top: 4px;
      }
      .name {
        font-size: 32px;
      }
    }
    .img {
      margin-top: 40px;
      margin-bottom: 40px;
      width:100%;
      height:400px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .play {
        width: 400px;
        height: 50px;
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 40px;
        border-radius: 20px;
        background: #eee;
        left: 174px;
        .p-icon {
          display: flex;
          align-items: center;
          margin-right: 40px;
          margin-left: 80px;
          position: relative;
          top: 2px;
        }
      }
    }
    .content {
      padding-top: 60px;
      padding-left: 60px;
      height: 700px;
      overflow: hidden;
      .w-content {
        .c-item {
          margin: 20px 0;
          position: relative;
          .c-name {
            font-size: 28px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 80%;
          }
          .al {
            display: flex;
            align-items: center;
            width: 90%;
            .a-name, .al-name {
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            color: #ccc;
          }
          .c-icon {
            position: absolute;
            right: 40px;
            top: 16px;
          }
        }
      }
    }
  }

</style>
