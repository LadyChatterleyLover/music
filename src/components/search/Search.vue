<template>
  <div class="search">
    <div>
      <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
      ></van-search>
      <search-list v-if="showList && flag && showValue" :searchList="searchList" :recommend="recommend"></search-list>
      <div v-else>
        <div class="hot">
          <h3>
            热门搜索
          </h3>
          <div class="desc">
            <div v-for="(item, index) in hotKey.slice(0, 12)" :key="item.n" class="item" :class="{active: index === 0}" @click="handleItem(item)">
              <div class="name">
                {{item.k}}
              </div>
            </div>
          </div>
        </div>
        <div class="history">
          <h3>
            搜索历史
          </h3>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import searchList from './SearchList'
  export default {
    name: "Search",
    components: {
      searchList
    },
    props: {
      showSearch: {
        type: Boolean
      }
    },
    data() {
      return {
        value: '',
        hotKey: [], // 搜索热词
        showList: false,
        searchList: [],
        recommend: {},
        flag: false,
        showValue: false
      }
    },
    methods: {
      getHotKey () {
        this.$com.req('api/getHotkey').then(response => {
          let res = response.response.data
          this.hotKey = res.hotkey
        })
      },
      onSearch () {

      },
      onCancel () {
        this.$emit('update:showSearch', false)
      },
      handleItem (item) {
        this.$com.req(`api/getSearchByKey?key=${item.k}`).then(response => {
          let res = response.response.data
          if (res) {
            this.searchList = res.song.list
            this.recommend = res.zhida
            this.showList = true
            this.flag = true
            this.showValue = true
          }
        })
      }
    },
    mounted() {
      this.getHotKey()
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
      'value' (val) {
        if (val !== '') {
          this.showList = true
          this.$com.req(`api/getSearchByKey?key=${val}`).then(response => {
            let res = response.response.data
            if (res) {
              this.searchList = res.song.list
              this.recommend = res.zhida
              this.showList = true
              this.flag = true
              this.value = val
              this.showValue = true
            }
          })
        } else {
          this.showValue = false
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .search {
    background: #f8f8f8;
    .hot {
      h3 {
        margin: 20px;
      }
      .desc {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 30px;
        flex-wrap: wrap;
        .item {
          /*width: 23%;*/
          margin: 10px;
          .name {
            padding: 10px 20px;
            border-radius: 20px;
            background: #fff;
          }
        }
      }
    }
    .history {
      h3 {
        margin: 20px;
      }
    }
  }
  .active {
    $color: #31c27c;
    color: $color;
  }
</style>
