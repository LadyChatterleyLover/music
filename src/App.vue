<template>
  <div id="app">
    <div>
      <keep-alive include="Singer">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="foot" v-if="$store.state.isFoot && $route.path !== 'player'">
      <player-footer ></player-footer>
    </div>
    <tabbar v-if="$route.meta.showFooter"></tabbar>
  </div>
</template>

<script>
  import playerFooter from './pages/playerFooter/PlayerFooter'
  import tabbar from './components/tabbar/Tabbar'

  export default {
    name: 'App',
    components: {
      tabbar,
      playerFooter
    },
    mounted() {
      // 初始化搜索记录
      if (JSON.parse(localStorage.searchArr.length === 0)) {
        let arr = []
        localStorage.setItem('searchArr', JSON.stringify(arr))
      }
    }
  }
</script>

<style lang="scss">
  @import "./styles/common";

  .search-text {
    color: skyblue !important;
  }

  .foot {
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 999;
  }
</style>
