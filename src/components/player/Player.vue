<template>
  <div class="player" v-if="playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      播放器
    </div>
    <div class="mini-player" v-show="!fullScreen">

    </div>
  </div>

</template>

<script>
  export default {
    name: "Player",
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {
      fullScreen () {
        return this.$store.state.fullScreen
      },
      playList () {
        return this.$store.state.playList
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: #222;

      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(40px);
      }

      .top {
        position: relative;
        margin-bottom: 50px;

        .back {
          position: absolute;
          top: 0;
          left: 12px;
          z-index: 50;

          .icon-back {
            display: block;
            padding: 18px;
            font-size: 44px;
            color: #ffcd32;
            transform: rotate(-90deg)
          }
        }

        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 80px;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 36px;
          color: #fff;
        }

        .subtitle {
          line-height: 40px;
          text-align: center;
          font-size: 28px;
          color: #fff;
        }
      }

      .middle {
        position: fixed;
        width: 100%;
        top: 160px;
        bottom: 320px;
        white-space: nowrap;
        font-size: 0;

        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;

          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;

            .cd {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 20px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;

              &.play {
                animation: rotate 20s linear infinite
              }

              &.pause {
                animation-play-state: paused
              }

              .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }

          .playing-lyric-wrapper {
            width: 80%;
            margin: 60px auto 0 auto;
            overflow: hidden;
            text-align: center;

            .playing-lyric {
              height: 40px;
              line-height: 20px;
              font-size: 28px;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }

        .middle-r {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;

          .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;

            .text {
              line-height: 64px;
              color: rgba(255, 255, 255, 0.5);
              font-size: 28px;

              &.current {
                color: #fff;
              }
            }
          }
        }
      }

      .bottom {
        position: absolute;
        bottom: 100px;
        width: 100%;

        .dot-wrapper {
          text-align: center;
          font-size: 0;

          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 8px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);

            &.active {
              width: 40px;
              border-radius: 10px;
              background: rgba(255, 255, 255, 0.8);
            }
          }
        }

        .progress-wrapper {
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0 auto;
          padding: 20px 0;

          .time {
            color: #fff;
            font-size: 24px;
            flex: 0 0 60px;
            line-height: 60px;
            width: 60px;

            &.time-l {
              text-align: center;
            }

            &.time-r {
              text-align: right;
            }
          }

          .progress-bar-wrapper {
            flex: 1
          }
        }

        .operators {
          display: flex;
          align-items: center;

          .icon {
            flex: 1;
            color: #ffcd32;

            &.disable {
              color: rgba(255, 205, 49, 0.5);
            }

            i {
              font-size: 60px
            }
          }

          .i-left {
            text-align: right;
          }

          .i-center {
            text-align: center;
            padding: 0 40px;

            i {
              font-size: 80px;
            }
          }

          .i-right {
            text-align: left;
          }

          .icon-favorite {
            color: #d93f30;
          }
        }
      }

      &.normal-enter-active, &.normal-leave-active {
        transition: all 0.4s;

        .top, .bottom {
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        }
      }

      &.normal-enter, &.normal-leave-to {
        opacity: 0;

        .top {
          transform: translate3d(0, -100px, 0);
        }

        .bottom {
          transform: translate3d(0, 100px, 0)
        }
      }
    }

    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 120px;
      background: #333;

      &.mini-enter-active, &.mini-leave-active {
        transition: all 0.4s;
      }

      &.mini-enter, &.mini-leave-to {
        opacity: 0;
      }

      .icon {
        flex: 0 0 80px;
        width: 80px;
        padding: 0 20px 0 40px;

        img {
          border-radius: 50%;
        }

        &.play {
          animation: rotate 10s linear infinite
        }

        &.pause {
          animation-play-state: paused;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 40px;
        overflow: hidden;

        .name {
          margin-bottom: 4px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 28px;
          color: #fff;
        }

        .desc {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.3);
        }
      }

      .control {
        flex: 0 0 60px;
        width: 60px;
        padding: 0 20px;

        .icon-play-mini, .icon-pause-mini, .icon-playlist {
          font-size: 60px;
          color: rgba(255, 255, 255, 0.3);
        }

        .icon-mini {
          font-size: 64px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }

</style>
