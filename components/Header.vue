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
    link: "/products"
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
  <div
      :class="{ 'translate-y-0' :menuMain }"
      class="fixed top-0 left-0 z-50 bg-white w-full h-full -translate-y-full transition-all"
  >
    <div class="pt-56">
      <Button
          v-for="(item, index) of links"
          :key="index"
          :link="item.link"
          :title="item.title"
          class="mx-5 mb-3 relative text-xl block"
          @click="menuMain = false"
      />
    </div>
  </div>
  <div class="relative z-50 bg-white header">
    <div class="relative z-40 bg-white">
      <div class="border-b border-bColor">
        <div class="container mx-auto px-4 lg:px-0 py-4">
          <div class="flex items-center justify-between text-sm font-bold">
            <div class="flex items-center">
              <IconMenu2 class="block lg:hidden mr-3" size="20" @click="menuMain = !menuMain"/>
              <NuxtLink to="/">
                <img alt="" src="@/assets/img/logo.png">
              </NuxtLink>
            </div>
            <div class="header flex items-center">
              <div class="hidden lg:flex items-center">
                <Button
                    v-for="(item, index) of links"
                    :key="index"
                    :class="{ 'ml-10' : index === 0 }"
                    :link="item.link"
                    :title="item.title"
                    class="mx-5 line relative text-xl"
                />
              </div>
            </div>
            <a
                class="flex items-center bg-mainColor text-white w-max px-3 py-2 rounded"
                href="tel:+77472367503">
              <IconPhone class="lg:mr-2" size="24"/>
              <p class="hidden text-base lg:block w-max font-semibold text-white">
                Заказать звонок
              </p>
            </a>
          </div>
        </div>
      </div>
      <div class="border-b border-bColor bg-[#FAFAFA]">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="flex flex-col-reverse lg:flex-row justify-between py-4">
            <div
                class="flex items-center bg-[#F3C837] text-white px-20 py-2 rounded text-base w-full lg:w-max font-semibold cursor-pointer"
                @click="menu = !menu">
              <IconLayoutGrid class="mr-3 block" size="16"/>
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
        :class="{ 'translate-y-0 !h-96 overflow-y-scroll' : menu }"
        class="absolute left-0 top-full bg-white py-5 z-20 w-full h-0 lg:h-96 -translate-y-full transition-all overflow-y-hidden"
        style="box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.49);">
      <div v-if="catalog.accData" class="container mx-auto px-4 lg:px-0 h-full">
        <div class="block lg:flex flex-wrap justify-between h-full">
          <div v-for="(item, index) of catalog.accData" :key="index" class="w-full lg:w-fourth">
            <NuxtLink
                :to="'/categories/' + item.id"
                class="text-mainColor block font-semibold mb-4"
                @click="menu = false">
              {{ item.category_name }}
            </NuxtLink>
            <div class="mb-7">
              <NuxtLink
                  v-for="(child, ind) of item.children"
                  :key="ind"
                  :to="'/categories/' + child.id"
                  class="text-sm mb-2" @click="menu = false">
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