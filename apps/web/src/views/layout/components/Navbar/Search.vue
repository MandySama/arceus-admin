<script setup>
const dialogVisible = ref(true)

const keyword = ref('')
</script>

<template>
  <div
    class="group hover:bg-accent md:bg-accent flex h-8 cursor-pointer items-center gap-x-2 rounded-2xl px-2"
    @click="dialogVisible = true"
  >
    <i-lucide-search
      class="text-foreground group-hover:text-accent-foreground md:text-muted-foreground md:group-hover:text-foreground size-4"
    />
    <span class="text-muted-foreground group-hover:text-foreground hidden text-xs md:block">
      搜索
    </span>
    <div
      class="bg-background text-muted-foreground group-hover:text-foreground hidden rounded-l-sm rounded-r-xl px-1.5 py-1 text-xs leading-none md:block"
    >
      <kbd>Ctrl K</kbd>
    </div>
  </div>

  <el-dialog v-model="dialogVisible">
    <template #header>
      <div class="flex h-full items-center">
        <i-lucide-search class="text-muted-foreground mr-2 size-4" />
        <input
          v-model="keyword"
          class="placeholder:text-muted-foreground text-foreground w-4/5 pr-2 text-sm outline-none"
          placeholder="搜索菜单"
        />
      </div>
    </template>
    <div class="h-44"></div>
    <template #footer>
      <div class="text-foreground flex h-full items-center gap-x-4">
        <div class="search-dialog__shortcut">
          <div class="search-dialog__shortcut-key">
            <i-mdi-arrow-left-bottom />
          </div>
          <span class="search-dialog__shortcut-label">选择</span>
        </div>
        <div class="search-dialog__shortcut">
          <div class="search-dialog__shortcut-key">
            <i-mdi-arrow-up />
          </div>
          <div class="search-dialog__shortcut-key">
            <i-mdi-arrow-bottom />
          </div>
          <span class="search-dialog__shortcut-label">切换</span>
        </div>
        <div class="search-dialog__shortcut">
          <div class="search-dialog__shortcut-key">
            <i-mdi-keyboard-esc />
          </div>
          <span class="search-dialog__shortcut-label">关闭</span>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.search-dialog__shortcut {
  display: flex;
  align-items: center;

  .search-dialog__shortcut-key {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    border-radius: 2px;
    box-shadow:
      inset 0 -2px #cdcde6,
      inset 0 0 1px 1px #fff,
      0 1px 2px 1px #1e235a66;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  .search-dialog__shortcut-label {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
