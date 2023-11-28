<script setup>
import {useProductsListStore} from "~/store/products.js";

const products = useProductsListStore()
const route = useRoute()
const runtimeConfig = useRuntimeConfig();
const breadcrumbs = ref([
  {
    to: "/",
    name: "Главная"
  }
])

onMounted(async () => {
  await nextTick()
  await products.getProduct(route.params.id)
  await products.getAnalogs(route.params.id)
  // breadcrumbs.value.push({
  //   to: "/categories/" + route.params.id,
  //   name: specCatalog.value.category_name
  // })
})
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 pt-6 pb-24">
    <Breadcrumbs
        :getLinks="breadcrumbs"
        class="mb-6"
    />
    <div v-if="products.product" class="block lg:flex items-start justify-between mb-40 lg:mb-0">
      <div
          class="w-full lg:w-2/3 mb-5 lg:mb-0">
        <div class="bg-white rounded p-5 mb-5"
             style="box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.15);">
          <h1 class="text-2xl text-mainColor font-semibold mb-5">
            {{ products.product.name }}
          </h1>
          <div class="block lg:flex items-start justify-between">
            <div class="w-full lg:w-1/2">
              <img class="py-10 px-11" :src="runtimeConfig.public.IMAGE_LINK + products.product.images[0]" alt="">
            </div>
            <div class="w-full lg:w-1/2">
              <h2 class="text-2xl mb-5 font-bold">
                Характеристика
              </h2>
              <div v-for="(item, index) of products.product.characteristics" class="flex items-end justify-between">
                <p class="whitespace-nowrap">
                  {{ item.caption }}
                </p>
                <div class="border-b border-dotted w-full border-[#7B7B7B] mx-3"></div>
                <p class="whitespace-nowrap font-semibold">
                  {{ item.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded p-5 text-sm"
             style="box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.15);">
          <p class="font-semibold">{{ products.product.description }}</p>
        </div>
      </div>
      <div
          class="w-full lg:w-1/3 bg-white rounded p-5 lg:ml-5"
          style="box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.15);"
      >
        <p class="text-sm text-center border-b pb-6 mb-6">
          {{ products.product.name }}
        </p>
        <p class="text-5xl font-semibold mb-6 text-center">
          ${{ products.product.price }}.00
        </p>
        <div class="flex items-end justify-between mb-6 font-semibold">
          <p class="whitespace-nowrap">
            Доставка
          </p>
          <div class="border-b border-dotted w-full border-[#7B7B7B] mx-3"></div>
          <p class="whitespace-nowrap">
            ???
          </p>
        </div>
        <p class="bg-mainColor text-center py-3 font-semibold text-white rounded-lg">
          Оформить заказ
        </p>
      </div>
    </div>
    <div class="block lg:flex justify-between">
      <NuxtLink
          v-for="(product, index) of products.analogs"
          :key="index"
          :to="'/products/' + product.id"
          class="w-full lg:w-third mb-5 bg-white rounded px-6 py-3 mt-24 cursor-pointer"
          style="box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.05), 7px 7px 10px 0px rgba(0, 0, 0, 0.15);">
        <img class="h-48 w-full object-contain -mt-24" :src="runtimeConfig.public.IMAGE_LINK + product.images[0]"
             alt="">
        <p class="text-base font-semibold mt-6">{{ product.name }}</p>
        <p class="font-semibold text-xs my-4 text-negColor">Артикул: {{ product.article }}</p>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center justify-between w-full">
            <p class="font-semibold">
              ${{ product.price }}.00
            </p>
            <p class="text-white bg-mainColor py-2 px-3 rounded">Заказать</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>