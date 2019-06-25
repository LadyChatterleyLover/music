<template>
  <div>
    <div class="content">
      <div class="flex" v-if="videos.length === 0">无结果</div>
      <div v-else class="item" v-for="(item, index) in videos" :key="index">
        <div class="i-con">
          <div class="img">
            <img :src="item.coverUrl" alt="">
          </div>
          <div class="play">
            <div class="icon">
              <van-icon name="play" color=""></van-icon>
            </div>
            <div>
              <span v-if="item.playTime > 100000">
                {{item.playTime | toFiexd}}万
              </span>
              <span v-else>
                {{item.playTime}}
              </span>
            </div>
          </div>
        </div>
        <div class="desc">
          <div class="name">
            <div class="mv" v-if="item.type === 0">MV</div>
            <div>{{item.title}}</div>
          </div>
          <div class="d-item">
            <div class="time">
              {{item.durationms | fiexd}}
            </div>
            <div class="user">
              <div v-if="index > 0">by&nbsp;</div>
              <div v-for="(item1, index1) in item.creator" :key="index1">
                {{item1.userName}}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="flex">
      <van-loading size="20px" color="#C10D0D" v-if="showLoading">加载中...</van-loading>
    </div>
  </div>

</template>

<script>
  export default {
    name: "MV",
    components: {},
    props: {
      value: {
        type: String
      },
      moreVideos: {
        type: Array
      }
    },
    data() {
      return {
        videos: [],
        showLoading: true
      }
    },
    methods: {},
    mounted() {
      this.$com.req(`api/search?keywords=${this.value}&type=1014&limit=10`)
        .then(res => {
          this.showLoading = false
          if (res.result) {
            this.videos = res.result.videos
          }
        })
    },
    created() {

    },
    filters: {
      fiexd(val) {
        if ((val / 60 / 1000).toString().includes('.')) {
          return '0' + (val / 60 / 1000).toString().substr(0, 1) + ':' + (val / 60 / 1000).toString().substr(2, 2)
        } else {
          return '0' + (val / 60 / 1000).toString().substr(0, 1) + ':' + '00'
        }
      },
      toFiexd (val) {
        return val.toString().substr(0, 2)
      }
    },
    computed: {},
    watch: {
      moreVideos (val) {
        if (val.length > 0) {
          this.showLoading = false
          val.map(item => {
            this.videos.push(item)
          })
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }

  .item {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-top: 20px;
    position: relative;
    .i-con {
      position: relative;
      .img {
        width: 200px;
        height: 120px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .play {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 20px;
        color: #fff;
        .icon {
          position: relative;
          top: 2px;
        }
      }
    }


    .desc {
      margin-left: 20px;
      width: 500px;

      .name {
        font-size: 28px;
        display: flex;
        align-items: center;
        .mv {
          padding:0 8px;
          color: #c10d0d;
          font-size: 24px;
          border: 1px solid #c10d0d;
          margin-right: 10px;
        }
      }

      .d-item {
        color: #ccc;
        display: flex;
        align-items: center;

        .user {
          margin-left: 20px;
          display: flex;
          align-items: center;

        }
      }

    }

    .btn {
      position: absolute;
      right: 40px;
    }
  }
</style>
