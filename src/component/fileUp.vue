<template>
  <section>
    <el-upload
      class="upload-demo"
      action=""
      :accept="fileAccept"
      :multiple="isMutiple"
      :file-list="fileList"
      :show-file-list="isShowList"
      :disabled="isDisabled"
      :before-upload="beforeUpload"
      :http-request="fileUpLoad"
      :on-change="fileChange"
      :on-progress="uploadProgress"
      :on-success="uploadOnSuccess"
    >
      <el-button type="primary" size="small">上传<i class="el-icon-upload el-icon--right" /></el-button>
    </el-upload>
    <em class="size-small">{{ acceptTips }}</em>
    <div class="file-container">
      <div v-for="(file, index) in fileList" :key="file.id">
        <img src="@/assets/excel.png" alt="">
        <div>
          <p>
            <span>{{ file.name }}</span>
            <strong>{{ file.size }}</strong>
          </p>
          <p v-if="file.status === 'success'">
            <a :href="file.relativeUrl" class="color">下载</a>
            <a :href="file.viewUrl" class="color">预览</a>
            <el-button type="text" @click="delFile(index)">删除</el-button>
          </p>
        </div>
        <span v-if="file.progress !== '100'" :style="{ width: file.progress + '%' }" class="file-process-bar" />
      </div>
    </div>
  </section>
</template>
<script>
import { axios } from '@xcedu/web-share'
export default {
  props: {
    // 是否一次可选择多个文件上传
    mutiple: {
      type: Boolean,
      default: true
    },
    // 上传接受文件的类型
    accept: {
      type: String,
      default: ''
    },
    // 上传指定目录
    dir: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 允许最大上传个数
    limit: {
      type: Number,
      default: 100
    },
    // 默认不显示
    showList: {
      type: Boolean,
      default: false
    },
    acceptTips: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 文件展示列表
      fileList: [],
      // 当前上传的文件
      fileObj: '',
      isMutiple: '',
      isShowList: '',
      isDisabled: '',
      fileDir: '',
      fileAccept: ''
    }
  },
  mounted: function () {
    this.isMutiple = this.mutiple
    this.isShowList = this.showList
    this.isDisabled = this.disabled
    this.fileDir = this.dir
    this.fileAccept = this.accept
  },
  methods: {
    delFile (index) {
      this.$confirm('是否确认删除该附件', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fileList.splice(index, 1)
      })
    },
    fileChange (file) {
      // 获取文件流
      this.fileObj = file.raw
    },
    // 附件上传
    fileUpLoad (file) {
      const formData = new FormData()
      formData.append('file', this.fileObj)
      formData.append('dir', this.fileDir)
      axios.post('/api-file/attachments/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        transformRequest: [function transformRequest (formData) {
          return formData
        }],
        onUploadProgress: function (progressEvent) {
          if (progressEvent.lengthComputable) {
            const progress = parseInt((progressEvent.loaded / progressEvent.total) * 100).toFixed(0)
            // 上传进度回调
            file.onProgress({ percent: progress })
          }
        }
      }).then(res => {
        // 上传成功回调
        file.onSuccess(res, file)
      })
    },
    // 文件添加
    beforeUpload (file) {
      const fileObj = {
        name: file.name,
        size: file.size,
        type: file.type,
        uid: file.uid
      }
      this.fileList.push(fileObj)
    },
    uploadProgress (event, file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.uid === this.fileList[i].uid) {
          this.$set(this.fileList[i], 'progress', event.percent)
        }
      }
    },
    uploadOnSuccess (res, file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.uid === this.fileList[i].uid) {
          this.$set(this.fileList[i], 'status', 'success')
          this.$set(this.fileList[i], 'relativeUrl', res.relativeUrl)
          this.$set(this.fileList[i], 'size', this.getFileSize(res.size))
        }
      }
    },
    getFileSize (size) {
      if (size / 1024 < 1) {
        return '1KB'
      } else if (size / 1024 / 1024 < 1) {
        return (size / 1024).toFixed(1) + 'KB'
      } else if (size / 1024 / 1024 / 1024 < 1) {
        return (size / 1024 / 1024).toFixed(1) + 'MB'
      } else {
        return '>1GB'
      }
    },
    getFileTypeImg (type) {
      if (type.indexOf('image') !== -1) {
        return 'images.png'
      } else if (type === 'text/plain') {
        return 'txt.png'
      } else if (type.indexOf('video') !== -1) {
        return 'video.png'
      } else if (type.indexOf('audio') !== -1) {
        return 'audio.png'
      } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || type === 'application/msword') {
        return 'word.png'
      } else if (type === 'application/x-zip-compressed') {
        return 'zip.png'
      } else if (type === 'application/pdf') {
        return 'pdf.png'
      } else if (type === 'application/x-rar-compressed') {
        return 'rar.png'
      } else if (type === 'application/x-xls' || type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return 'excel.png'
      } else if (type === 'application/x-ppt' || type === 'application/vnd.ms-powerpoint' || type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        return 'ppt.png'
      }
    }
  }
}
</script>
