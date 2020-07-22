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
            <a :href="file.relativeUrl" class="color">预览</a>
            <el-button type="text" @click="delFile(index)">删除</el-button>
          </p>
        </div>
        <span v-if="file.progress !== '100'" :style="{ width: file.progress + '%' }" class="file-process-bar" />
      </div>
    </div>
  </section>
</template>
<script>
import { uploadResource } from '@/api/index'
import OSS from 'ali-oss'
import { v4 as uuidv4 } from 'uuid'
let PATH = null
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
      default: 'anonymous'
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
    },
    domainId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      client: null,
      // 文件展示列表
      fileList: [],
      // 当前上传的文件
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
    },
    // 文件添加
    beforeUpload (file) {
      if (file.name.indexOf('.') === -1) {
        this.$message.error('禁止上传无格式的文件！')
        return false
      }
    },
    // 附件上传
    fileUpLoad (file) {
      if (!PATH) {
        PATH = this.domainId + '/' + (this.dir || 'anonymous') + '/'
      }
      if (!this.client) {
        this.client = new OSS({
          region: 'oss-cn-shenzhen',
          accessKeyId: 'LTAI4G2nbEWcDi9djnDY8tvJ',
          accessKeySecret: 'ZZN02tVv7BpJEhc5bWa2NlNIdL6Vvp',
          bucket: 'gtyzfile'
        })
      }
      const fileName = uuidv4().replace(/-/g, '') + file.file.name.substring(file.file.name.lastIndexOf('.'))
      return this.client.multipartUpload(PATH + fileName, file.file, {
        progress: function (p) {
          file.onProgress({ percent: p * 100 })
        }
      }).then(function (res) {
        file.onSuccess(res, file)
      }).catch(err => {
        window.console.log(err)
      })
    },
    uploadProgress (event, file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.uid === this.fileList[i].uid) {
          this.$set(this.fileList[i], 'progress', event.percent)
        }
      }
    },
    uploadOnSuccess (res, file) {
      if (!res) {
        return
      }
      const fileUuid = res.name.substring(res.name.lastIndexOf('/')).replace('/', '').replace(/\..*/, '')
      uploadResource({
        // contentType: 'string',
        displayName: file.name,
        // fileName: 'string',
        fileSize: file.size,
        id: fileUuid,
        // link2: res.res.requestUrls[0],
        relativePath: PATH
        // suffixName: '.mp4'
        // uploadIp: 'string'
      }).then(res2 => {
        for (let i = 0; i < this.fileList.length; i++) {
          if (file.uid === this.fileList[i].uid) {
            this.$set(this.fileList[i], 'status', 'success')
            this.$set(this.fileList[i], 'relativeUrl', res2.url)
            this.$set(this.fileList[i], 'size', this.getFileSize(file.size))
          }
        }
      })
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
