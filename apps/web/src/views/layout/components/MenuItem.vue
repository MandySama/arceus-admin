<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const handleMenuClick = (item) => {
  router.push(item.routePath)
}
</script>

<template>
  <el-menu-item
    v-if="item.menuType === 'menu'"
    :index="item.routePath"
    @click="handleMenuClick(item)"
  >
    <el-icon>
      <icon :icon="item.icon"></icon>
    </el-icon>
    <template #title>
      <span>{{ item.menuName }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.routePath">
    <template #title>
      <el-icon>
        <icon :icon="item.icon"></icon>
      </el-icon>
      <span>{{ item.menuName }}</span>
    </template>
    <menu-item
      v-for="childItem in item.children"
      :key="childItem.menuId"
      :item="childItem"
    ></menu-item>
  </el-sub-menu>
</template>

<style scoped></style>
