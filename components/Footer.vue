<script setup>
import { IconArrowNarrowUp } from "@tabler/icons-vue"

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
</script>

<template>
  <div class="py-14 relative">
    <img class="absolute w-full h-full top-0 left-0 object-cover" src="@/assets/img/footer/bg.png" alt="">
    <div class="container mx-auto px-4 lg:px-0 text-white">
      <div class="relative z-10">
        <div class="block lg:flex justify-between items-center">
          <div>
            <img class="mb-4" src="@/assets/img/footer/logo.png" alt="">
            <p class="font-bold">Get in touch</p>
          </div>
          <div class="block lg:flex my-5 lg:my-0">
            <Button
                v-for="(item, index) of links"
                :key="index"
                class="block w-max mb-3 lg:mb-0 mx-auto lg:mx-5 px-5 py-4 rounded-lg line relative bg-white text-mainColor text-base font-semibold"
                :link="item.link"
                :title="item.title"
            />
          </div>
          <div class="flex flex-col justify-between font-bold">
            <a href="mailto:info@BRIC.com">info@BRIC.com</a>
            <a href="tel:+77777777777">+7 777 777 77 77</a>
          </div>
        </div>
        <div class="border-b border-white my-5"></div>
        <div class="flex items-center justify-between font-semibold">
          <p>© 2023</p>
          <div class="flex items-center">
            <p class="uppercase">go all the way up </p>
            <IconArrowNarrowUp />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>