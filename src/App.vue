<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      Currency App
      <span class="nav">
        <router-link to="/currency_converter"><a-button type="link">Конвертор валют</a-button></router-link>
        <router-link to="/currencies"><a-button type="link">Валюты</a-button></router-link>
      </span>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  mounted() {
    this.$router.push("/currency_converter");
  },
};
</script>

<style lang="sass">
body
  min-width: 500px
</style>

<style lang="sass" scoped>
.header
  color: #fff
  font-size: 20px

  .nav
    margin-left: 40px


    a.router-link-exact-active > button
      color: #fff
      background: #1890FF

.layout
  min-height: 100vh

  .content
    padding: 45px
    background: #fff
</style>
