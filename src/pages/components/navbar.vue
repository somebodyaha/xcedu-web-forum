<template>
  <section class="app-forum-navbar">
    <div>
      <logo />
      <el-menu :default-active="activeIndex" class="margin-lr-auto main-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item v-for="plate in showPlateList" :key="plate.id" :index="plate.id">{{ plate.plateName }}</el-menu-item>
        <el-submenu v-if="foldPlateList.length != 0" index="2">
          <template slot="title">更多</template>
          <el-menu-item v-for="foldPlate in foldPlateList" :key="foldPlate.id" :index="foldPlate.id">{{ foldPlate.plateName }}</el-menu-item>
        </el-submenu>
        <el-menu-item index="-1"><a>管理</a></el-menu-item>
      </el-menu>
      <div>
        <el-button type="primary " @click="newArticle">内容发布</el-button>
        <el-badge :value="noticeNum" class="item" style="cursor:pointer">
          <i class="el-icon-bell size-large-xx" @click="directNotice " />
        </el-badge>
        <user />
        <!-- <el-badge :value="noticeInfo.commentSum" class="item">
          <i class="el-icon-message" @click="directNotice" />
        </el-badge>
        <el-badge :value="noticeInfo.noticeSum" class="item">
          <i class="el-icon-chat-dot-round" @click="directNotice" />
        </el-badge> -->
      </div>
    </div>
  </section>
</template>

<script>
import { userManagePlate, getPlateList, getUserSetting } from '@/api/index'
import { mapGetters } from 'vuex'
import logo from '@page/components/logo'
import user from '@page/components/user'
export default {
  name: 'Navbar',
  components: { logo, user },
  data () {
    return {
      locationPath: '',
      activeIndex: '0',
      showPlateList: [],
      plateList: [],
      foldPlateList: [],
      isAdmin: false,
      userPlateList: [],
      title: '',
      userInfo: {
        id: '',
        trueName: '',
        aliasName: '',
        imgUrl: '',
        gender: 0
      }
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'noticeNum'
    ])
  },
  mounted () {
    // 获取所有板块列表用于navbar
    getPlateList({}).then(res => {
      const showNum = 5
      for (let i = 0; i < res.length; i++) {
        if (i < showNum) {
          this.showPlateList.push(res[i])
        } else {
          this.foldPlateList.push(res[i])
        }
        this.plateList.push(res[i])
      }
    })
    getUserSetting().then(res => {
      this.userInfo = {
        id: res.id,
        trueName: res.trueName,
        aliasName: res.aliasName,
        imgUrl: res.imgUrl,
        gender: res.gender
      }
      this.$store.commit('getPlateList', this.plateList)
    })
    userManagePlate().then(res => {
      this.isAdmin = res.isAdmin
      this.userPlateList = res.plateList
      this.$store.commit('getAdminState', res.isAdmin)
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '-1') {
        this.$router.replace({
          path: '/mfs-forum/super-manage'
        })
      } else {
        // eslint-disable-next-line no-console
        console.log(key, keyPath)
        this.$router.replace({
          path: '/mfs-forum/home/newest',
          query: {
            index: key
          }
        })
      }
    },
    directNotice () {
      this.$router.replace({
        path: '/mfs-forum/notice'
      })
    },
    refreshByPlate (plateId) {

    },
    newArticle () {
      const { href } = this.$router.resolve({ name: 'newArtical' })
      window.open(href, '_self')
    }
  }
}
</script>
