<script setup></script>

<template>
  <div
    class="bg-accent text-muted-foreground hover:text-foreground flex h-8 cursor-pointer items-center gap-x-2 rounded-2xl px-2"
  >
    <i-lucide-search class="size-4" />
    <span class="hidden text-xs md:block">搜索</span>
    <div
      class="bg-background hidden rounded-l-sm rounded-r-xl px-1.5 py-1 text-xs leading-none md:block"
    >
      <kbd>Ctrl K</kbd>
    </div>
  </div>
</template>

<style scoped></style>
