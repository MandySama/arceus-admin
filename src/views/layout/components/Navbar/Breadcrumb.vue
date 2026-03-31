<script setup>
import { indexRoute, isIndexRoute } from '@/router'

const route = useRoute()

const breadcrumbList = computed(() => {
  return [indexRoute, ...route.matched.filter((item) => item.meta.title && !isIndexRoute(item))]
})
</script>

<template>
  <el-breadcrumb class="block max-lg:hidden">
    <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.path">
      <router-link v-if="isIndexRoute(breadcrumb)" class="!font-normal" :to="breadcrumb.path">
        {{ breadcrumb.meta.title }}
      </router-link>
      <span v-else>{{ breadcrumb.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-breadcrumb {
  padding: 0 8px;

  :deep(.el-breadcrumb__separator) {
    font-weight: 400;
  }
}
</style>
