<script setup>
import { useResize } from '@/hooks/resize'
import { useSettingStore } from '@/stores/setting'

import ThemeMode from './ThemeMode.vue'
import ThemeColor from './ThemeColor.vue'

const open = ref(false)

const { isMobile } = useResize()

const settingStore = useSettingStore()
const { themeMode, themeColor } = storeToRefs(settingStore)
</script>

<template>
  <div class="toolbar-item" @click="open = true">
    <i-lucide-settings />
  </div>

  <el-drawer v-model="open" :size="isMobile ? '100%' : '360px'" title="偏好设置">
    <div class="setting-drawer-group !pt-0">
      <div class="setting-drawer-group__title">主题模式</div>
      <theme-mode v-model="themeMode"></theme-mode>
    </div>
    <div class="setting-drawer-group">
      <div class="setting-drawer-group__title">主题色</div>
      <theme-color v-model="themeColor"></theme-color>
    </div>
    <div class="setting-drawer-group">
      <div class="setting-drawer-group__title">其他</div>
    </div>
    <template #footer>
      <div class="w-full flex gap-x-4">
        <el-button class="w-full !text-xs" type="primary">
          <template #icon>
            <icon icon="ep:copy-document"></icon>
          </template>
          复制偏好设置
        </el-button>
        <el-button class="w-full !ml-0 !text-xs" type="info" text>清空缓存 & 刷新页面</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.setting-drawer-group {
  padding-block: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  .setting-drawer-group__title {
    font-size: 14px;
    line-height: 20px;
    color: var(--foreground);
    font-weight: 500;
  }
}
</style>
