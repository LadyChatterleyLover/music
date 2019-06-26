<template>
  <div>
    <van-tabs v-model="active" :animated="true" :ellipsis="false" :sticky="true" @click="clickTab">
      <van-tab title="入驻歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===0"></singer-list>
      </van-tab>
      <van-tab title="华语男歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===1"></singer-list>
      </van-tab>
      <van-tab title="华语女歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===2"></singer-list>
      </van-tab>
      <van-tab title="华语组合/乐队">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===3"></singer-list>
      </van-tab>
      <van-tab title="欧美男歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===4"></singer-list>
      </van-tab>
      <van-tab title="欧美女歌手 ">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===5"></singer-list>
      </van-tab>
      <van-tab title="欧美组合">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===6"></singer-list>
      </van-tab>
      <van-tab title="日本男歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===7"></singer-list>
      </van-tab>
      <van-tab title="日本女歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===8"></singer-list>
      </van-tab>
      <van-tab title="日本组合/乐队">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===9"></singer-list>
      </van-tab>
      <van-tab title="韩国男歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===10"></singer-list>/van-tab>
      </van-tab>
      <van-tab title="韩国女歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===11"></singer-list>/van-tab>
      </van-tab>
      <van-tab title="韩国组合/乐队">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===12"></singer-list>
      </van-tab>
      <van-tab title="其他男歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===13"></singer-list>
      </van-tab>
      <van-tab title="其他女歌手">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===14"></singer-list>
      </van-tab>
      <van-tab title="其他组合">
        <singer-list :list.sync="singers" :cat="cat" :active="active" v-if="active===15"></singer-list>
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
  import singerList from '../../components/singer/SingerList'
  export default {
    name: "Singer",
    components: {
      singerList
    },
    props: {},
    data() {
      return {
        active: 0,
        cat: 5001, // 歌手类型
        singers: [], // 入驻歌手
        offset: 1, // 请求数据分页偏移量
        limit: 10, // 每页多少条数据
      }
    },
    methods: {
      clickTab (index) {
        if (index === 0) {
          this.cat = 5001
        }
        if (index === 1) {
          this.cat = 1001
        }
        if (index === 2) {
          this.cat = 1002
        }
        if (index === 3) {
          this.cat = 1003
        }
        if (index === 4) {
          this.cat = 2001
        }
        if (index === 5) {
          this.cat = 2002
        }
        if (index === 6) {
          this.cat = 2003
        }
        if (index === 7) {
          this.cat = 6001
        }
        if (index === 8) {
          this.cat = 6002
        }
        if (index === 9) {
          this.cat = 6003
        }
        if (index === 10) {
          this.cat = 7001
        }
        if (index === 11) {
          this.cat = 7002
        }
        if (index === 12) {
          this.cat = 7003
        }
        if (index === 13) {
          this.cat = 4001
        }
        if (index === 14) {
          this.cat = 4002
        }
        if (index === 15) {
          this.cat = 4003
        }
      }
    },
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {},
  }
</script>

<style scoped lang="scss">

</style>
