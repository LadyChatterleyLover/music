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
        <img :src="detailItem.picUrl" alt="">
      </div>
    </div>
    <div>
      <audio :src="url" autoplay></audio>
    </div>
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
        url: ''
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      getSongUrl () {
        this.$com.req(`api/song/url?id=${this.song.id}`)
          .then(res => {
            this.url = res.data[0].url
          })
      }
    },
    mounted() {
      this.song = this.$route.params.item
      this.getSongUrl()
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
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .container {
    height: 100vh;
    background: rgba(0,0,0,.3);
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
        width: 600px;
        height: 600px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: rotate 16s infinite linear;
        }
      }
    }

  }
</style>
