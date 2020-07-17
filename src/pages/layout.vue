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
import { getMesSummary } from '@/api/index'
export default {
  components: {
    navbar
  },
  beforeCreate () {
    getMesSummary().then(res => {
      this.$store.commit('getNoticeNum', res.messageCount)
    })
  }
}
</script>
