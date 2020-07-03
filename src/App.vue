<template>
  <div id="app-forum" class="app-forum">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app-forum{
  overflow: scroll;
    height: 100%;
}
</style>
