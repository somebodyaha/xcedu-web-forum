<template>
  <section class="superManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="内容管理" name="first">
        <manage />
      </el-tab-pane>
      <el-tab-pane label="板块管理" name="second">
        <manage />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import manage from '@page/components/posts-manage'
export default {
  components: {
    manage
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      // eslint-disable-next-line no-console
      console.log(tab, event.target)
    }
  }
}
</script>

<style scoped>
.superManage >>> .el-tabs__nav-wrap{
  padding-left: 30px;
}
</style>
