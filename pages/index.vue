<script setup>
import {Carousel, Navigation, Slide} from "vue3-carousel";
import {IconArrowNarrowRight, IconCheck, IconChevronRight, IconMapPin} from "@tabler/icons-vue"
import {useCatalogListStore} from "~/store/catalog.js";
import {useProductsListStore} from "~/store/products.js";
import {useOrderStore} from "~/store/order.js";

const catalog = useCatalogListStore()
const runtimeConfig = useRuntimeConfig();
const products = useProductsListStore()
const order = useOrderStore()
const selectedProduct = ref(null)

const settings = {
  itemsToShow: 1,
  snapAlign: 'center',
};
const breakpoints = {
  700: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
};

function modalPreConfig(item) {
  order.orderData.product_id = item.id
  selectedProduct.value = item
  my_modal_2.showModal()
}

onMounted(async () => {
  await nextTick()
  await catalog.getCatalog()
  await products.getProducts(2)
})

useHead({
  title: 'Главная страница | Import',
  meta: [{
    property: "og:title",
    content: "Главная страница | Import"
  }, {
    property: "og:description",
    content: "Откройте для себя в магазине первоклассные бренды, где качество сочетается со стилем. От технических инноваций до вечной классики — наша коллекция дает новое определение совершенству. Повысьте свой опыт с лучшими из лучших."
  }, {
    property: "description",
    content: "Откройте для себя в магазине первоклассные бренды, где качество сочетается со стилем. От технических инноваций до вечной классики — наша коллекция дает новое определение совершенству. Повысьте свой опыт с лучшими из лучших."
  }],
});

</script>

