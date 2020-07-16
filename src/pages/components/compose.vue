<template>
  <section class="layout-list-content padding-top-size-nomal padding-bottom-size-nomal">
    <el-form
      ref="composeForm"
      :rules="rules"
      :model="form"
      label-width="100px"
      style="margin: 0 auto; width: 1000px;"
    >
      <el-form-item label="标题" prop="articleTitle">
        <el-input
          v-model="form.articleTitle"
          type="textarea"
          :rows="3"
          placeholder="标题"
        />
      </el-form-item>
      <el-form-item label="所属板块" prop="plateId">
        <el-select v-model="form.plateId" placeholder="所属板块" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.plateName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="articleContent">
        <editor v-model="form.articleContent" />
      </el-form-item>
      <el-form-item label="相关图片">
        <fileUp v-model="form.imgFileIds" accept="image/*" accept-tips="只能上传图片格式的文件" dir="dir" />
      </el-form-item>
      <el-form-item label="附件">
        <fileUp v-model="form.fileIds" dir="dir" />
      </el-form-item>
      <el-form-item label="匿名发帖">
        <el-checkbox v-model="form.anonymousState" @click="changeAnonymous" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('composeForm')">发布</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import { createArticle, updateArticle, getNoPubArticle } from '@/api/index'
import fileUp from '@/component/fileUp'
import editor from '@/component/editor'
// import navbarVue from './navbar.vue'
export default {
  components: {
    fileUp,
    editor
  },
  data () {
    return {
      form: {
        id: '',
        articleTitle: '',
        plateId: '',
        articleContent: '',
        imgFileIds: '',
        fileIds: '',
        anonymous: 0
      },
      options: this.$store.state.header.plateList,
      rules: {
        articleTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        plateId: [
          { required: true, message: '请选择所属板块', trigger: 'change' }
        ],
        articleContent: [
          { required: true, message: '请输入正文', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route: function () {
      if (!this.$route.query.id) {
        this.form = {
          id: '',
          articleTitle: '',
          plateId: '',
          articleContent: '',
          imgFileIds: '',
          fileIds: '',
          anonymous: 0
        }
      }
    }
  },
  mounted: function () {
    const id = this.$route.query.id
    if (id !== undefined) {
      getNoPubArticle(id).then(res => {
        this.form = res
        this.form.anonymousState = this.form.anonymous === 1
      })
    }
  },
  methods: {
    changeAnonymous () {
      this.form.anonymous = this.form.anonymousState ? 1 : 0
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            const id = this.$route.query.id
            updateArticle(id, this.form).then(res => {
              this.$message.success('修改成功')
              this.$router.push({ path: '/mfs-forum' })
            })
          } else {
            createArticle(this.form).then(res => {
              this.$message.success('发布成功')
              this.$router.push({ path: '/mfs-forum' })
            }).catch(err => {
              this.$message.error(err)
            })
          }
        }
      })
    }
  }
}
</script>
