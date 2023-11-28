<script setup>
import {IconLayoutGrid, IconMenu2, IconPhone} from "@tabler/icons-vue"
import {useCatalogListStore} from "~/store/catalog.js";
import Search from "~/components/Search.vue";

const links = ref([
  {
    title: "Главная",
    link: "/"
  },
  {
    title: "Продукты",
    link: "/"
  },
])

const menu = ref(false)
const menuMain = ref(false)
const catalog = useCatalogListStore()

onMounted(async () => {
  await nextTick()
  await catalog.getCatalog()
})
</script>

<template>
  <div v-if="menuMain" class="fixed top-0 left-0 z-50 bg-white w-full h-full">
    <div class="pt-56">
      <Button
          v-for="(item, index) of links"
          :key="index"
          @click="menuMain = false"
          class="mx-5 mb-3 line relative text-xl block"
          :link="item.link"
          :title="item.title"
      />
    </div>
  </div>
  <div class="relative z-50 bg-white header">
    <div class="relative z-40 bg-white">
      <div class="border-b border-bColor">
        <div class="container mx-auto px-4 lg:px-0 py-4">
          <div class="flex items-center justify-between text-sm font-bold">
            <div class="flex items-center">
              <IconMenu2 @click="menuMain = !menuMain" class="block lg:hidden mr-3" size="20"/>
              <NuxtLink to="/">
                <img src="@/assets/img/logo.png" alt="">
              </NuxtLink>
            </div>
            <div class="flex items-center">
              <div class="hidden lg:flex items-center">
                <Button
                    v-for="(item, index) of links"
                    :key="index"
                    :class="{ 'ml-10' : index === 0 }"
                    class="mx-5 line relative text-xl"
                    :link="item.link"
                    :title="item.title"
                />
              </div>
            </div>
            <div class="flex items-center bg-mainColor text-white w-max px-3 py-2 rounded">
              <IconPhone class="lg:mr-2" size="24"/>
              <a class="hidden text-base lg:block w-max font-semibold text-white" href="tel:+77472367503" title="sell with us">
                Заказать звонок
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-bColor bg-[#DFDFDF80]">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="flex flex-col-reverse lg:flex-row justify-between py-4">
            <div
                @click="menu = !menu"
                class="flex items-center bg-[#F3C837] text-white px-20 py-2 rounded text-base w-full lg:w-max font-semibold cursor-pointer">
              <IconLayoutGrid size="16" class="mr-3 block"/>
              <p class="">
                Каталог товаров
              </p>
            </div>
            <Search/>
          </div>
        </div>
      </div>
    </div>
    <div
        class="absolute left-0 top-full bg-white py-5 z-20 w-full h-96 -translate-y-full transition-all"
        :class="{ 'translate-y-0' : menu }"
        style="box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.49);">
      <div v-if="catalog.accData" class="container mx-auto px-4 lg:px-0 h-full">
        <div class="block lg:flex flex-wrap justify-between h-full">
          <div class="w-full lg:w-fourth" v-for="(item, index) of catalog.accData" :key="index">
            <NuxtLink
                @click="menu = false"
                :to="'/categories/' + item.id"
                class="text-mainColor block font-semibold mb-4">
              {{ item.category_name }}
            </NuxtLink>
            <div class="mb-7">
              <NuxtLink
                  @click="menu = false"
                  :to="'/categories/' + child.id"
                  class="text-sm mb-2"
                  v-for="(child, ind) of item.children" :key="ind">
                {{ child.category_name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-10 flex items-center justify-center">
        <div class="spinner p-6"></div>
      </div>
    </div>
  </div>
  <div v-if="menu" class="blackBG absolute z-30 left-0 top-0 w-full h-[10000px] bg-black opacity-30"></div>
</template>