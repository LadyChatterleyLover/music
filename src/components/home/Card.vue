<template>
  <div>
    <div class="top">
      <h3 v-if="typeof title === 'string'">
        <slot>
          {{title}}
        </slot>
      </h3>
      <h3 v-else>
        <slot >
          <div class="flex">
            <div v-for="(item, index) in title" :key="index" :class="{active: activeIndex === index}"  @click="onClick(item, index)" class="f-item">
              {{item}}
            </div>
          </div>
        </slot>
      </h3>
      <div class="song">
        <slot>
          {{desc}}
        </slot>
      </div>
    </div>

    <div class="content" v-if="Array.isArray(content[0])">
      <div v-for="(item, index) in content[0].slice(0, 6)" :key="item.id" class="item" v-if="activeIndex === 0">
        <div class="img">
          <img :src="item.picUrl" alt="">
        </div>
        <div class="title t-name">
          {{item.name}}
          <div class="icon">
            <van-icon name="play-circle-o" size="18px" color="#ccc"></van-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="content" v-if="Array.isArray(content[1])">
      <div v-for="(item, index) in content[1].slice(0, 6)" :key="item.id" class="item" v-if="activeIndex === 1">
        <div class="img">
          <img :src="item.album.picUrl" alt="">
        </div>
        <div class="title">
          <div class="t-name t-name">
            {{item.name}}
          </div>
          <div v-for="(item1, index1) in item.artists" :key="index1">
            {{item1.name}}
          </div>
          <div class="icon">
            <van-icon name="play-circle-o" size="18px" color="#ccc"></van-icon>
          </div>
        </div>

      </div>

    </div>

    <div class="content" v-if="!Array.isArray(content[0])">
      <div v-for="(item, index) in content.slice(0, 6)" :key="item.id" class="item" v-if="activeIndex === 0">
        <div class="img" v-if="item.song">
          <img :src="item.song.album.picUrl" alt="">
        </div>
        <div class="img" v-else-if="item.coverUrl">
          <img :src="item.coverUrl" alt="">
        </div>
        <div class="img" v-else>
          <img :src="item.picUrl" alt="">
        </div>
        <div class="title t-name">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Card",
    components: {},
    props: {
      title: {
        type: [String, Array],
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        activeIndex: 0
      }
    },
    methods: {
      onClick(item, index) {
        this.activeIndex = index
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
  .flex {
    display: flex;
    align-items: center;
    width: 200px;
    .f-item {
      margin-left: 20px;
      color: #ccc;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .t-name {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .song {
    padding: 10px 20px;
    border-radius: 28px;
    background: #eee;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 50px;
  }

  .content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;


    .item {
      width: 31%;
      height: 240px;
      display: flex;
      flex-direction: column;
      /*align-items: center;*/
      justify-content: flex-start;
      margin-top: 20px;
      margin-left: 1.5%;
      position: relative;

      .img {
        width: 100%;
        height: 160px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }

      .title {
        margin-top: 20px;
      }
    }

    .icon {
      position: absolute;
      bottom: 80px;
    }
  }
  .active {
    font-size: 36px;
    color: #000 !important;
  }
</style>
