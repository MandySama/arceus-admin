<script setup>
import { useResize } from '@/hooks/resize'

const { isMobile } = useResize()

const open = ref(false)

const keyword = ref('')
</script>

<template>
  <div
    class="toolbar-item mr-4 max-md:mr-1 gap-x-2 md:!text-[#71717a] md:hover:!text-[#323639] md:bg-[#f4f4f5]"
    @click="open = true"
  >
    <i-lucide-search />
    <span class="hidden md:block text-xs">搜索</span>
    <div class="px-1.5 py-1 hidden md:flex bg-white rounded-l-sm rounded-r-xl">
      <kbd class="text-xs leading-none">Ctrl K</kbd>
    </div>
  </div>

  <el-dialog style="--el-dialog-padding-primary: 0" v-model="open" :width="600" :fullscreen="isMobile">
    <template #header>
      <div class="px-4 py-2 flex items-center border-b-1 border-b-solid border-b-[#e4e4e7]">
        <i-lucide-search class="size-4 mr-2 text-[#71717a]" />
        <input
          class="w-4/5 p-1.5 pl-0 text-sm placeholder:text-[#71717a] text-[#323639] outline-none"
          v-model="keyword"
          placeholder="搜索菜单"
        />
      </div>
    </template>
    <div class="h-40">
      <div class="size-full flex justify-center items-center text-xs text-[#71717a]">暂无搜索结果</div>
    </div>
    <template #footer>
      <div class="px-4 py-2 flex items-center border-t-1 border-t-solid border-t-[#e4e4e7]">
        <div class="mr-4 search-modal-footer-item">
          <div class="search-modal-footer-icon">
            <i-mdi-arrow-left-bottom />
          </div>
          <span class="search-modal-footer-title">选择</span>
        </div>
        <div class="mr-4 search-modal-footer-item">
          <div class="search-modal-footer-icon">
            <i-mdi-arrow-up />
          </div>
          <div class="search-modal-footer-icon">
            <i-mdi-arrow-bottom />
          </div>
          <span class="search-modal-footer-title">切换</span>
        </div>
        <div class="search-modal-footer-item">
          <div class="search-modal-footer-icon">
            <i-mdi-keyboard-esc />
          </div>
          <span class="search-modal-footer-title">关闭</span>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.search-modal-footer-item {
  display: flex;
  align-items: center;
  color: #323639;

  .search-modal-footer-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    box-shadow:
      #cdcde6 0 -2px inset,
      #fff 0 0 1px 1px inset,
      #1e235a66 0 1px 2px 1px;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  .search-modal-footer-title {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
