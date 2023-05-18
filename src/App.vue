<script setup>
  import HelloWorld from './components/HelloWorld.vue';
  import Layout from './layouts/index.vue';
</script>

<template>
  <a-config-provider>
    <Layout>
      <RouterView />
    </Layout>
  </a-config-provider>
</template>

<style scoped>
</style>
