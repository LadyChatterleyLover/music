<template>
  <div id="app">
    <div>
      <keep-alive include="Singer">
        <router-view></router-view>
      </keep-alive>
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
      if (!localStorage.searchArr) {
        let arr = []
        localStorage.setItem('searchArr', JSON.stringify(arr))
      }
    }
  }
</script>

<style lang="scss">
  @import "./styles/common";
  .body,.html {
    height: 100vh;
  }
  .search-text {
    color: skyblue !important;
  }
</style>
