<template>
  <section class="layout-list-content padding-top-size-nomal padding-bottom-size-nomal">
    <el-form
      ref="composeForm"
      :rules="rules"
      :model="form"
      label-width="100px"
      style="margin: 0 auto; width: 1000px;"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="form.title"
          type="textarea"
          :rows="3"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="所属板块" prop="belong">
        <el-select v-model="form.belong" placeholder="" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="text">
        <editor v-model="form.text" />
      </el-form-item>
      <el-form-item label="相关图片">
        <fileUp v-model="form.pictures" accept="image/*" accept-tips="只能上传图片格式的文件" dir="dir" />
      </el-form-item>
      <el-form-item label="附件">
        <fileUp v-model="form.attachment" dir="dir" />
      </el-form-item>
      <el-form-item label="匿名发帖">
        <el-checkbox v-model="form.anonymous" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('composeForm')">发布</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import { createPost, updatePostById, getPostById } from '@/api/index'
import fileUp from '@/component/fileUp'
import editor from '@/component/editor'
export default {
  components: {
    fileUp,
    editor
  },
  data () {
    return {
      form: {
        title: '',
        belong: '',
        text: '',
        pictures: '',
        attachment: '',
        anonymous: false
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        belong: [
          { required: true, message: '请选择所属板块', trigger: 'change' }
        ],
        text: [
          { required: true, message: '请输入正文', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route: function () {
      if (!this.$route.query.id) {
        this.form = {
          title: '',
          belong: '',
          text: '',
          pictures: '',
          attachment: '',
          anonymous: false
        }
      }
    }
  },
  mounted: function () {
    const id = this.$route.query.id
    if (id) {
      getPostById(id).then(res => {
        this.form = res
      })
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            const id = this.$route.query.id
            updatePostById(id, this.form).then(res => {
              this.$message.success('修改成功')
              this.$router.push({ path: '/mfs-forum' })
            })
          } else {
            createPost(this.form).then(res => {
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
