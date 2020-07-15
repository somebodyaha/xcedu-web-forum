<template>
  <section class="padding-left-size-nomal padding-right-size-nomal padding-bottom-size-large">
    <el-form ref="numberValidateForm" :model="form">
      <el-form-item label="版块名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="管理员" :label-width="formLabelWidth" prop="manager">
        <chooseUser ref="manager" v-model="form.manager" :allow-write="false" :select-role="roles" />
      </el-form-item>
    </el-form>
    <span slot="footer" style="padding-left: 120px">
      <el-button type="primary" @click="saveForm">确定</el-button>
      <el-button type="default" @click="cancal">取消</el-button>
    </span>
  </section>
</template>
<script>
import chooseUser from '@/component/chooseUser'

export default {
  name: 'PortalSet',
  components: {
    chooseUser
  },
  data () {
    return {
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        manager: []
      },
      roles: ['orgUser']
    }
  },
  methods: {
    saveForm () {
      // 提交表单 成功后返回列表
      this.$emit('closePortal')
    },
    cancal () {
      this.$emit('closePortal')
    }
  }
}
</script>