<template>
  <div class="hero bg-white mb-16">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex flex-col-reverse lg:flex-row items-center justify-between py-10">
        <div class="w-full lg:w-1/3">
          <h1 class="text-4xl text-mainColor leading-[46.29px] mb-7 font-semibold">
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
        <div class="text-secondaryColor flex items-center text-xl cursor-pointer">
          <p class="" onclick="categories.showModal()">посмотреть все</p>
          <IconChevronRight size=""/>
        </div>
        <dialog id="categories" class="modal">
          <div class="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 class="font-bold text-mainColor text-2xl mb-6">Категории</h3>
            <div class="flex flex-wrap justify-between">
              <div
                  v-for="(item, index) in catalog.accData"
                  :key="index"
                  class="relative cursor-pointer mb-5 block w-full lg:w-third"
              >
                <NuxtLink
                    :to="'/categories/' + item.id"
                    class="w-full relative block">
                  <img :src="runtimeConfig.public.IMAGE_LINK + item.image" alt=""
                       class="relative z-20 mx-auto mb-4">
                  <p class="text-center text-xl font-semibold">{{ item.category_name }}</p>
                  <p class="text-center text-xs">??? продуктов</p>
                </NuxtLink>
              </div>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div v-if="catalog.accData">
        <client-only>
          <Carousel :breakpoints="breakpoints" :itemsToShow="settings.itemsToShow" class="mt-9 py-0">
            <Slide
                v-for="(item, index) in catalog.accData"
                :key="index"
                class="relative cursor-pointer mb-3 lg:mb-0 block"
            >
              <NuxtLink
                  :to="'/categories/' + item.id"
                  class="w-full relative block">
                <img :src="runtimeConfig.public.IMAGE_LINK + item.image" alt=""
                     class="relative z-20 mx-auto mb-4">
                <p class="text-center text-xl font-semibold">{{ item.category_name }}</p>
                <p class="text-center text-xs">??? продуктов</p>
              </NuxtLink>
            </Slide>
            <template #addons>
              <Navigation/>
            </template>
          </Carousel>
        </client-only>
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
  <div class="products">
    <div class="container mx-auto px-4 lg:px-0">
      <div v-if="products.accData" class="flex justify-between flex-wrap">
        <div class="w-full lg:w-fourth text-mainColor relative flex flex-wrap items-center justify-between mb-20 lg:mb-0">
          <div class="w-[140px] h-[140px]  absolute right-0 bottom-0 bg-mainColor opacity-20 rounded-full z-20"></div>
          <div
              class="w-[250px] h-[250px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondaryColor opacity-20 rounded-full z-10"></div>
          <div class="relative z-20">
            <p class="text-xl font-semibold">
              shop to
            </p>
            <p class="text-6xl font-semibold">
              Products
            </p>
            <div class="flex items-center">
              <p class="text-2xl font-semibold mr-2">
                See all
              </p>
              <IconChevronRight class="font-bold" size="25"/>
            </div>
          </div>
        </div>
        <div
            v-for="(product, index) of products.accData.products.data.slice(0, 7)"
            :key="index"
            class="w-full lg:w-fourth mb-5 bg-white rounded px-6 py-3 mt-24 cursor-pointer"
            style="box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.05), 7px 7px 10px 0px rgba(0, 0, 0, 0.15);">
          <NuxtLink
              :to="'/products/' + product.id"
              class="h-48 w-full block">
            <img
                :src="runtimeConfig.public.IMAGE_LINK + product.images[0]"
                alt=""
                class="h-full w-full object-contain -mt-24">
          </NuxtLink>
          <NuxtLink
              :to="'/products/' + product.id"
              class="text-base font-semibold mt-6 block">
            {{ product.name }}
          </NuxtLink>
          <NuxtLink
              :to="'/products/' + product.id"
              class="font-semibold text-xs my-4 text-negColor block">
            Артикул: {{ product.article }}
          </NuxtLink>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center justify-between w-full">
              <NuxtLink
                  :to="'/products/' + product.id"
                  class="font-semibold">
                ${{ product.price }}.00
              </NuxtLink>
              <p
                  class="text-white bg-mainColor py-2 px-3 rounded"
                  @click="modalPreConfig(product)">Заказать</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex justify-between flex-wrap">
        <div class="w-full lg:w-fourth text-mainColor relative flex items-center justify-center mb-20 lg:mb-0">
          <div class="w-[140px] h-[140px]  absolute right-0 bottom-0 bg-mainColor opacity-20 rounded-full z-20"></div>
          <div
              class="w-[250px] h-[250px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondaryColor opacity-20 rounded-full z-10"></div>
          <div class="relative z-20">
            <p class="text-xl font-semibold">
              shop to
            </p>
            <p class="text-6xl font-semibold">
              Products
            </p>
            <div class="flex items-center">
              <p class="text-2xl font-semibold mr-2">
                See all
              </p>
              <IconChevronRight class="font-bold" size="25"/>
            </div>
          </div>
        </div>
        <div v-for="(item, index) of 7" :key="index"
             class="w-full lg:w-fourth mb-5 bg-white rounded px-6 py-3 mt-24 cursor-pointer">
          <div class="skeleton h-[150px] mb-3 mx-auto"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mx-auto px-4 lg:px-0 py-32">
    <div class="block lg:flex justify-between items-start">
      <div class="w-full lg:w-1/3 mb-10 lg:mb-0 leading-normal">
        <p class="text-[64px] font-semibold">Brands</p>
        <div class="block lg:flex items-start">
          <p class="text-[64px] font-semibold mr-7 h-max leading-none">with</p>
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
        <img alt="" class="w-full lg:w-[80%]" src="@/assets/img/bi/bg.png">
      </div>
    </div>
  </div>
  <dialog id="my_modal_2" class="modal">
    <form
        v-if="selectedProduct"
        class="modal-box"
        @submit.prevent="order.order()">
      <div v-if="!order.result">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-xl mb-7">Оформить заказ</h3>
        <div class="block lg:flex justify-between mb-4">
          <div class="w-full lg:w-half mb-4 lg:mb-0">
            <p class="text-sm mb-2">ФИО <span class="text-red-500">*</span></p>
            <input
                v-model="order.orderData.client_name"
                :class="{ 'border border-red-500' : order.v$.client_name.$dirty && order.v$.client_name.$error }"
                class="input input-bordered w-full"
                placeholder="Введите ФИО" type="text">
            <p
                v-if="order.v$.client_name.$dirty && order.v$.client_name.$error"
                class="text-xs text-red-500">
              Пожалуйста, заполните данное поле
            </p>
          </div>
          <div class="w-full lg:w-half mb-4 lg:mb-0">
            <p class="text-sm mb-2">Телефон <span class="text-red-500">*</span></p>
            <input
                v-model="order.orderData.phone"
                v-maska
                :class="{ 'border border-red-500' : order.v$.phone.$dirty && order.v$.phone.$error }"
                class="input input-bordered w-full"
                data-maska="+7 (###) ###-##-##"
                placeholder="+7 (777) 777 77 77"
                type="text">
            <p
                v-if="order.v$.phone.$dirty && order.v$.phone.$error"
                class="text-xs text-red-500">
              Пожалуйста, заполните данное поле
            </p>
          </div>
        </div>
        <div class="w-full mb-4">
          <p class="text-sm mb-2">Эл. почта <span class="text-red-500">*</span></p>
          <input
              v-model="order.orderData.email"
              :class="{ 'border border-red-500' : order.v$.email.$dirty && order.v$.email.$error }"
              class="input input-bordered w-full"
              placeholder="Введите эл. почту"
              type="text">
          <p
              v-if="order.v$.email.$dirty && order.v$.email.$error"
              class="text-xs text-red-500">
            Пожалуйста, заполните данное поле
          </p>
        </div>
        <div class="w-full mb-4">
          <p class="text-sm mb-2">Город <span class="text-red-500">*</span></p>
          <div class="relative">
            <IconMapPin class="text-mainColor absolute left-3 top-1/2 -translate-y-1/2"/>
            <select
                v-model="order.orderData.city"
                :class="{ 'border border-red-500' : order.v$.city.$dirty && order.v$.city.$error }"
                class="select select-bordered pl-10 w-full"
                type="text"
            >
              <option value="Алматы">Алматы</option>
              <option value="Нур-Султан">Нур-Султан</option>
              <option value="Шымкент">Шымкент</option>
              <option value="Актобе">Актобе</option>
              <option value="Атырау">Атырау</option>
              <option value="Караганда">Караганда</option>
              <option value="Костанай">Костанай</option>
              <option value="Павлодар">Павлодар</option>
              <option value="Уральск">Уральск</option>
              <option value="Тараз">Тараз</option>
              <option value="Актау">Актау</option>
              <option value="Кызылорда">Кызылорда</option>
              <option value="Петропавловск">Петропавловск</option>
            </select>
            <p
                v-if="order.v$.city.$dirty && order.v$.city.$error"
                class="text-xs text-red-500">
              Пожалуйста, заполните данное поле
            </p>
          </div>
        </div>
        <div class="w-full mb-4">
          <p class="text-sm mb-2">Адрес <span class="text-red-500">*</span></p>
          <input
              v-model="order.orderData.address"
              :class="{ 'border border-red-500' : order.v$.address.$dirty && order.v$.address.$error }"
              class="input input-bordered w-full"
              placeholder="Введите адрес"
              type="text">
          <p
              v-if="order.v$.client_name.$dirty && order.v$.client_name.$error"
              class="text-xs text-red-500">
            Пожалуйста, заполните данное поле
          </p>
        </div>
        <div class="block lg:flex justify-between mb-4">
          <div class="w-full lg:w-third mb-4 lg:mb-0">
            <p class="text-sm mb-2">
              Дом
            </p>
            <input
                v-model="order.orderData.house"
                class="input input-bordered w-full"
                placeholder="Введите номер дома"
                type="text">
          </div>
          <div class="w-full lg:w-third mb-4 lg:mb-0">
            <p class="text-sm mb-2">Этаж </p>
            <input
                v-model="order.orderData.floor"
                class="input input-bordered w-full"
                placeholder="Введите этаж"
                type="text">
          </div>
          <div class="w-full lg:w-third mb-4 lg:mb-0">
            <p class="text-sm mb-2">Квартира </p>
            <input
                v-model="order.orderData.flat"
                class="input input-bordered w-full"
                placeholder="Введите этаж"
                type="text">
          </div>
        </div>
        <div class="mb-7 border-b border-[#E6E6E8] pb-2">
          <p class="text-sm mb-2">Товар</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img :src="runtimeConfig.public.IMAGE_LINK + selectedProduct.images[0]"
                   alt="" class="object-contain w-8 h-8 mr-4">
              <p class="text-mainColor font-semibold">{{ selectedProduct.name }}</p>
            </div>
            <p class="font-semibold">
              ${{ selectedProduct.price }}.00
            </p>
          </div>
        </div>
        <div class="block lg:flex justify-between">
          <form class="w-full lg:w-half" method="dialog">
            <button
                class="rounded-lg cursor-pointer bg-white border-mainColor border text-mainColor font-semibold w-full py-3 text-center mb-3 lg:mb-0">
              Отмена
            </button>
          </form>
          <button
              class="rounded-lg cursor-pointer bg-mainColor text-white font-semibold w-full lg:w-half py-3 text-center"
              type="submit">
            Оформить заказ
          </button>
        </div>
      </div>
      <div v-else-if="order.result.status">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="flex justify-center mb-4">
          <div class="bg-mainColor w-20 h-20 rounded-full flex items-center justify-center">
            <IconCheck class="text-white" size="50"/>
          </div>
        </div>
        <p class="text-lg font-semibold text-center text-mainColor">
          Спасибо за ваш заказ!
        </p>
      </div>
    </form>
    <form class="modal-backdrop" method="dialog">
      <button>close</button>
    </form>
  </dialog>
</template>

<style>
.hero {
  border-bottom: 2px solid rgba(223, 223, 223, 0.50);
  box-shadow: 0px 7px 20px 0px rgba(0, 0, 0, 0.05), 7px 7px 10px 0px rgba(0, 0, 0, 0.15);
}

.categories {
  box-shadow: 0px 7px 20px 0px rgba(0, 0, 0, 0.05), 7px 7px 10px 0px rgba(0, 0, 0, 0.15);
}

.carousel__prev, .carousel__next {
  background: #5330C8;
  color: #fff;
  border-radius: 100%;
}
</style>