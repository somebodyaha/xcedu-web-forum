<template>
  <section class="app-forum">
    <navbar />
    <div class="app-forum-container">
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
