<script setup>
const props = defineProps(['link', 'title'])
</script>

<template>
  <NuxtLink
      class="line relative"
      :to="link"
  >
    {{ title }}
    <div class="line_after"></div>
  </NuxtLink>
</template>

<style>
.line_after {
  width: 0;
  transition: all 0.5s;
}

.line:hover .line_after {
  position: absolute;
  top: 100%;
  width: 40% !important;
  height: 1.5px;
  background: #1A1A1A;
  right: 50%;
  transform: translateX(50%);
}
</style>