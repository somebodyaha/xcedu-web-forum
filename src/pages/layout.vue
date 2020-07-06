<template>
  <section class="forum-page">
    <navbar />
    <div class="forum-content">
      <router-view />
    </div>
  </section>
</template>

<script>
import navbar from '@page/components/navbar'
export default {
  components: {
    navbar
  }
}
</script>
<style scoped>
  .forum-page{
    height: 100%;
  }
  .forum-content{
    height: calc(100% - 61px);
  }
</style>
