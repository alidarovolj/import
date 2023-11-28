<script setup lang="ts">
import {IconSearch} from "@tabler/icons-vue";
import {useCatalogListStore} from "~/store/catalog";

const searchWork = ref(null)
const catalog = useCatalogListStore()
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div class="relative w-full lg:w-1/5 mb-2 lg:mb-0">
    <IconSearch class="absolute left-3 top-1/2 -translate-y-1/2 text-mainColor z-10"/>
    <div class="relative h-full">
      <input
          @input="catalog.search(searchWork)"
          type="text"
          v-model="searchWork"
          class="py-3 lg:py-0 bg-white pl-12 h-full border-2 border-bColor rounded w-full"
          placeholder="Введите название товара">
      <div
          style="box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.49);"
          class="absolute left-0 top-full w-full h-max bg-white"
          v-if="catalog.searchData">
        <NuxtLink
            @click="searchWork = null; catalog.searchData = null"
            :to="'/products/' + item.id"
            class="p-2 flex items-center hover:bg-mainColor hover:text-white transition-all"
            v-for="(item, index) of catalog.searchData.products.data"
            :key="index">
          <img class="w-10 h-10 object-contain mr-3" :src="runtimeConfig.public.IMAGE_LINK + item.images[0]" alt="">
          <p class="text-sm font-semibold">
            {{ item.name }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>