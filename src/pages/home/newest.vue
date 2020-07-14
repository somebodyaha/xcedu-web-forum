<template>
  <section style="height: 100%;">
    <detail />
  </section>
</template>
<script>
import detail from '@page/components/detail'
export default {
  components: {
    detail
  },
  created () {
    // eslint-disable-next-line no-console
    console.log(this.$store)
  }
}
</script>
