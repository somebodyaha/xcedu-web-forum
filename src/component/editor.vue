<template>
  <section>
    <editor
      v-model="htmlContent"
      :init="{
        height: 500,
        language: 'zh_CN',
        language_url: publicPath + 'tinymce/langs/zh_CN.js',
        skin: 'oxide',
        skin_url: publicPath + 'tinymce/skins/ui/oxide',
        content_css: publicPath + 'tinymce/skins/content/default/content.css',
        menubar: true,
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | \
          image',
        plugins: [
          'image'
        ],
        images_upload_url: '/xcadmin/comp/attachment/upload',
        images_reuse_filename: true
      }"
      @input="editorChange"
    />
  </section>
</template>

<script>
// Import TinyMCE
import 'tinymce/tinymce'
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'
// A theme is also required
import 'tinymce/themes/silver'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/image'
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      publicPath: process.env.WEB_PUBLIC_PATH,
      htmlContent: ''
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.htmlContent = this.value
    }
  },
  mounted () {
    this.htmlContent = this.value
  },
  methods: {
    editorChange () {
      this.$emit('input', this.htmlContent)
    }
  }
}
</script>
