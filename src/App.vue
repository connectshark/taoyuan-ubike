<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="css">
html,body {
  padding: 0;
  margin: 0;
  font-family: 'Microsoft YaHei, 微软雅黑, 微軟正黑體, Microsoft JhengHei,Arial, -apple-system,openhuninn,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif';
}
</style>
