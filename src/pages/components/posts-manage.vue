<template>
  <section class="manage">
    <header>
      <div class="dss">
        <div class="ds">
          <el-input
            v-model="search"
            placeholder="请输入标题"
            suffix-icon="el-icon-search"
            style="margin-right:15px"
            @keyup.enter.native="onEnterSearch"
          />
          <el-button type="primary" @click="showAdvance">高级搜索</el-button>
        </div>
        <div>
          <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
        </div>
      </div>
      <div style="margin-top:25px">
        <el-collapse-transition>
          <div v-if="advancedSearch">
            <div class="dss">
              <div style="width: 30%">
                <span style="margin-right:10px">发布人</span>
                <el-input v-model="publish" style="width: 60%" />
              </div>
              <div style="width: 30%">
                <span style="margin-right:10px">所属版块</span>
                <el-select v-model="value" placeholder="请选择" style="width: 60%">
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
          min-width="150px"
        />
        <el-table-column
          prop="read"
          label="阅读"
        />
        <el-table-column
          label="操作"
          width="80px"
          fixed="right"
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
    <el-dialog title="板块设置" :visible.sync="dialogFormVisible">
      <el-form ref="numberValidateForm" :model="form" :rules="rules">
        <el-form-item label="版块名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-right:15px" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('numberValidateForm')">确 定</el-button>
      </div>
    </el-dialog>
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
      currentPage: 1,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
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
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          alert('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.manage{
  padding: 30px;
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

.manage>>>.el-dialog__footer {
    top: 225px;
    right: 240px;
}
.manage>>>.el-dialog__body {
    padding: 50px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
.manage>>>.el-dialog__wrapper .el-dialog{
  margin-top: -150px!important;
}
</style>
