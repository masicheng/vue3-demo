<template>
  <div>
    <a-layout>
      <a-layout-sider>
        <LayoutSide></LayoutSide>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import LayoutHeader from "./components/LayoutHeader.vue"
import LayoutSide from "./components/LayoutSide.vue"
</script>

<style scoped></style>
