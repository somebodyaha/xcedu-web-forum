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
    </el-form>
  </section>
</template>
<script>
import { createArticle, updateArticle, getNoPubArticle, getPlateList } from '@/api/index'
import fileUp from '@/component/fileUp'
import editor from '@/component/editor'
export default {
  components: {
    fileUp,
    editor
  },
  props: {
    flag: {
      type: Number,
      default: 0
    }
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
        anonymous: 0,
        isPublish: 1
      },
      options: [],
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
          anonymous: 0,
          isPublish: 1
        }
      }
    },
    flag (newval, oldval) {
      if (newval > oldval) {
        this.submitForm('composeForm')
      }
    }
  },
  mounted: function () {
    getPlateList().then(res => {
      this.options = res
    })
    const id = this.$route.query.id
    if (id) {
      getNoPubArticle(id).then(res => {
        this.form = {
          id: res.id,
          articleTitle: res.articleTitle,
          plateId: res.plateId,
          articleContent: res.articleContent,
          imgFileIds: res.imgFileIds,
          fileIds: res.fileIds,
          anonymous: res.anonymous,
          isPublish: 1
        }
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
            updateArticle(this.form).then(res => {
              this.$message.success('修改成功')
              this.$router.push({ path: '/mfs-forum' })
            })
          } else {
            createArticle(this.form).then(res => {
              // this.$message.success('发布成功').then(() => {
              //   setTimeout(() => {
              //     window.close()
              //   }, 1000)
              // })
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
