<template>
  <div>
    <div ref="wrapper" class="wrapper">
      <div class="w-content" :class="{pad: active !== 0}">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="name">
            {{item.name}}
          </div>
        </div>
        <div class="flex">
          <van-loading size="20px" color="#C10D0D" v-if="showLoading">加载中...</van-loading>
        </div>
      </div>
    </div>
    <div class="l-container">
      <div class="letter" ref="letter" v-if="active > 0">
        <div class="l-content" ref="tabContent">
          <div class="l-item" v-for="(item, index) in letters" ref="tabItem" :key="index"
               :class="{active: index === activeIndex}">
            <div @click="clickItem(item, index)">
              <div>
                {{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "SingerList",
    components: {},
    props: {
      list: {
        type: Array
      },
      cat: {
        type: Number
      },
      active: {
        type: Number
      }
    },
    data() {
      return {
        letters: ['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
          'L', 'M', 'N', 'O', "P", 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ],
        activeIndex: 0,
        showLoading: true,
        offset: 1, // 请求数据分页偏移量
        limit: 10, // 每页多少条数据
        activeLetter: '热',

      }
    },
    methods: {
      clickItem(item, index) {
        this.activeIndex = index
        this.activeLetter = item
        if (item !== '热') {
          this.$com.req(`api/artist/list?cat=${this.cat}&initial=${item}&limit=${this.limit}`)
            .then(res => {
              this.$emit('update:list', res.artists)
            })
        } else {
          this.$com.req(`api/artist/list?cat=${this.cat}&limit=${this.limit}`)
            .then(res => {
              this.$emit('update:list', res.artists)
            })
        }
      },
      getMoreData () {
        this.$com.req(`api/artist/list?cat=${this.cat}&limit=${this.limit}&offset=${this.offset*this.limit}`)
          .then(res => {
            if (res.artists.length > 0) {
              this.showLoading = false
              this.offset ++
              let arr = this.list
              res.artists.map(item => {
                arr.push(item)
              })
              this.$emit('update:list', arr)
              this.wrapperScroll.finishPullUp()
              this.wrapperScroll.refresh()
            }
          })
      }
    },
    mounted() {
      this.$com.req(`api/artist/list?cat=${this.cat}&limit=${this.limit}`).then(res => {
        let arr = res.artists
        this.$emit('update:list', arr)
      })
      this.$nextTick(() => {
        let wrapper = this.$refs.wrapper
        this.wrapperScroll = new this.$BScroll(wrapper, {
          click: true,
          probeType: 3,
          pullUpLoad: {
            threshold: -20 // 当上拉距离超过30px时触发 pullingUp 事件
          }
        })
        this.wrapperScroll.on('pullingUp', () => {
          this.getMoreData()
        })
        this.wrapperScroll.on('scroll', (pos) => {
          if (Math.abs(pos.y) > 34) {

          }
        })
        if (this.active !== 0) {
          let letter = this.$refs.letter
          let width = 0
          for (let i = 0; i < this.letters.length; i++) {
            width += this.$refs.tabItem[1].getBoundingClientRect().width
          }
          this.$refs.tabContent.style.width = width + 40 + 'px'
          this.letterScroll = new this.$BScroll(letter, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
          })
        }
      })
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .wrapper {
    height: 1100px;
    overflow: hidden;

    .w-content {
      margin-top: 20px;
      padding-top: 20px;

      .title {
        color: #ccc;
        font-size: 28px;
        background: #eee;
        height: 60px;
        line-height: 60px;
        padding-left: 40px;
      }

      .item {
        display: flex;
        align-items: center;
        margin: 20px 40px;

        .img {
          width: 120px;
          height: 120px;
          margin-right: 40px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .name {
          font-size: 26px;
        }
      }
    }
  }
  .l-container {
    box-shadow: 6px 6px 6px #fff;
    background: #fff;
    z-index: 9999;
    position: fixed;
    top: 0;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    padding-top: 30px;
    .letter {
      margin-left: 40px;
      position: relative;
      top: -10px;
      .l-content {
        display: flex;
        align-items: center;
        .l-item {
          margin: 6px 0;
          padding: 4px 8px;
          text-align: center;
          &:nth-child(2) {
            margin-left: 6px;
          }
        }
      }

    }
  }


  .active {
    background: #c10d0d;
    color: #fff;
  }

  .pad {
    padding-top: 120px !important;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
</style>
