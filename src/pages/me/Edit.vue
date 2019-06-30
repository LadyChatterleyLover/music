<template>
  <div class="container">
    <div class="top">
      <div class="back" @click="$router.back()">
        <van-icon name="arrow-left" size="20px"></van-icon>
      </div>
      <div class="title">
        我的资料
      </div>
    </div>
    <div class="content">
      <div class="item" @click="showName = true">
        <van-cell title="昵称" :value="user.nickname+ ' >'"></van-cell>
      </div>
      <div class="item" @click="showGender=true">
        <van-cell title="性别" :value="user.sex+ ' >'"></van-cell>
      </div>
      <div class="item" @click="showBir = true">
        <van-cell title="生日" :value="user.birthday+ ' >'"></van-cell>
      </div>
      <div class="item" @click="showCity=true">
        <van-cell title="城市" :value="province+city+ ' >'"></van-cell>
      </div>
      <div class="item">
        <van-cell title="签名"></van-cell>
        <van-field
                type="textarea"
                rows="1"
                autosize
                v-model="user.signature"></van-field>
      </div>
    </div>
    <div class="btn">
      <van-button type="warning" @click="edit">确认修改</van-button>
    </div>
    <van-popup v-model="showGender" position="bottom">
      <van-picker
              :columns="genders"
              show-toolbar
              title="性别"
              @confirm="confirmGender"
              @cancel="cancelGender"
      ></van-picker>
    </van-popup>
    <van-popup v-model="showBir" position="bottom">
      <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="生日"
              :min-date="minDate"
              @confirm="confirmDate"
              @cancel="cancelDate"
      >
      </van-datetime-picker>
    </van-popup>
    <van-popup v-model="showCity" position="bottom">
      <van-area
              :area-list="areaList"
              :columns-num="2"
              title="城市"
              @confirm="confirmCity"
              @cancel="cancelCity"
      ></van-area>
    </van-popup>
    <van-dialog
            v-model="showName"
            title="昵称"
            show-cancel-button
            @confirm="confirmName"
            @cancel="cancelName"
    >
      <van-field v-model="user.nickname" autofocus></van-field>
    </van-dialog>
  </div>

</template>

<script>
  import areaList from '../../common/area'
  import axios from 'axios'
  export default {
    name: "Edit",
    components: {},
    props: {},
    data() {
      return {
        user: {},
        areaList: {},
        province: '', // 省份
        city: '', // 城市
        signature: '暂无签名',
        showGender: false,
        genders: ['保密', '男', '女'],
        minDate: '',
        currentDate: new Date(),
        birTime: '',
        showBir: false,
        showCity: false,
        provinceId: '',
        cityId: '',
        showName: false,
        userId: localStorage.userId
      }
    },
    methods: {
      getUserInfo() {
        this.$com.req(`api/user/detail?uid=${this.userId}`).then(res => {
          this.user = res.profile
          if (this.user.gender === 0) {
            this.user.sex = '保密'
          }
          if (this.user.gender === 1) {
            this.user.sex = '男'
          }
          if (this.user.gender === 2) {
            this.user.sex = '女'
          }
          this.user.birthday = this.$moment(this.user.birthday).format('YYYY-MM-DD')
          this.user.birTime = this.$moment(this.user.birthday).valueOf()
          this.areaList = areaList
          this.province = areaList.province_list[this.user.province]
          this.city = areaList.city_list[this.user.city]
          console.log(this.user)
        }).catch(err => {
          console.log(err)
        })
      },
      confirmGender(value, index) {
        this.showGender = false
        this.user.sex = value
        this.user.gender = index
      },
      cancelGender() {
        this.showGender = false
      },
      confirmDate(value) {
        this.user.birTime = this.$moment(value).valueOf()
        this.user.birthday = this.$moment(value).format('YYYY-MM-DD')
        this.showBir = false
      },
      cancelDate() {
        this.showBir = false
      },
      confirmCity(val) {
        this.user.provinceId = val[0].code
        this.user.cityId = val[1].code
        this.province = val[0].name
        this.city = val[1].name
        this.showCity = false
      },
      cancelCity() {
        this.showCity = false
      },
      confirmName() {
        this.showName = false
        this.user.nick = this.name
      },
      cancelName() {
        this.showName = false
      },
      edit() {
        this.$com.req(`api/user/update/?gender=${this.user.gender}&signature=${this.user.signature}&city=${this.user.city}&nickname=${this.user.nickname}&birthday=${this.user.birTime}&province=${this.user.province}`,
        ).then(res => {
            if (res.code === 200) {
              this.$router.push('/me')
              this.$toast.success('修改成功')
            }
          })
      }
    },
    mounted() {
      let day = '1900-01-01'
      this.minDate = this.$moment(day).toDate()
      this.getUserInfo()

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
  .top {
    background: #c10d0d;
    height: 80px;
    color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .back {
      position: absolute;
      left: 40px;
      top: 20px;
    }
  }

  .content {

  }

  .btn {
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }
</style>
