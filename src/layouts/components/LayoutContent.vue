<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script setup>
    
</script>

<style scoped></style>
