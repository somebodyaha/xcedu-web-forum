<template>
  <section class="manage">
    <header>
      <div class="topsearch">
        <el-input
          v-model="search"
          placeholder="请输入标题"
          suffix-icon="el-icon-search"
          style="width:15%;margin-right:15px"
          @keyup.enter.native="onEnterSearch"
        />
        <el-button type="primary" @click="showAdvance">高级搜索</el-button>
      </div>
      <div style="margin-top:25px">
        <el-collapse-transition>
          <div v-if="advancedSearch">
            <div class="dss">
              <div>
                <span style="margin-right:10px">发布人</span>
                <el-input v-model="publish" style="width:300px" />
              </div>
              <div>
                <span style="margin-right:10px">所属版块</span>
                <el-select v-model="value" placeholder="请选择" style="width:300px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div>
                <span style="margin-right:10px">发布时间</span>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
            </div>
            <div class="ds" style="margin-top:15px">
              <el-button type="primary" @click="retrieval">检索</el-button>
              <el-button @click="cancel">取消</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </header>
    <div style="margin-top:20px">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55px"
        />
        <el-table-column
          fixed
          prop="title"
          label="标题"
          min-width="500px"
        />
        <el-table-column
          prop="modules"
          label="所属版块"
        />
        <el-table-column
          prop="issuer"
          label="发布人"
        />
        <el-table-column
          prop="time"
          label="发布时间"
        />
        <el-table-column
          prop="read"
          label="阅读"
        />
        <el-table-column
          label="操作"
          width="80px"
        >
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button> -->
            <!-- <el-button type="text" size="small">全论坛置顶</el-button> -->
            <!-- <el-button type="text" size="small">板块置顶</el-button> -->
            <el-dropdown trigger="click" @command="choose">
              <span class="el-dropdown-link">
                <i class="el-icon-more" style="cursor:pointer" @click="handleClick(scope.row)" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="del">删除</el-dropdown-item>
                <el-dropdown-item command="allStick">全论坛置顶</el-dropdown-item>
                <el-dropdown-item command="stick">板块置顶</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      advancedSearch: false,
      value1: '',
      options: [],
      publish: '',
      value: '',
      tableData: [{
        title: '公积金缴存规定制定,公积金缴存规定制定公积金缴存规定制定公积金缴存规定制定公积金缴存规定制定公积金缴存规定制定公积金缴存规定制定',
        modules: '财务部门',
        issuer: '爱听歌的鱼',
        time: '2020-05-08',
        read: 14
      }, {
        title: '公积金缴存规定制定',
        modules: '财务部门',
        issuer: '爱听歌的鱼',
        time: '2020-05-08',
        read: 14
      }, {
        title: '公积金缴存规定制定',
        modules: '财务部门',
        issuer: '爱听歌的鱼',
        time: '2020-05-08',
        read: 14
      }, {
        title: '公积金缴存规定制定',
        modules: '财务部门',
        issuer: '爱听歌的鱼',
        time: '2020-05-08',
        read: 14
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  mounted () {

  },
  methods: {
    onEnterSearch () {
      // eslint-disable-next-line no-console
      console.log('111')
    },
    showAdvance () {
      this.advancedSearch = !this.advancedSearch
    },
    retrieval () {
      // eslint-disable-next-line no-console
      console.log(this.value1)
    },
    cancel () {

    },
    handleClick (row) {
      // eslint-disable-next-line no-console
      console.log(row)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 全选单选 或者批量删除
    handleSelectionChange (val) {
      this.multipleSelection = val
      // eslint-disable-next-line no-console
      console.log(val)
    },
    handleSizeChange (val) {
      // eslint-disable-next-line no-console
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // eslint-disable-next-line no-console
      console.log(`当前页: ${val}`)
    },
    choose (title) {
      if (title === 'del') {
        this.$confirm('此操作将删除该版块 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (title === 'allStick') {
        this.$confirm('此操作将删除该版块 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '全论坛置顶成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$confirm('此操作将删除该版块 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '板块置顶成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.manage{
  padding: 30px;
}
.topsearch{
  display: flex;
}
.ds{
  display: flex;
}
.dss{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-collapse{
  border:none;
}
.el-pagination{
  text-align: center;
}
.el-icon-more:hover{
  color:#3396fc
}
</style>
