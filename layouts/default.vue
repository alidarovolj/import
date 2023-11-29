<script lang="ts" setup>
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Header />
    <div class="overflow-y-auto">
      <slot />
    </div>
    <Footer />
  </div>
</template>
