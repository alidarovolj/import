<script setup>
import {IconMenu2, IconSearch, IconShoppingBag, IconUser, IconWorld} from "@tabler/icons-vue"

const links = ref([
  {
    title: "artworks",
    link: "/about"
  },
  {
    title: "artists",
    link: "/"
  },
  {
    title: "galleries",
    link: "/"
  },
  {
    title: "blog",
    link: "/"
  }
])
</script>

<template>
  <div class="border-b border-bColor">
    <div class="container mx-auto px-4 lg:px-0 py-4">
      <div class="flex items-center justify-between uppercase text-sm font-bold">
        <div class="flex items-center">
          <div class="flex items-center">
            <IconMenu2 class="block lg:hidden mr-3" size="20"/>
            <img src="@/assets/img/logo.png" alt="">
          </div>
          <div class="hidden lg:flex items-center">
            <Button
                v-for="(item, index) of links"
                :key="index"
                :class="{ 'ml-10' : index === 0 }"
                class="mx-5 line relative"
                :link="item.link"
                :title="item.title"
            />
          </div>
        </div>
        <div class="flex items-center">
          <Button class="mr-10 hidden lg:block" link="/" title="sell with us"/>
          <div class="p-0 lg:p-3">
            <IconSearch size="20"/>
          </div>
          <div class="p-0 lg:p-3 ml-4">
            <IconWorld size="20"/>
          </div>
          <div class="p-0 lg:p-3 ml-4">
            <IconShoppingBag size="20"/>
          </div>
          <div class="p-0 lg:p-3 border border-bColor rounded-full ml-4">
            <IconUser size="20"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>