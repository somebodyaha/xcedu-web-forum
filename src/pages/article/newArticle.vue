<template>
  <section class="app-forum-create">
    <section class="app-forum-navbar">
      <div>
        <logo />
        <div class="app-forum-navbar-title">
          <h3 class="size-large-x">发帖子</h3>
        </div>
        <el-button type="primary">发布</el-button>
      </div>
    </section>
    <div class="app-forum-container">
      <newArticle />
    </div>
  </section>
</template>
<script>
import newArticle from '@page/components/compose'
export default {
  components: {
    newArticle
  },
  data () {
    return {

    }
  }
}
</script>
