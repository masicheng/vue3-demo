<template>
  <a-layout class="w-full h-full">
    <a-layout-sider>
      <LayoutSide></LayoutSide>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <LayoutHeader></LayoutHeader>
      </a-layout-header>
      <a-layout-content>
        <LayoutContent></LayoutContent>
      </a-layout-content>
      <a-layout-footer> footer </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
  import LayoutContent from './components/LayoutContent.vue';
  import LayoutHeader from './components/LayoutHeader.vue';
  import LayoutSide from './components/LayoutSide.vue';
</script>

<style scoped></style>
