<script setup>
import { useResize } from '@/hooks/resize'
import { useUserInfoStore } from '@/stores/userInfo'
import { onKeyStroke } from '@vueuse/core'

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

const getSearchItem = (_menuList, parentName = '') => {
  return _menuList.flatMap((item) => {
    if (item.menuType === 'dir') {
      return getSearchItem(item.children, parentName || item.menuName)
    } else {
      return {
        ...item,
        fullName: parentName ? [parentName, '>', item.menuName] : [item.menuName],
      }
    }
  })
}

const handleSearch = () => {
  searchResult.value = searchItem.value.filter((item) => item.menuName.includes(keyword.value))
  activeIndex.value = 0
}

const onMouseenter = (index) => {
  activeIndex.value = index
}

const highlightName = (name, index) => {
  return name.replace(
    keyword.value,
    `<mark class="bg-transparent ${activeIndex.value === index ? 'text-white border-b-2 border-b-solid border-b-white' : 'text-(--el-color-primary)'}">${keyword.value}</mark>`
  )
}

const handleEnter = () => {
  if (!open.value || !searchResult.value.length) return
  open.value = false
  router.push(searchResult.value[activeIndex.value].routePath)
}

const scrollToView = () => {
  const searchResultItemElement = document.querySelector(`[data-search-result-item="${activeIndex.value}"]`)
  searchResultItemElement.scrollIntoView({ block: 'nearest' })
}

const handleArrowUp = () => {
  if (!open.value || !searchResult.value.length) return
  activeIndex.value--
  if (activeIndex.value < 0) {
    activeIndex.value = searchResult.value.length - 1
  }
  scrollToView()
}

const handleArrowDown = () => {
  if (!open.value || !searchResult.value.length) return
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
    class="toolbar-item sm:mr-3 px-2 h-8 flex items-center gap-x-2 sm:bg-(--accent) text-xs sm:!text-(--muted-foreground) sm:hover:!text-(--foreground) rounded-2xl cursor-pointer"
    @click="open = true"
  >
    <i-lucide-search class="size-4" />
    <span class="sm:block max-sm:hidden">搜索</span>
    <div class="px-1.5 py-1 sm:flex max-sm:hidden bg-(--background) rounded-l-sm rounded-r-xl">
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
      <div class="h-12 px-4 py-2 flex items-center border-b-1 border-b-solid border-b-(--border)">
        <i-lucide-search class="size-4 mr-2 text-(--muted-foreground)" />
        <input
          ref="searchRef"
          class="w-4/5 p-1.5 pl-0 text-sm placeholder:text-(--muted-foreground) text-(--foreground) outline-none"
          v-model="keyword"
          placeholder="搜索菜单"
        />
      </div>
    </template>
    <div class="sm:min-h-[148px] sm:max-h-[284px] max-sm:h-full py-3 overflow-y-hidden">
      <div
        v-if="!searchResult.length"
        class="h-[124px] flex justify-center items-center text-xs text-(--muted-foreground)"
      >
        暂无搜索结果
      </div>
      <el-scrollbar v-else :max-height="isMobile ? '' : '260px'">
        <ul class="h-full px-4 flex flex-col gap-y-3">
          <li
            v-for="(item, index) in searchResult"
            :key="item.routePath"
            class="px-4 py-4 flex items-center gap-x-2 bg-(--accent) text-(--foreground) rounded-lg cursor-pointer"
            :class="index === activeIndex && ['!bg-(--el-color-primary)', 'text-white']"
            :data-search-result-item="index"
            @mouseenter="onMouseenter(index)"
            @click="handleEnter"
          >
            <icon class="size-4" :icon="item.icon"></icon>
            <div class="flex-1 flex gap-x-1 text-base">
              <template v-for="(name, _index) in item.fullName" :key="name">
                <span v-if="_index === item.fullName.length - 1" v-html="highlightName(name, index)"></span>
                <span v-else>{{ name }}</span>
              </template>
            </div>
            <i-mdi-arrow-left-bottom class="size-4" />
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="h-9 px-4 py-2 flex items-center gap-x-4 border-t-1 border-t-solid border-t-(--border)">
        <div class="search-modal-footer-item">
          <div class="search-modal-footer-item__icon">
            <i-mdi-arrow-left-bottom />
          </div>
          <span class="search-modal-footer__title">选择</span>
        </div>
        <div class="search-modal-footer-item">
          <div class="search-modal-footer-item__icon">
            <i-mdi-arrow-up />
          </div>
          <div class="search-modal-footer-item__icon">
            <i-mdi-arrow-bottom />
          </div>
          <span class="search-modal-footer__title">切换</span>
        </div>
        <div class="search-modal-footer-item">
          <div class="search-modal-footer-item__icon">
            <i-mdi-keyboard-esc />
          </div>
          <span class="search-modal-footer__title">关闭</span>
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
  color: var(--foreground);

  .search-modal-footer-item__icon {
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

  .search-modal-footer__title {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
