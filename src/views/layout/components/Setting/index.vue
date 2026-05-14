<script setup>
import { useResize } from '@/hooks/resize'
import { useSettingStore } from '@/stores/setting'

import ThemeMode from './ThemeMode.vue'

const open = ref(false)

const { isMobile } = useResize()

const settingStore = useSettingStore()
const { themeMode } = storeToRefs(settingStore)
</script>

<template>
  <div class="toolbar-item" @click="open = true">
    <i-lucide-settings />
  </div>

  <el-drawer v-model="open" :size="isMobile ? '100%' : '360px'" title="布局配置">
    <div class="setting-drawer-group">
      <div class="setting-drawer-group__title">主题模式</div>
      <theme-mode v-model="themeMode"></theme-mode>
    </div>
    <template #footer>
      <div class="w-full flex gap-x-4">
        <el-button class="w-full !text-xs" type="primary">
          <template #icon>
            <icon icon="ep:copy-document"></icon>
          </template>
          复制布局配置
        </el-button>
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
