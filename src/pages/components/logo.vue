<template>
  <img :src="imgPath" class="logo">
</template>
<script>
export default {
  name: 'Logo',
  data () {
    return {
      imgPath: ''
    }
  }
}
</script>
