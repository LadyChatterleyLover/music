<template>
  <div class="list">

    <van-tabs v-model="active" color="#31c27c">
      <van-tab title="歌曲">
        <div class="top">
          <div class="title">
            为您推荐
          </div>
          <div class="t-desc">
            <div class="t-img">
              <img :src="recommend.pic" alt="">
            </div>
            <div class="t-title">
              <div>
                MV: {{recommend.title}}
              </div>
              <div >{{recommend.desc}}</div>
            </div>
            <div class="t-icon">
              <van-icon name="arrow"></van-icon>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in searchList" :key="item.id" class="item">
          <div style="width: 100%">
            <div class="name">
              <div :class="{active: index === 0}">
                {{item.name}}
              </div>
            </div>
            <div class="singer">
              {{item.singer[0].name}}<span v-if="item.album.name!=='空'"> · {{item.album.title}}</span>
            </div>
            <div v-if="isShowMore" v-for="(item1, index1) in item.grp" :key="item1.id" style="margin: 10px 0;" class="item1">
              <div >
                <div class="name">
                  {{item1.name}}
                </div>
                <div class="singer">
                  {{item1.singer[0].name}}<span v-if="item1.album.name!=='空'"> · {{item1.album.title}}</span>
                </div>
              </div>
              <div class="icon1">
                <van-icon name="play-circle-o" size="20px"></van-icon>
              </div>
            </div>
            <div v-if="item.grp.length > 0" >
              <div v-if="!isShowMore" class="more"  @click="showMore">
                <div>更多版本</div>
                <div class="m-icon">
                  <van-icon name="arrow-down"></van-icon>
                </div>
              </div>
              <div v-if="isShowMore" class="more" @click="showMore">
                <div>收起更多版本</div>
                <div class="m-icon">
                  <van-icon name="arrow-up" ></van-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="icon">
            <van-icon name="play-circle-o" size="20px"></van-icon>
          </div>
        </div>
      </van-tab>
      <van-tab title="视频">内容 2</van-tab>
      <van-tab title="专辑">内容 3</van-tab>
      <van-tab title="歌手">内容 4</van-tab>
    </van-tabs>
  </div>
  
</template>

<script>
  export default {
    name: "SearchList",
    components: {},
    props: {

    },
    data() {
      return {
        active: 0,
        album: [], // 搜索结果的专辑
        mv: [], // 搜索结果的mv
        singer: [], // 搜索结果的歌手
        song: [], // 搜索结果的歌曲
        isShowMore: false,
      }
    },
    methods: {
      showMore () {
        this.isShowMore = !this.isShowMore
      }
    },
    mounted() {
      console.log(this.$store.state.recommend)
    },
    created() {

    },
    filters: {},
    computed: {
      searchList () {
        return this.$store.state.searchList
      },
      recommend () {
        return this.$store.state.recommend
      }
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .active {
    $color: #31c27c;
    color: $color;
  }
  .top {
    background: #eee;
    .title {
      margin: 20px;
      font-size: 24px;
      color: #ccc;
      position: relative;
      top: 8px;
    }
    .t-desc {
      background: #f8f8f8;
      display: flex;
      align-items: center;
      position:relative;
      .t-title {
        margin-left: 40px;
      }
      .t-img {
        background: #fff;
        display: flex;
        align-items: center;
        margin: 0 20px;
        img {
          width: 200px;
          height: 120px;
        }
      }
      .t-icon {
        position: absolute;
        right: 20px;
      }
    }
  }
  .list {
    background: #fff !important;
  }
  .item {
    margin: 50px 0 12px 30px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .singer {
    }
    .more {
      font-size: 24px;
      color: #ccc;
      display: flex;
      align-items: center;
      margin-top: 10px;
      .m-icon {
        position: relative;
        top: 2px;
      }
    }
    .item1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .icon {
      position: absolute;
      right: 40px;
      top: 26px;
    }
    .icon1 {
      position: relative;
      right: 40px;
    }
  }
</style>