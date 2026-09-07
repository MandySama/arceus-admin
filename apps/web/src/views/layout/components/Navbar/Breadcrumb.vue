<script setup>
import { homeRoute } from '@/router'

const route = useRoute()

const breadcrumbList = computed(() => {
  console.log(route.matched)
  return [homeRoute]
})
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.el-breadcrumb {
  margin-left: 8px;
}
</style>
