<template>
  <div>
    <div class="content">
      <div class="flex" v-if="singer.length === 0">无结果</div>
      <div v-else v-for="(item, index) in singer" :key="index" class="item" @click="goDetail(item)">
        <div class="img">
          <img :src="item.img1v1Url" alt="">
        </div>
        <div class="name" v-html="item.name"></div>
        <div class="alias">
          <div v-for="(item1, index1) in item.alias" :key="index1">
            ({{item1}})
          </div>
        </div>
      </div>
    </div>
    <div class="flex" v-if="singer.length > 10">
      <van-loading size="20px" color="#C10D0D" v-if="showLoading">加载中...</van-loading>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Singger",
    components: {},
    props: {
      value: {
        type: String
      },
      moreSinggers: {
        type: Array
      }
    },
    data() {
      return {
        singer: [],
        showLoading: true
      }
    },
    methods: {
      goDetail(item) {
        this.$store.state.singerId = item.id
        this.$store.state.singName = item.name.substr(26, 3)
        this.$store.state.singer = item
        this.$router.push({name: 'singerPlay', params: {item: item}})
      }
    },
    mounted() {
      this.$com.req(`api/search?keywords=${this.value}&type=100&limit=10`)
        .then(res => {
          this.singer = res.result.artists
          this.showLoading = false
          this.singer.map(item => {
            let replaceReg = new RegExp(this.value, 'g')
            let replaceString = '<span class="search-text">' + this.value + '</span>'
            item.name = item.name.replace(replaceReg, replaceString)
          })
        })
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
      moreSinggers (val) {
        if (val.length > 0) {
          this.showLoading = false
          val.map(item => {
            item.id = Math.floor(item.id + Math.random() * 100000)
            this.singer.push(item)
          })
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
  .item {
    display: flex;
    align-items: center;
    margin: 40px;
    .img {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      margin-left: 20px;
    }
    .alias {
      margin-left: 10px;
    }
  }
</style>
