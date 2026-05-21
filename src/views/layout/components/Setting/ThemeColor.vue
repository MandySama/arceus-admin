<script setup>
import { themeColorList } from '@/stores/setting'

const themeColor = defineModel({ default: 'blue' })
</script>

<template>
  <div class="grid grid-cols-3 gap-x-4 gap-y-2">
    <div v-for="item in themeColorList" :key="item.value" class="flex flex-col items-center gap-y-2">
      <div
        class="w-full h-14 flex justify-center items-center outline outline-solid outline-(--border) hover:outline-2 hover:outline-(--el-color-primary) rounded-md cursor-pointer"
        :class="item.value === themeColor && 'outline-2 !outline-(--el-color-primary)'"
        @click="themeColor = item.value"
      >
        <div class="size-5 rounded-md" :style="{ backgroundColor: item.color }"></div>
      </div>
      <div class="text-xs text-(--muted-foreground)">{{ item.label }}</div>
    </div>

    <!--    <div class="flex flex-col items-center gap-y-2">-->
    <!--      <div-->
    <!--        class="w-full h-14 flex justify-center items-center text-(&#45;&#45;muted-foreground) hover:text-(&#45;&#45;foreground) outline outline-solid outline-(&#45;&#45;border) hover:outline-2 hover:outline-(&#45;&#45;el-color-primary) rounded-md cursor-pointer"-->
    <!--      >-->
    <!--        <i-lucide-user-round-pen class="size-5" />-->
    <!--      </div>-->
    <!--      <div class="text-xs text-(&#45;&#45;muted-foreground)">自定义</div>-->
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss"></style>
