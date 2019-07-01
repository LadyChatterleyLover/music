<template>
  <div class="home">
    <div class="content">
      <div class="flex" v-if="albums.length === 0">无结果</div>
      <div v-else v-for="(item, index) in albums" :key="index" class="item" @click="goDetail(item)">
        <div class="img">
          <img :src="item.blurPicUrl" alt="">
        </div>
        <div class="desc">
          <div class="name" v-html="item.name"></div>
          <div class="time">
            <div v-for="(item1, index1) in item.artists" :key="index1">
              <div v-html="item1.name"></div>
            </div>
            <div class="publish">
              {{item.publishTime}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex" v-if="albums.length > 10">
      <van-loading size="20px" color="#C10D0D" v-if="showLoading">加载中...</van-loading>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Album",
    components: {},
    props: {
      value: {
        type: String
      },
      moreAlbums: {
        type: Array,
      }
    },
    data() {
      return {
        albums: [],
        showLoading: true
      }
    },
    methods: {
      goDetail(item) {
        this.$store.state.albumId = item.id
        this.$router.push('/albumPlay')
      }
    },
    mounted() {
      this.$com.req(`api/search?keywords=${this.value}&type=10&limit=10`)
        .then(res => {
          this.albums = res.result.albums
          this.albums.map(item => {
            item.publishTime = this.$moment(item.publishTime).format('YYYY-MM-DD')
            let replaceReg = new RegExp(this.value, 'g')
            let replaceString = '<div class="search-text">' + this.value + '</div>'
            item.name = item.name.replace(replaceReg, replaceString)
            item.artists.map(item1 => {
              item1.name = item1.name.replace(replaceReg, replaceString)
            })
          })
        })
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {
      moreAlbums (val) {
        if (val.length > 0) {
          this.showLoading = false
          val.map(item => {
            this.albums.push(item)
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
    margin: 20px;

    .img {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }

    .desc {
      margin-left: 20px;

      .name {
        font-size: 28px;
        display: flex;
      }

      .time {
        display: flex;
        align-items: center;
        color: #ccc;

        .publish {
          margin-left: 10px;
        }
      }
    }
  }

</style>
