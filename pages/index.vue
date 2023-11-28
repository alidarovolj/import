<script setup>
import {IconArrowNarrowRight, IconChevronRight} from "@tabler/icons-vue"
import {useCatalogListStore} from "~/store/catalog.js";
import {useProductsListStore} from "~/store/products.js";

const catalog = useCatalogListStore()
const runtimeConfig = useRuntimeConfig();
const products = useProductsListStore()

onMounted(async () => {
  await nextTick()
  await catalog.getCatalog()
  await products.getProducts(2)
})
</script>

<template>
  <div class="hero bg-white mb-16">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex flex-col-reverse lg:flex-row items-center justify-between py-10">
        <div class="w-full lg:w-1/3">
          <h1 class="text-4xl text-mainColor leading-[46.29px] mb-7">
            Sonic Bliss Awaits: раскройте свою музыку с помощью наших наушников!
          </h1>
          <div class="flex items-center bg-mainColor text-white px-12 py-3 w-max rounded-xl">
            <p class="text-3xl font-semibold mr-3">В каталог</p>
            <IconArrowNarrowRight size="40"/>
          </div>
        </div>
        <img alt="" class="w-full lg:w-1/2 mb-3 lg:mb-0" src="@/assets/img/hero.png">
      </div>
    </div>
  </div>
  <div class="categories bg-white py-20">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="block lg:flex items-center justify-between mb-14">
        <p class="text-5xl text-mainColor font-semibold mb-2 lg:mb-0">Категории</p>
        <div class="text-secondaryColor flex items-center text-xl">
          <p>посмотреть все</p>
          <IconChevronRight size=""/>
        </div>
      </div>
      <div v-if="catalog.accData" class="block lg:flex justify-between">
        <NuxtLink
            v-for="(item, index) of catalog.accData"
            :key="index"
            :to="'/categories/' + item.id"
            class="relative cursor-pointer mb-3 lg:mb-0 block justify-center">
          <img :src="runtimeConfig.public.IMAGE_LINK + item.image" alt=""
               class="relative z-20 w-[185px] h-[185px] mx-auto mb-4">
          <div v-if="index % 2 === 0"
               class="z-10 w-[185px] h-[185px] left-1/2 -translate-x-1/2 lg:translate-x-0 mx-auto rounded-full bg-mainColor bg-opacity-50 absolute lg:left-0 top-0"></div>
          <div v-else
               class="w-[185px] h-[185px] mx-auto rounded-full bg-secondaryColor bg-opacity-50 absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 top-0"></div>
          <p class="text-center text-xl font-semibold">{{ item.category_name }}</p>
          <p class="text-center text-xs">??? продуктов</p>
        </NuxtLink>
      </div>
      <div v-else class="block lg:flex justify-between">
        <div v-for="(item, index) of 5" :key="index"
             class="w-full lg:w-[185px] h-full lg:h-[185px] mx-auto mb-3 lg:mb-0">
          <div class="skeleton w-[185px] h-[185px] mb-3 mx-auto"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="brands py-36">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="block lg:flex justify-between">
        <div class="w-full lg:w-[45%] bg-mainColor px-11 pt-11">
          <div class="w-full relative">
            <img alt="" class="w-full mb-3 relative z-10" src="@/assets/img/brands/first.png">
            <div class="absolute left-1/2 top-1/2 w-full h-1/2 -translate-x-1/2"
                 style="border-radius: 333px; opacity: 0.5; background: #FFF; filter: blur(112.30000305175781px);"></div>
          </div>
          <p class="text-4xl text-white font-semibold text-center mb-6">Stereo Bliss: Elevate Your Audio Game Now</p>
          <p class="text-mainColor font-semibold w-1/2 rounded-t py-3 bg-white mx-auto text-center">Перейти</p>
        </div>
        <div class="w-full lg:w-[55%]">
          <div class="h-1/2 block lg:flex justify-between">
            <div class="w-full lg:w-1/2 flex flex-col justify-between px-7 py-11">
              <p class="text-4xl font-semibold text-mainColor mb-3 lg:mb-0">Best brands in our shops</p>
              <p class="text-white font-semibold w-full rounded-t py-3 bg-mainColor mx-auto text-center">
                Перейти
              </p>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col justify-between px-7 py-11 relative">
              <img alt="" class="absolute left-0 top-0 w-full h-full" src="@/assets/img/brands/secondBg.png">
              <img alt="" class="w-full h-full object-contain mx-auto relative z-20"
                   src="@/assets/img/brands/second.png">
            </div>
          </div>
          <div class="h-1/2">
            <img alt="" class="w-full h-full" src="@/assets/img/brands/third.png">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="products.accData" class="products">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex justify-between flex-wrap">
        <div class="w-full lg:w-fourth text-mainColor relative flex items-center justify-center mb-20 lg:mb-0">
          <div class="w-[140px] h-[140px]  absolute right-0 bottom-0 bg-mainColor opacity-20 rounded-full z-20"></div>
          <div class="w-[250px] h-[250px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondaryColor opacity-20 rounded-full z-10"></div>
          <div class="relative z-20">
            <p class="text-xl font-semibold">
              shop to
            </p>
            <p class="text-6xl font-semibold">
              Products
            </p>
            <p class="text-2xl font-semibold">
              See all <IconArrowNarrowRight />
            </p>
          </div>
        </div>
        <NuxtLink
            v-for="(product, index) of products.accData.products.data"
            :key="index"
            :to="'/products/' + product.id"
            class="w-full lg:w-fourth mb-5 bg-white rounded px-6 py-3 mt-24 cursor-pointer"
            style="box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.05), 7px 7px 10px 0px rgba(0, 0, 0, 0.15);">
          <img :src="runtimeConfig.public.IMAGE_LINK + product.images[0]" alt=""
               class="h-48 w-full object-contain -mt-24">
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
  <div class="container mx-auto px-4 lg:px-0 py-32">
    <div class="block lg:flex justify-between items-start">
      <div class="w-full lg:w-1/3 mb-10 lg:mb-0">
        <p class="text-6xl font-semibold">Brands</p>
        <div class="block lg:flex items-start">
          <p class="text-6xl font-semibold mr-7">with</p>
          <img alt="" src="@/assets/img/bi.png">
        </div>
        <p class="text-base font-semibold mb-6">
          Discover top-notch brands in-store, where quality meets style. From tech innovations to timeless classics, our
          collection redefines excellence. Elevate your experience with the best of the best.
        </p>
        <p
            class="py-3 w-max px-24 text-2xl font-semibold text-white bg-mainColor text-center"
            style="border-radius: 15px 5px 67px 15px;">
          See more
        </p>
      </div>
      <div class="w-full lg:w-2/3 flex justify-end">
        <img alt="" src="@/assets/img/bi/bg.png">
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  border-bottom: 2px solid rgba(223, 223, 223, 0.50);
  box-shadow: 0px 7px 20px 0px rgba(0, 0, 0, 0.05), 7px 7px 10px 0px rgba(0, 0, 0, 0.15);
}

.categories {
  box-shadow: 0px 7px 20px 0px rgba(0, 0, 0, 0.05), 7px 7px 10px 0px rgba(0, 0, 0, 0.15);
}
</style>