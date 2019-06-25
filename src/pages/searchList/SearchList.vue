<template>
  <div class="wrapper" ref="wrapper">
    <div class="w-content">
      <div class="top">
        <div class="t-icon" @click="back">
          <van-icon name="arrow-left" size="20px"></van-icon>
        </div>
        <div class="t-search">
          <van-search v-model="value"></van-search>
        </div>
      </div>
      <div class="container">
        <van-tabs v-model="active" :swipeable="true" :animated="true" >
          <van-tab title="单曲">
            <div class="content">
              <div class="all">
                <van-icon name="play-circle-o" size="18px"></van-icon>
                <div>播放全部</div>
              </div>
              <div class="item" v-for="(item, index) in searchSongs" :key="index">
                <div>
                  <div class="name">
                    {{item.name}}
                  </div>
                  <div class="i-desc">
                    <div v-for="(item1, index1) in item.artists" :key="index1" class="d-name">
                      <span v-html="item1.name"></span>&nbsp;<span v-if="index1 !== item.artists.length - 1">/&nbsp;</span>
                    </div>
                    <div class="i-name">
                      &nbsp;- {{item.album.name}}
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <van-icon name="play-circle-o" size="18px"></van-icon>
                </div>
              </div>
              <div class="flex">
                <van-loading size="20px" color="#C10D0D" v-if="showLoading">加载中...</van-loading>
              </div>
            </div>
          </van-tab>
          <van-tab title="专辑">
            <album :value="value" :moreAlbums="moreAlbums"></album>
          </van-tab>
          <van-tab title="歌手">
            <singer :value="value" :moreSinggers="moreSinggers"></singer>
          </van-tab>
          <van-tab title="歌单">
            <sheet :value="value" :moreSheets="moreSheets"></sheet>
          </van-tab>
          <van-tab title="用户">
            <user :value="value" :moreUsers="moreUsers"></user>
          </van-tab>
          <van-tab title="视频">
            <mv :value="value" :moreVideos="moreVideos"></mv>
          </van-tab>
          <van-tab title="电台">
            <radios :value="value" :moreRadios="moreRadios"></radios>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>

</template>

<script>
  import album from '../../components/search/Album'
  import singer from '../../components/search/Singger'
  import sheet from '../../components/search/Sheet'
  import user from '../../components/search/Users'
  import mv from '../../components/search/Videos'
  import radios from '../../components/search/Radio'
  export default {
    name: "SearchList",
    components: {
      album,
      singer,
      sheet,
      user,
      mv,
      radios
    },
    props: {},
    data() {
      return {
        active: 0,
        value: '',
        searchSongs: [], // 搜索结果
        scroll: null, // 滚动对象
        offset: 1, // 请求数据分页偏移量
        limit: 10, // 每页多少条数据
        showLoading: true,
        moreAlbums: [], // 更多专辑
        moreSinggers: [], //更多歌手
        moreSheets: [], // 更多歌单
        moreUsers: [], // 更多用户
        moreVideos: [], // 更多mv
        moreRadios: [], // 更多电台
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      getMoreSongs () {
        this.$com.req(`api/search?keywords=${this.value}&limit=${this.limit}&offset=${this.offset*this.limit}`)
          .then(res => {
            let result = res.result.songs
            if (result.length > 0) {
              this.showLoading = false
              this.offset ++
              result.map((item => {
                this.searchSongs.push(item)
                this.scroll.finishPullUp()
                this.scroll.refresh()
              }))
            }
          })
      },
      getMoreAlbums () {
        this.$com.req(`api/search?keywords=${this.value}&limit=${this.limit}&offset=${this.offset*this.limit}&type=10`)
          .then(res => {
            let result = res.result.albums
            if (result.length > 0) {
              this.showLoading = false
              this.offset ++
              result.map((item => {
                this.moreAlbums.push(item)
                this.scroll.finishPullUp()
                this.scroll.refresh()
              }))
            }
          })
      },
      getMoreSingger () {
        this.$com.req(`api/search?keywords=${this.value}&limit=${this.limit}&offset=${this.offset*this.limit}&type=100`)
          .then(res => {
            let result = res.result.artists
            if (result.length > 0) {
              this.showLoading = false
              this.offset ++
              result.map((item => {
                this.moreSinggers.push(item)
                this.scroll.finishPullUp()
                this.scroll.refresh()
              }))
            }
          })
      },
      getMoreSheets () {
        this.$com.req(`api/search?keywords=${this.value}&limit=${this.limit}&offset=${this.offset*this.limit}&type=1000`)
          .then(res => {
            let result = res.result.playlists
            if (result.length > 0) {
              this.showLoading = false
              this.offset ++
              result.map((item => {
                this.moreSheets.push(item)
                this.scroll.finishPullUp()
                this.scroll.refresh()
              }))
            }
          })
      },
      getMoreUsers () {
        this.$com.req(`api/search?keywords=${this.value}&limit=${this.limit}&offset=${this.offset*this.limit}&type=1002`)
          .then(res => {
            let result = res.result.userprofiles
            if (result.length > 0) {
              this.showLoading = false
              this.offset ++
              result.map((item => {
                this.moreUsers.push(item)
                this.scroll.finishPullUp()
                this.scroll.refresh()
              }))
            }
          })
      },
      getMoreVideos () {
        this.$com.req(`api/search?keywords=${this.value}&limit=${this.limit}&offset=${this.offset*this.limit}&type=1014`)
          .then(res => {
            let result = res.result.videos
            if (result.length > 0) {
              this.showLoading = false
              this.offset ++
              result.map((item => {
                this.moreVideos.push(item)
                this.scroll.finishPullUp()
                this.scroll.refresh()
              }))
            }
          })
      }
    },
    mounted() {
      this.searchSongs = this.$route.params.searchSongs
      this.value = this.$route.params.searchValue
      this.searchSongs.map(item => {
        item.artists.map(item1 => {
          let replaceReg = new RegExp(this.value, 'g');
          let replaceString = '<span class="search-text">' + this.value + '</span>';
          item1.name = item1.name.replace(replaceReg, replaceString);
        })
      })
      this.$nextTick(() => {
        let wrapper = this.$refs.wrapper
        this.scroll = new this.$BScroll(wrapper, {
          click: true,
          probeType: 3,
          pullUpLoad: {
            threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
          }
          })
        this.scroll.on('pullingUp', () => {
          if (this.active === 0) {
            this.getMoreSongs()
          }
          if (this.active === 1) {
            this.getMoreAlbums()
          }
          if (this.active === 2) {
            this.getMoreSingger()
          }
          if (this.active === 3) {
            this.getMoreSheets()
          }
          if (this.active === 4) {
            this.getMoreUsers()
          }
          if (this.active === 5) {
            this.getMoreVideos()
          }
        })
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
    height: 100vh;
    overflow: hidden;

    .w-content {
      height: auto;
    }
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    .t-icon {
      margin-left: 20px;
    }
    .t-search {
      flex: 2;
    }
  }
  .content {
    margin-top: 40px;
    .all {
      display: flex;
      align-items: center;
      margin-left: 20px;
      div {
        margin-left: 20px;
        font-size: 28px;
      }
    }
    .item {
      display: flex;
      align-items: center;
      position: relative;
      margin: 20px;
      .icon {
        position: absolute;
        right: 40px;
        top: 30px;
      }
      .name {
        margin: 10px 0;
        font-size: 28px;
      }
      .i-desc {
        display: flex;
        align-items: center;
        color: #ccc;
        .d-desc {
          /*display: flex;*/
          /*align-items: center;*/
        }
        .i-name {

        }
      }
    }
  }
</style>
