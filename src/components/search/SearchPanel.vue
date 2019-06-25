<template>
  <div class="home">
    <div class="content">
      <div class="value" @click="search(value)">
        搜索 "{{value}}"
      </div>
      <div class="line"></div>
      <div v-for="(item, index) in searchRank" :key="item.keyword" >
        <div class="item" @click="search(item)">
          <div class="search">
            <van-icon name="search"></van-icon>
          </div>
          <div>
            {{item.keyword}}
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "SearchPanel",
    components: {},
    props: {
      searchRank: {
        type: Array
      },
      value: {
        type: String
      }
    },
    data() {
      return {
        searchSongs: []
      }
    },
    methods: {
      search (item) {
        if (typeof item === 'object') {
          this.$com.req(`api/search?keywords=${item.keyword}&limit=10`)
            .then(res => {
              this.searchSongs = res.result.songs
              this.$router.push({name: 'searchList', params: {searchSongs: this.searchSongs, searchValue:item.keyword}})
            })
          let obj = {
            name: item.keyword
          }
          let arr = JSON.parse(localStorage.searchArr)
          arr.push(obj)
          arr = this.$lodash.unionBy(arr, 'name')
          localStorage.setItem('searchArr', JSON.stringify(arr))
        } else {
          this.$com.req(`api/search?keywords=${item}`)
            .then(res => {
              this.searchSongs = res.result.songs
              this.$router.push({name: 'searchList', params: {searchSongs: this.searchSongs, searchValue:item}})
            })
          let obj = {
            name: item
          }
          let arr = JSON.parse(localStorage.searchArr)
          arr.push(obj)
          arr = this.$lodash.unionBy(arr, 'name')
          localStorage.setItem('searchArr', JSON.stringify(arr))
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
    directives: {}
  }
</script>

<style scoped lang="scss">
  .content {
    .value {
      color: skyblue;
      margin-left: 40px;
    }
    .line {
      background: #eee;
      width: 100%;
      height: 2px;
      margin: 10px 0;
    }
    .item {
      display: flex;
      align-items: center;
      margin:20px 40px;
      .search {
        margin-right: 20px;
      }
    }
  }
</style>
