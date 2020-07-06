<template>
  <section class="index">
    <detail />
  </section>
</template>

<script>
import detail from '@page/components/detail'
export default {
  components: {
    detail
  }
}
</script>

<style scoped>
  .index{
    overflow: scroll;
    height: 100%;
  }
</style>
