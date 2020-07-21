<template>
  <section class="padding-left-size-nomal padding-right-size-nomal padding-bottom-size-large">
    <el-form ref="numberValidateForm" :model="form" :rules="rules" size="medium">
      <el-form-item label="版块名称" :label-width="formLabelWidth" prop="plateName">
        <el-input v-model="form.plateName" />
      </el-form-item>
      <el-form-item label="管理员" :label-width="formLabelWidth" prop="plateAdminJson">
        <chooseUser ref="manager" v-model="form.plateAdminJson" :allow-write="false" :select-role="roles" />
      </el-form-item>
    </el-form>
    <span slot="footer" style="padding-left: 120px">
      <el-button type="primary" @click="saveForm('numberValidateForm')">确定</el-button>
      <el-button type="default" @click="cancal">取消</el-button>
    </span>
  </section>
</template>
<script>
import chooseUser from '@/component/chooseUser'
import { savePlate, detailPlate, updatePlate } from '@/api/index'

export default {
  name: 'PortalSet',
  components: {
    chooseUser
  },
  props: {
    id: { type: String, default: '' }
  },
  data () {
    return {
      formLabelWidth: '120px',
      form: {
        plateName: '',
        plateAdminJson: []
      },
      roles: ['orgUser'],
      rules: {
        plateName: [
          { required: true, message: '版块名称不能为空', trigger: 'blur' }
        ],
        plateAdminJson: [
          { required: true, message: '请选择管理员', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.id !== '') {
      detailPlate({ id: this.id }).then(res => {
        this.form.plateName = res.plateName
        this.form.plateAdminJson = JSON.parse(res.plateAdminJson)
      })
    }
  },
  methods: {
    saveForm (formName) {
      // 校验表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    submit () {
      const params = {
        id: this.id,
        plateName: this.form.plateName,
        plateAdminJson: JSON.stringify(this.form.plateAdminJson)
      }
      // 提交表单 成功后返回列表
      if (this.id === '') {
        savePlate(params).then(res => {
          if (res) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          }
          setTimeout(() => {
            this.$emit('closePortal')
          }, 2000)
        })
      } else {
        updatePlate(params).then(res => {
          if (res) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            })
          }
        })
        setTimeout(() => {
          this.$emit('closePortal')
        }, 2000)
      }
    },
    cancal () {
      this.$emit('closePortal')
    }
  }
}
</script>
