<template>
  <div id="app">
    <keep-alive include="Singer">
      <router-view></router-view>
    </keep-alive>
    <tabbar v-if="$route.meta.showFooter"></tabbar>
  </div>
</template>

<script>
  import tabbar from './components/tabbar/Tabbar'
  export default {
    name: 'App',
    components: {
      tabbar
    },
    mounted () {
      // 初始化搜索记录
      if (JSON.parse(localStorage.searchArr.length === 0)) {
        let arr = []
        localStorage.setItem('searchArr', JSON.stringify(arr))
      }
    },
    activated () {
      console.log(111)
    }
  }
</script>

<style lang="scss">
  @import "./styles/common";
  .search-text {
    color: skyblue !important;
  }
</style>
