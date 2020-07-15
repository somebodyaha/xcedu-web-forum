<template>
  <section class="manage">
    <header>
      <div class="dss">
        <div class="ds">
          <el-input
            v-model="params.plateName"
            placeholder="请输入板块名称"
            suffix-icon="el-icon-search"
            style="margin-right:15px"
            @keyup.enter.native="onEnterSearch"
          />
        </div>
        <div>
          <el-button type="primary" @click="portalSet">新建</el-button>
        </div>
      </div>
    </header>
    <div style="margin-top:20px">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55px" />
        <el-table-column fixed prop="plateName" label="板块名称" min-width="300px" />
        <el-table-column prop="plateAdminName" label="板块管理员" />
        <el-table-column prop="createdBy" label="发布人" />
        <el-table-column prop="createdDate" label="创建时间" min-width="150px" />
        <el-table-column label="操作" width="80px" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button> -->
            <!-- <el-button type="text" size="small">全论坛置顶</el-button> -->
            <!-- <el-button type="text" size="small">板块置顶</el-button> -->
            <el-dropdown trigger="click" @command="title => choose(title, scope.row)">
              <span class="el-dropdown-link">
                <i class="el-icon-more" style="cursor:pointer" @click="handleClick(scope.row)" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px">
        <el-pagination
          :current-page="params.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecords"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getPlatePage, deletePlateById } from '@/api/index'

export default {
  data () {
    return {
      managerSet: false,
      params: {
        plateName: '',
        page: 1,
        pageSize: 10
      },
      // 总记录数
      totalRecords: 0,
      tableData: [],
      multipleSelection: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        manager: ''
      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      roles: ['orgUser']
    }
  },
  mounted () {

  },
  methods: {
    portalSet () {
      this.$emit('setPortal')
    },
    flushPlateList () {
      getPlatePage(this.params).then(res => {
        this.tableData = res.records
        this.totalRecords = res.totalRecords
      })
    },
    onEnterSearch () {
      this.flushPlateList()
    },
    cancel () {},
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
    // 切换页码
    handleSizeChange (val) {
      this.params.pageSize = val
      this.flushPlateList()
    },
    handleCurrentChange (val) {
      this.params.page = val
      this.flushPlateList()
    },
    choose (title, row) {
      if (title === 'del') {
        this.$confirm('此操作将删除该帖子 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePlateById({ id: row.id }).then(res => {
            if (res) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          })
        })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
            this.$message({
              type: 'info',
              message: err
            })
          })
      } else if (title === 'allStick') {
        this.$confirm('此操作将把该帖子全论坛置顶 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //   articleTop({ id: row.id, flag: 'forum', topFlag: 1 }).then(res => {
          //     if (res) {
          //       this.$message({
          //         message: '置顶成功',
          //         type: 'success'
          //       })
          //     } else {
          //       this.$message({
          //         message: '置顶失败',
          //         type: 'error'
          //       })
          //     }
          //   })
          // })
          // .catch(err => {
          //   // eslint-disable-next-line no-console
          //   console.log(err)
          //   this.$message({
          //     type: 'info',
          //     message: '已取消全论坛置顶'
          //   })
        })
      } else {
        this.$confirm('此操作将把该帖子板块置顶 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //   articleTop({ id: row.id, flag: 'plate', topFlag: 1 }).then(res => {
          //     if (res) {
          //       this.$message({
          //         message: '置顶成功',
          //         type: 'success'
          //       })
          //     } else {
          //       this.$message({
          //         message: '置顶失败',
          //         type: 'error'
          //       })
          //     }
          //   })
          // })
          // .catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消板块置顶'
          //   })
        })
      }
    },
    submit (formName) {
      this.$refs[formName].validate(valid => {
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
.manage {
  padding: 30px;
}
.ds {
  display: flex;
}
.dss {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-collapse {
  border: none;
}
.el-pagination {
  text-align: center;
}
.el-icon-more:hover {
  color: #3396fc;
}

.manage >>> .el-dialog__footer {
  top: 225px;
  right: 240px;
}
.manage >>> .el-dialog__body {
  padding: 50px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.manage >>> .el-dialog__wrapper .el-dialog {
  margin-top: -150px !important;
}
</style>
