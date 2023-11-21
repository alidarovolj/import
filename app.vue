<script setup>
const layout = "default";
const {locale} = useI18n();

useHead({
  htmlAttrs: {
    'data-theme': 'light'
  }
})
</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtLoadingIndicator color="#3E46FF"/>
      <div class="bg-qwerty text"></div>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
