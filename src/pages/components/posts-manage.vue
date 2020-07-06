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
                <el-input v-model="publish" style="width:200px" />
              </div>
              <div>
                <span style="margin-right:10px">所属版块</span>
                <el-select v-model="value" placeholder="请选择">
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
    <div style="margin-top:15px">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          fixed
          prop="date"
          label="标题"
        />
        <el-table-column
          prop="name"
          label="所属版块"
        />
        <el-table-column
          prop="province"
          label="发布人"
        />
        <el-table-column
          prop="city"
          label="阅读"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
            <el-button type="text" size="small">全论坛置顶</el-button>
            <el-button type="text" size="small">板块置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
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
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区'
      }],
      multipleSelection: [],
      currentPage3: 5
    }
  },
  mounted () {

  },
  methods: {
    onEnterSearch () {
      alert('111')
    },
    showAdvance () {
      this.advancedSearch = !this.advancedSearch
    },
    retrieval () {
      alert(this.value1)
    },
    cancel () {

    },
    handleClick (row) {
      alert(row)
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
      alert(val)
    },
    handleSizeChange (val) {
      alert(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      alert(`当前页: ${val}`)
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
</style>
