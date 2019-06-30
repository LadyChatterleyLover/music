<template>
  <div>
    <div class="item" v-for="(item, index) in sheet" :key="index" @click="goDetail(item)">
      <div class="img">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <div class="desc">
        <div class="name" v-html="item.name"></div>
        <div class="d-item">
          <div class="count">
            {{item.trackCount}}首音乐
          </div>
          <div class="user">
            by{{item.creator.nickname}}
          </div>
          <div class="play">
            播放{{item.playCount | fixed}}万次
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <van-loading size="20px" color="#C10D0D" v-if="showLoading">加载中...</van-loading>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sheet",
    components: {},
    props: {
      value: {
        type: String
      },
      moreSheets: {
        type: Array
      }
    },
    data() {
      return {
        sheet: [],
        showLoading: true
      }
    },
    methods: {
      goDetail(item) {
        this.$store.state.sheetId = item.id
        this.$router.push('/sheetPlay')
      }
    },
    mounted() {
      this.$com.req(`api/search?keywords=${this.value}&type=1000&limit=10`)
        .then(res => {
          this.sheet = res.result.playlists
          this.sheet.map(item => {
            item.publishTime = this.$moment(item.publishTime).format('YYYY-MM-DD')
            let replaceReg = new RegExp(this.value, 'g')
            let replaceString = '<span class="search-text">' + this.value + '</span>'
            item.name = item.name.replace(replaceReg, replaceString)
          })
        })
    },
    created() {

    },
    filters: {
      fixed (val) {
        return val.toString().substr(0,2) + '.' + val.toString().substr(2,1)
      }
    },
    computed: {},
    watch: {
      moreSheets (val) {
        if (val.length > 0) {
          this.showLoading = false
          val.map(item => {
            this.sheet.push(item)
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
    margin-left: 20px;
    margin-top: 20px;

    .img {
      width: 120px;
      height: 120px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .desc {
      margin-left: 20px;
      .name {
        font-size: 28px;
      }
      .d-item {
        display: flex;
        align-items: center;

        .count {
          margin-right: 20px;
        }
        .user {
          margin-right: 20px;
        }
        .play {

        }
      }
    }
  }
</style>
