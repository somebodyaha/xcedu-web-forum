<template>
  <section class="superManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="内容管理" name="first">
        <manage ref="articleManage" />
      </el-tab-pane>
      <el-tab-pane label="板块管理" name="second">
        <plateManage ref="plateManage" />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import manage from '@page/components/posts-manage'
import plateManage from '@page/components/plate-manage'
// import { getPlatePage, getArticleList, deleteArticleById, articleTop, getPlateList } from '@/api/index'

export default {
  components: {
    manage,
    plateManage
  },
  data () {
    return {
      activeName: 'first',
      onetab: '123'
    }
  },
  methods: {
    handleClick (tab, event) {
      if (tab.name === 'first') {
        this.$refs.articleManage.flushArticleList()
      } else if (tab.name === 'second') {
        this.$refs.plateManage.flushPlateList()
      }
    }
  }
}
</script>

<style scoped>
.superManage >>> .el-tabs__nav-wrap{
  padding-left: 30px;
}
</style>
