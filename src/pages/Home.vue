<template>
  <div>
    <search v-if="showSearch" :showSearch.sync="showSearch"></search>
    <div v-else>
      <header >
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
      <div style="display: flex;justify-content: center;margin-bottom: 10px">
        <van-loading v-if="showLoading">加载中...</van-loading>
      </div>
      <div class="swiper" v-if="!showLoading">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in focus" :key="item.id">
            <img :src="item.pic_info.url" alt="" width="100%">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="nav">
        <div class="nav-item" @click="goTo('/singer')">
          <div class="name">
            歌手
          </div>
          <div class="n-icon">
            <img src="../icons/singer.svg" alt="">
          </div>
        </div>
        <div class="nav-item" @click="goTo('/rank')">
          <div class="name">
            排行
          </div>
          <div class="n-icon">
            <img src="../icons/rank.svg" alt="">
          </div>
        </div>
        <div class="nav-item" @click="goTo('/category')">
          <div class="name">
            分类歌单
          </div>
          <div class="n-icon">
            <img src="../icons/category.svg" alt="">
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
            一起听
          </div>
          <div class="n-icon">
            <img src="../icons/listen.svg" alt="">
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import search from '../components/search/Search'
  export default {
    name: "Home",
    components: {
      search
    },
    props: {},
    data() {
      return {
        showLoading: true, // loading加载
        searchValue: '', // 搜索关键字
        focus: [], // 焦点图
        showSearch: false
      }
    },
    methods: {
      getData () {
        this.$com.req('api/getRecommend').then(response => {
          let res = response.response
          if (res) {
            this.showLoading = false
            this.focus = res.focus.data.content
          }
        })
      },
      goTo (path) {
        this.$router.push(path)
      },
      onSearch () {

      },
      onFocus () {
        this.showSearch = true
      },
      listen () {
        this.$toast('听歌识曲功能敬请期待')
      }
    },
    mounted() {
      this.getData()
      // 初始化搜索记录
      let arr = []
      localStorage.setItem('searchArr', JSON.stringify(arr))
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