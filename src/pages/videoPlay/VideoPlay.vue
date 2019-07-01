<template>
  <div class="container">
    <div class="back">
      <div class="icon" @click="$router.back()">
        <van-icon name="arrow-left" size="26px" color="#ccc"></van-icon>
      </div>
      <div class="title">
        视频
      </div>
    </div>
    <div class="video">
      <video autoplay :src="url" controls></video>
    </div>
    <div class="wrapper">
      <div class="w-content">
        <div class="img">
          <img :src="picUrl" alt="">
        </div>
        <div class="name">
          视频: {{name}}
        </div>
        <div class="publishTime">
          发布时间: {{publishTime}}
        </div>
        <div class="description" v-if="description !==''">
          简介: {{description}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "VideoPlay",
    components: {},
    props: {},
    data() {
      return {
        picUrl: '', // 封面
        publishTime: '', // 发行时间
        description: '', // 简介
        name: '', // 名称
        url: '', // 播放路径
      }
    },
    methods: {

    },
    mounted() {
      this.$com.req(`api/video/detail?id=${this.videoId}`).then(res => {
        console.log(res)
        this.picUrl = res.data.coverUrl
        this.publishTime = this.$moment(res.data.publishTime).format('YYYY-MM-DD')
        this.description = res.data.description
        this.name = res.data.title
      })
      this.$com.req(`api/video/url?id=${this.videoId}`).then(res => {
        this.url = res.urls[0].url
        console.log(res)
      })
    },
    created() {

    },
    filters: {},
    computed: {
      videoId() {
        return this.$store.state.videoId
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
      color: #ccc;
    }

    .icon {
      position: absolute;
      left: 40px;
    }
  }
  .video {
    width: 100%;
    height: 420px;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .wrapper {
    margin-top: 100px;
    .w-content {
      height: auto;
      position: relative;
      .publishTime {
        font-size: 32px;
        color: #ccc;
        position: absolute;
        width: 80%;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 40px;
      }
      .description {
        font-size: 32px;
        color: #ccc;
        position: absolute;
        width: 80%;
        top: 30%;
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
        color: #ccc;
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
            color: #ccc;
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
