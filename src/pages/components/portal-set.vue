<template>
  <section>
    <el-form ref="numberValidateForm" :model="form">
      <el-form-item label="版块名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="管理员" :label-width="formLabelWidth" prop="manager">
        <chooseUser ref="manager" v-model="form.manager" :allow-write="false" :select-role="roles" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveForm('examForm')">确定</el-button>
      <el-button type="default" @click="cancal()">取消</el-button>
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
      form: {
        name: '',
        region: '',
        manager: []
      }
    }
  }
}
</script>
