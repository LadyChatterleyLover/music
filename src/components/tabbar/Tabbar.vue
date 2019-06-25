<template>
  <div>
    <van-tabbar
            v-model="active"
            active-color="#c10d0d"
            inactive-color="#000"
    >
      <van-tabbar-item
              icon="home-o"
              replace
              to="/home">
        首页
      </van-tabbar-item>
      <van-tabbar-item
              icon="service-o"
              replace
              to="/singer"
      >
        歌手
      </van-tabbar-item>
      <van-tabbar-item
              icon="user-o"
              replace
              to="/me">
        我的
      </van-tabbar-item>

    </van-tabbar>
  </div>

</template>

<script>
  export default {
    name: "tabbar",
    components: {},
    props: {},
    data() {
      return {
        active: 0
      }
    },
    methods: {},
    mounted() {

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

</style>
