<template>
  <section class="app-forum-navbar">
    <div>
      <logo />
      <el-menu :default-active="activeIndex" class="margin-lr-auto main-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item v-for="plate in showPlateList" :key="plate.id" :index="plate.id">{{ plate.plateName }}</el-menu-item>
        <el-submenu v-if="foldPlateList.length != 0" index="2">
          <template slot="title">更多</template>
          <el-menu-item v-for="foldPlate in foldPlateList" :key="foldPlate.id" :index="plate.id">{{ foldPlate.plateName }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="isAdmin || userPlateList.length > 0" index="99"><a href="https://www.ele.me" target="_blank">管理</a></el-menu-item>
      </el-menu>
      <div>
        <el-button type="primary " @click="newArticle">内容发布</el-button>
        <el-badge :value="200" :max="99">
          <i class="icon-ding color" />
        </el-badge>
      </div>
    </div>
  </section>
</template>

<script>
import { allPlate, userManagePlate } from '@/api/index'
import logo from '@page/components/logo'
export default {
  name: 'Navbar',
  components: { logo },
  data () {
    return {
      locationPath: '',
      activeIndex: '0',
      showPlateList: [],
      plateList: [],
      foldPlateList: [],
      isAdmin: false,
      userPlateList: [],
      title: ''
    }
  },
  mounted () {
    // 获取所有板块列表用于navbar
    allPlate({}).then(res => {
      const showNum = 5
      for (let i = 0; i < res.length; i++) {
        if (i < showNum) {
          this.showPlateList.push(res[i])
        } else {
          this.foldPlateList.push(res[i])
        }
        this.plateList.push(res[i])
      }
      this.$store.commit('getPlateList', this.plateList)
    })

    userManagePlate().then(res => {
      this.isAdmin = res.isAdmin
      this.userPlateList = res.plateList
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
      this.$router.replace({
        path: '/mfs-forum/home/newest',
        query: {
          index: key
        }
      })
    },
    refreshByPlate (plateId) {

    },
    newArticle () {
      const { href } = this.$router.resolve({ name: 'newArtical' })
      window.open(href, '_blank')
    }
  }
}
</script>
