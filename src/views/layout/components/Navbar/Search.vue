<script setup>
import { useResize } from '@/hooks/resize'
import { useUserInfoStore } from '@/stores/userInfo'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'

const open = ref(false)

const { isMobile } = useResize()

const searchRef = ref()

const keyword = ref('')

const userInfoStore = useUserInfoStore()
const { routeList: menuList } = storeToRefs(userInfoStore)
const searchItem = computed(() => {
  return getSearchItem(menuList.value)
})

const searchResult = ref([])

const activeIndex = ref(0)

const router = useRouter()

watch(
  () => open.value,
  () => {
    if (open.value) {
      keyword.value = ''
      searchResult.value = []
      activeIndex.value = 0
      requestAnimationFrame(() => {
        searchRef.value.focus()
      })
    }
  }
)

watch(
  () => keyword.value,
  () => {
    if (keyword.value.trim()) {
      handleSearch()
    } else {
      searchResult.value = []
      activeIndex.value = 0
    }
  }
)

const getSearchItem = (_menuList) => {
  return _menuList.flatMap((item) => {
    if (item.menuType === 'dir') {
      return getSearchItem(item.children)
    } else {
      return item
    }
  })
}

const handleSearch = useDebounceFn(() => {
  searchResult.value = menuList.value
  activeIndex.value = 0
}, 200)

const onMouseenter = (index) => {
  activeIndex.value = index
}

const handleEnter = () => {
  if (!open.value || searchResult.value.length === 0) return
  open.value = false
  router.push(searchResult.value[activeIndex.value].routePath)
}

const scrollToView = () => {
  const searchResultItemElement = document.querySelector(`[data-search-result-item="${activeIndex.value}"]`)
  searchResultItemElement.scrollIntoView({ block: 'nearest' })
}

const handleArrowUp = () => {
  if (!open.value || searchResult.value.length === 0) return
  activeIndex.value--
  if (activeIndex.value < 0) {
    activeIndex.value = searchResult.value.length - 1
  }
  scrollToView()
}

const handleArrowDown = () => {
  if (!open.value || searchResult.value.length === 0) return
  activeIndex.value++
  if (activeIndex.value > searchResult.value.length - 1) {
    activeIndex.value = 0
  }
  scrollToView()
}

onMounted(() => {
  onKeyStroke('k', (event) => {
    if (event.ctrlKey) {
      event.preventDefault()
      open.value = true
    }
  })
  onKeyStroke('Enter', handleEnter)
  onKeyStroke('ArrowUp', handleArrowUp)
  onKeyStroke('ArrowDown', handleArrowDown)
})
</script>

<template>
  <div
    class="toolbar-item md:mr-3 px-2 h-8 flex items-center gap-x-2 md:bg-[#f4f4f5] text-xs md:!text-[#71717a] md:hover:!text-[#323639] rounded-2xl cursor-pointer"
    @click="open = true"
  >
    <i-lucide-search class="size-4" />
    <span class="max-md:hidden md:block">搜索</span>
    <div class="px-1.5 py-1 max-md:hidden md:flex bg-white rounded-l-sm rounded-r-xl">
      <kbd class="leading-none">Ctrl K</kbd>
    </div>
  </div>

  <el-dialog
    style="--el-dialog-padding-primary: 0"
    v-model="open"
    width="600px"
    top="10vh"
    :fullscreen="isMobile"
    destroy-on-close
  >
    <template #header>
      <div class="px-4 py-2 flex items-center border-b-1 border-b-solid border-b-[#e4e4e7]">
        <i-lucide-search class="size-4 mr-2 text-[#71717a]" />
        <input
          ref="searchRef"
          class="w-4/5 p-1.5 pl-0 text-sm placeholder:text-[#71717a] text-[#323639] outline-none"
          v-model="keyword"
          placeholder="搜索菜单"
        />
      </div>
    </template>
    <div class="md:min-h-[148px] md:max-h-[284px] max-md:h-full py-3 overflow-y-hidden">
      <div v-if="searchResult.length === 0" class="h-[124px] flex justify-center items-center text-xs text-[#71717a]">
        暂无搜索结果
      </div>
      <el-scrollbar v-else :max-height="isMobile ? '' : '260px'">
        <ul class="h-full px-4 flex flex-col gap-y-3">
          <li
            v-for="(item, index) in searchResult"
            :key="item.routePath"
            class="px-4 py-4 flex items-center gap-x-2 bg-[#f4f4f5] text-[#323639] rounded-lg cursor-pointer"
            :class="index === activeIndex && ['!bg-(--el-color-primary)', 'text-white']"
            :data-search-result-item="index"
            @mouseenter="onMouseenter(index)"
            @click="handleEnter"
          >
            <el-icon :size="16">
              <component :is="item.icon"></component>
            </el-icon>
            <span class="flex-1 text-base">{{ item.menuName }}</span>
            <i-mdi-arrow-left-bottom class="size-4" />
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="px-4 py-2 flex items-center gap-x-4 border-t-1 border-t-solid border-t-[#e4e4e7]">
        <div class="search-modal-footer-item">
          <div class="search-modal-footer-icon">
            <i-mdi-arrow-left-bottom />
          </div>
          <span class="search-modal-footer-title">选择</span>
        </div>
        <div class="search-modal-footer-item">
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
:deep(.el-scrollbar__bar) {
  &.is-vertical {
    top: 0;
    right: 10px;
  }
}

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
