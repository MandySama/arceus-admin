<script setup lang="ts">
const themeModeList = [
  {
    label: '浅色',
    value: 'light',
    icon: 'lucide:sun',
  },
  {
    label: '深色',
    value: 'dark',
    icon: 'lucide:moon',
  },
  {
    label: '跟随系统',
    value: 'system',
    icon: 'lucide:monitor',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-x-4">
    <div v-for="item in themeModeList" :key="item.value" class="flex flex-col items-center gap-y-2">
      <div
        class="w-full h-14 flex justify-center items-center outline outline-solid outline-[#e4e4e7] hover:outline-2 hover:outline-(--el-color-primary) rounded-md cursor-pointer"
      >
        <icon class="size-5 text-[#323639]" :icon="item.icon"></icon>
      </div>
      <div class="text-xs text-[#71717a]">{{ item.label }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
