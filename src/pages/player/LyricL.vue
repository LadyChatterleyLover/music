<template>
  <div class="content">
    <div v-html="lyricL" ></div>
  </div>

</template>

<script>
  export default {
    name: "LyricL",
    components: {},
    props: {
      lyricL: {
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
      this.lyricL.map(item => {
        console.log(item)
      })
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
    color: #fff;
  }
</style>
