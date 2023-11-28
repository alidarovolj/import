<script setup>
import {useProductsListStore} from "~/store/products.js";
import {useCatalogListStore} from "~/store/catalog.js";

const catalog = useCatalogListStore()

const route = useRoute()
const products = useProductsListStore()
const runtimeConfig = useRuntimeConfig();

const specCatalog = ref(null)
const breadcrumbs = ref([
  {
    to: "/",
    name: "Главная"
  }
])


onMounted(async () => {
  await nextTick()
  await products.getProducts(route.params.id)
  await catalog.getCatalog()
  specCatalog.value = catalog.accData.find((item) => item.id === parseInt(route.params.id))
  breadcrumbs.value.push({
    to: "/categories/" + route.params.id,
    name: specCatalog.value.category_name
  })
})
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 pt-6 pb-24">
    <Breadcrumbs
        :getLinks="breadcrumbs"
        class="mb-6"
    />
    <div v-if="products.accData" class="block lg:flex items-start justify-between">
      <div
          class="w-full lg:w-1/5 mr-5 bg-white rounded px-4 py-5"
          style="box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.05);">
        <div v-for="(item, index) of products.accData.filters" :key="index">
          <div class="flex items-center mb-4">
            <p class="text-mainColor font-semibold whitespace-nowrap mr-3">
              {{ item.caption }}
            </p>
            <div class="border-b border-mainColor w-full"></div>
          </div>
          <div class="flex items-center mb-4" v-for="(filter, index) of item.values" :key="index">
            <input type="checkbox" class="checkbox mr-4">
            <p>{{ filter.value }}</p>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/5">
        <div>
          <div v-if="products.accData.products" class="flex justify-between flex-wrap">
            <NuxtLink
                v-for="(product, index) of products.accData.products.data"
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
      </div>
    </div>
  </div>
</template>