<template>
  <div>
    <div class="flex" v-if="radios.length === 0">无结果</div>
    <div v-else class="item" v-for="(item, index) in radios" :key="index" @click="goDetail(item)">
      <div class="img">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="desc">
        <div class="name" v-html="item.name"></div>
        <div class="d-item">
          <div class="d-name">
           {{item.dj.nickname}}
          </div>
        </div>
      </div>
    </div>
    <div class="flex" v-if="radios.length > 10">
      <van-loading size="20px" color="#C10D0D" v-if="showLoading">加载中...</van-loading>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Radio",
    components: {},
    props: {
      value: {
        type: String
      },
      moreRadios: {
        type: Array
      }
    },
    data() {
      return {
        radios: [],
        showLoading: true
      }
    },
    methods: {
      goDetail(item) {
        console.log(item)
        this.$store.state.radioId = item.id
        this.$router.push('/radioPlay')
      }
    },
    mounted() {
      this.$com.req(`api/search?keywords=${this.value}&type=1009&limit=50`)
        .then(res => {
          this.radios = res.result.djRadios
          this.radios.map(item => {
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
      moreRadios (val) {
        if (val.length > 0) {
          this.showLoading = false
          val.map(item => {
            this.radios.push(item)
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

        .d-name {
          margin-right: 20px;
          color: #ccc;
        }
      }
    }
  }
</style>
