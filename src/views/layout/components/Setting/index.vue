<script setup>
import { useResize } from '@/hooks/resize'

const open = ref(false)

const { isMobile } = useResize()
</script>

<template>
  <div class="toolbar-item" @click="open = true">
    <i-lucide-settings />
  </div>

  <el-drawer v-model="open" :size="isMobile ? '100%' : '360px'" title="布局配置">
    <div class="setting-drawer-group">
      <div class="setting-drawer-group__title">主题模式</div>
      <div class="grid grid-cols-3 gap-x-4">
        <div class="flex flex-col items-center gap-y-2">
          <div
            class="w-full h-14 flex justify-center items-center outline outline-solid outline-[#e4e4e7] hover:outline-2 hover:outline-(--el-color-primary) rounded-md cursor-pointer"
          >
            <i-lucide-sun class="size-5" />
          </div>
          <div class="text-xs text-[#71717a]">浅色</div>
        </div>

        <div class="flex flex-col items-center gap-y-2">
          <div
            class="w-full h-14 flex justify-center items-center outline outline-solid outline-[#e4e4e7] hover:outline-2 hover:outline-(--el-color-primary) rounded-md cursor-pointer"
          >
            <i-lucide-moon class="size-5" />
          </div>
          <div class="text-xs text-[#71717a]">深色</div>
        </div>

        <div class="flex flex-col items-center gap-y-2">
          <div
            class="w-full h-14 flex justify-center items-center outline outline-solid outline-[#e4e4e7] hover:outline-2 hover:outline-(--el-color-primary) rounded-md cursor-pointer"
          >
            <i-lucide-monitor class="size-5" />
          </div>
          <div class="text-xs text-[#71717a]">跟随系统</div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="w-full flex gap-x-4">
        <el-button class="w-full !text-xs" type="primary" icon="ep-CopyDocument">复制布局配置</el-button>
        <el-button class="w-full !ml-0 !text-xs" type="info" text>清空缓存 & 刷新页面</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.setting-drawer-group {
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  .setting-drawer-group__title {
    font-size: 14px;
    line-height: 20px;
    color: #323639;
    font-weight: 500;
  }
}
</style>
