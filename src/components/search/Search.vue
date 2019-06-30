<template>
  <div class="search">
    <div>
      <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action
              @search="onSearch"
              @cancel="onCancel"
      >
        <div slot="action" @click="onSearch" v-if="showValue">搜索</div>
        <div slot="action" @click="onCancel" v-else>取消</div>
      </van-search>
      <search-panel v-if="showPanel" :searchRank="searchRank" :value="value"></search-panel>
      <div v-else>
        <div class="history" v-if="showHistory && searchArr.length > 0">
          <h3>
            搜索历史
          </h3>
          <div class="desc">
            <div v-for="(item, index) in searchArr" :key="index" class="item" @click="handleItem(item)">
              <div class="name">
                {{item.name}}
              </div>
            </div>
            <div class="d-icon" @click="clearHistory">
              <van-icon name="delete" size="18px"></van-icon>
            </div>
          </div>
        </div>
        <div class="hot">
          <h3>
            热搜榜
          </h3>
          <div class="h-desc">
            <div class="h-item" v-for="(item, index) in hots" :key="index" @click="searchItem(item)">
              <div class="index" :class="{hotIndex: index < 3}">
                {{index + 1}}
              </div>
              <div class="name">
                <div>
                  {{item.first}}
                </div>
              </div>
              <div class="h-hot" v-if="index < 2">
                hot
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
            v-model="showFlag"
            show-cancel-button
            @confirm="confirm"
    >
      <div class="dialog">
        是否确认清空搜索历史？
      </div>
    </van-dialog>
  </div>

</template>

<script>
  import searchPanel from './SearchPanel'

  export default {
    name: "Search",
    components: {
      searchPanel
    },
    props: {
      showSearch: {
        type: Boolean
      }
    },
    data() {
      return {
        value: '',
        hots: [], // 热搜
        showList: false,
        searchList: [],
        recommend: {},
        flag: false,
        showValue: false,
        searchArr: JSON.parse(localStorage.searchArr),
        showFlag: false, // 是否显示弹框
        showHistory: true, // 是否显示搜索历史
        searchValue: '',
        showPanel: false,
        searchRank: [], // 搜索建议
        searchSongs: [], // 搜索结果
      }
    },
    methods: {
      getHots() {
        this.$com.req('api/search/hot').then(res => {
          this.hots = res.result.hots
        })
      },
      searchItem(item) {
        this.$com.req(`api/search?keywords=${item.first}`)
          .then(res => {
            this.searchSongs = res.result.songs
            this.$store.state.searchSongs = res.result.songs
            this.$store.state.searchValue = item.first
            this.$router.push({name: 'searchList', params: {searchSongs: this.searchSongs, searchValue: item.first}})
          })
        let obj = {
          name: item.first
        }
        let arr = JSON.parse(localStorage.searchArr)
        arr.push(obj)
        arr = this.$lodash.unionBy(arr, 'name')
        localStorage.setItem('searchArr', JSON.stringify(arr))
      },
      onSearch() {
        this.$com.req(`api/search?keywords=${this.value}`)
          .then(res => {
            this.searchSongs = res.result.songs
            this.$store.state.searchSongs = res.result.songs
            this.$store.state.searchValue = this.value
            this.$router.push({name: 'searchList', params: {searchSongs: this.searchSongs, searchValue:this.searchValue}})
          })
        let obj = {
          name: this.value
        }
        let arr = JSON.parse(localStorage.searchArr)
        arr.push(obj)
        arr = this.$lodash.unionBy(arr, 'name')
        localStorage.setItem('searchArr', JSON.stringify(arr))
      },
      onCancel() {
        this.$emit('update:showSearch', false)
      },
      clearHistory() {
        this.showFlag = true
      },
      confirm() {
        this.showHistory = false
        let arr = []
        localStorage.setItem('searchArr', JSON.stringify(arr))
      },
      handleItem(item) {
        this.$com.req(`api/search?keywords=${item.name}&limit=10`)
          .then(res => {
            this.$store.state.searchValue = item.name
            this.searchSongs = res.result.songs
            this.$store.state.searchSongs = res.result.songs
            this.$router.push({name: 'searchList', params:
                {searchSongs: this.searchSongs, searchValue: item.name}})
          })
      }
    },
    mounted() {
      this.getHots()
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
      'value'(val) {
        if (val !== '') {
          this.searchValue = val
          this.showValue = true
          this.$com.req(`api/search/suggest?keywords=${val}&type=mobile`)
            .then(res => {
              if (res) {
                this.searchRank = res.result.allMatch
                this.showPanel = true
              }
            })
        } else {
          this.showValue = false
          this.showPanel = false
        }
      }
    },
    directives: {}
  }
</script>

<style scoped lang="scss">
  .search {
    .hot, .history {
      h3 {
        margin: 30px;
        position: relative;
        top: 20px;
      }

      .desc {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 30px;
        flex-wrap: wrap;
        position: relative;

        .item {
          /*width: 30%;*/
          margin: 10px;
          text-align: center;

          .name {
            padding: 10px 20px;
            border-radius: 20px;
            background: #fff;
          }
        }

        .d-icon {
          position: absolute;
          top: -46px;
          right: 60px;
        }
      }
    }
  }

  .dialog {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .active {
    $color: #31c27c;
    color: $color;
  }

  .hotIndex {
    color: #C10D0D;
    font-size: 28px;
  }
  .history {
    background: #f9f9f9;
    .desc {
      .name {

      }
    }
  }
  .h-desc {
    .h-item {
      display: flex;
      align-items: center;
      margin: 10px 0 30px 10px;

      .index {
        margin-right: 20px;
        margin-left: 30px;
      }

      .name {
        margin-right: 20px;
      }

      .h-hot {
        font-style: italic;
        color: #c10d0d;
        font-size: 32px;
      }
    }
  }
</style>
