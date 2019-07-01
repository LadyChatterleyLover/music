<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <search v-if="showSearch" :showSearch.sync="showSearch"></search>
      <div v-else>
        <header>
          <h2>
            音乐馆
          </h2>
          <div class="search">
            <van-search
              class="home__input"
              v-model="searchValue"
              placeholder="搜索"
              show-action
              shape="round"
              @search="onSearch"
              @focus="onFocus"
            >
              <div slot="action" @click="onSearch" class="icon">
                <img src="../icons/music2.svg" alt="" width="24" height="24" @click="listen">
              </div>
            </van-search>
          </div>
        </header>
        <div class="load">
          <van-loading v-if="showLoading">加载中...</van-loading>
        </div>
        <div class="swiper" v-if="!showLoading">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in focus" :key="item.id">
              <img :src="item.pic" alt="" width="100%">
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="nav">
          <div class="nav-item" @click="goTo('/singer')">
            <div class="name">
              每日推荐
            </div>
            <div class="n-icon">
              <img src="../icons/rili.svg" alt="">
            </div>
          </div>
          <div class="nav-item" @click="goTo('/rank')">
            <div class="name">
              歌单
            </div>
            <div class="n-icon">
              <img src="../icons/song.svg" alt="">
            </div>
          </div>
          <div class="nav-item" @click="goTo('/category')">
            <div class="name">
              排行榜
            </div>
            <div class="n-icon">
              <img src="../icons/rank.svg" alt="">
            </div>
          </div>
          <div class="nav-item" @click="goTo('/radio')">
            <div class="name">
              电台
            </div>
            <div class="n-icon">
              <img src="../icons/radio.svg" alt="">
            </div>
          </div>
          <div class="nav-item" @click="goTo('/listen')">
            <div class="name">
              直播
            </div>
            <div class="n-icon">
              <img src="../icons/zhibo.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div v-if="!showSearch">
        <card title="推荐歌单" :content="rankList" desc="歌单广场"></card>
        <card :title="newList" :content="moreList" desc="更多新碟"></card>
        <card title="音乐新势力" :content="newMusic" desc="新音乐"></card>
        <card title="推荐电台" :content="djArr" desc="电台广场"></card>
        <card title="推荐节目" :content="recommend" desc="更多节目"></card>
      </div>
    </div>
  </div>

</template>

<script>
  import card from '../components/home/Card'
  import search from '../components/search/Search'

  export default {
    name: "Home",
    components: {
      search,
      card
    },
    props: {},
    data() {
      return {
        showLoading: true, // loading加载
        searchValue: '', // 搜索关键字
        focus: [], // 焦点图
        showSearch: false,
        newList: ['新碟', '新歌'],
        rankList: [], // 推荐歌曲
        newAlbum: [], // 新碟
        newSong: [], // 新歌
        moreList: [],
        newMusic: [], // 新音乐
        djArr: [], // 推荐电台
        recommend: [], // 推荐节目
      }
    },
    methods: {
      getData() {
        this.$com.req('api/banner?type=2').then(res => {
          if (res) {
            this.showLoading = false
            this.focus = res.banners
          }
        })
      },
      getRank() {
        this.$com.req('api/personalized').then(res => {
          this.rankList = res.result
        })
      },
      getAlbum() {
        this.$com.req('api/album/newest').then(res => {
          this.newAlbum = res.albums
          this.moreList.push(this.newAlbum)
        })
      },
      getSong() {
        this.$com.req('api/top/song?type=7').then(res => {
          this.newSong = res.data
          this.moreList.push(this.newSong)
        })
      },
      getNewMusic() {
        this.$com.req('api/personalized/newsong').then(res => {
          this.newMusic = res.result
        })
      },
      getDJ() {
        this.$com.req('api/personalized/djprogram').then(res => {
          this.djArr = res.result
        })
      },
      getRecommend() {
        this.$com.req('api/program/recommend').then(res => {
          this.recommend = res.programs
        })
      },
      goTo(path) {
        this.$router.push(path)
      },
      onSearch() {

      },
      onFocus() {
        this.showSearch = true
      },
      listen() {
        this.$toast('听歌识曲功能敬请期待')
      }
    },
    mounted() {
      this.getData()
      this.getRank()
      this.getAlbum()
      this.getSong()
      this.getNewMusic()
      this.getDJ()
      this.getRecommend()
      let wrapper = this.$refs.wrapper
      this.$nextTick(() => {
        new this.$BScroll(wrapper, {
          click: true,
          probeType: 3
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

  .load {
    display: flex;
    justify-content: center;
    margin-bottom: 10px
  }

  header {
    display: flex;
    align-items: center;
    padding-left: 50px;

    .search {
      margin-left: 20px;
    }

    h2 {
      width: 128px;
    }

    .icon {
      margin-left: 20px;
      position: relative;
      top: 10px;
      left: -10px;
    }
  }

  .swiper {
    margin: 20px;

    img {
      border-radius: 8px;
    }
  }

  .nav {
    display: flex;
    align-items: center;
    margin-top: 40px;

    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .n-icon {
        width: 50px;
        height: 50px;
        margin-top: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
