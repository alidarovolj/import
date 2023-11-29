<script setup>
import {useProductsListStore} from "~/store/products.js";
import {IconMapPin, IconCheck} from "@tabler/icons-vue"
import {useOrderStore} from "~/store/order.js";
import {Carousel, Navigation, Slide} from "vue3-carousel";

const products = useProductsListStore()
const route = useRoute()
const runtimeConfig = useRuntimeConfig();
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
    itemsToShow: 4,
    snapAlign: 'start',
  },
};
const breadcrumbs = ref([
  {
    to: "/",
    name: "Главная"
  }
])

products.product = null

function modalPreConfig() {
  order.orderData.product_id = products.product.id
  my_modal.showModal()
}

function modalPreConfigSec(item) {
  order.orderData.product_id = item.id
  selectedProduct.value = item
  my_modal_3.showModal()
}

onMounted(async () => {
  await nextTick()
  await products.getProduct(route.params.id)
  await products.getAnalogs(route.params.id)
  breadcrumbs.value.push({
    to: "/products/" + route.params.id,
    name: products.product.name
  })
})

useHead({
  title: 'Продукт | Import',
  meta: [{
    property: "og:title",
    content: "Продукт | Import"
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
  <div class="container mx-auto px-4 lg:px-0 pt-6 pb-24">
    <Breadcrumbs
        :getLinks="breadcrumbs"
        class="mb-6"
    />
    <div class="block lg:flex items-start justify-between mb-40 lg:mb-0">
      <div
          class="w-full lg:w-2/3 mb-5 lg:mb-0">
        <div class="bg-white rounded p-5 mb-5"
             style="box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.15);">
          <div v-if="products.product">
            <h1 class="text-2xl text-mainColor font-semibold mb-5">
              {{ products.product.name }}
            </h1>
            <div class="block lg:flex items-start justify-between">
              <div class="w-full lg:w-1/2 mr-10">
                <img :src="runtimeConfig.public.IMAGE_LINK + products.product.images[0]"
                     alt="" class="py-10 px-11 w-full max-h-96 object-contain">
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
          <div v-else class="py-10 flex items-center justify-center">
            <div class="spinner p-6"></div>
          </div>
        </div>
        <div
            class="bg-white rounded p-5 text-sm"
            style="box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.15);">
          <p v-if="products.product" class="font-semibold">
            {{ products.product.description }}
          </p>
          <div v-else class="py-10 flex items-center justify-center">
            <div class="spinner p-6"></div>
          </div>
        </div>
      </div>
      <div
          class="w-full lg:w-1/3 bg-white rounded p-5 lg:ml-5"
          style="box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.15);"
      >
        <div v-if="products.product">
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
          <button
              class="block w-full bg-mainColor text-center py-3 font-semibold text-white rounded-lg cursor-pointer"
              @click="modalPreConfig">
            Оформить заказ
          </button>
          <dialog id="my_modal" class="modal">
            <form
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
                      <img :src="runtimeConfig.public.IMAGE_LINK + products.product.images[0]"
                           alt="" class="object-contain w-8 h-8 mr-4">
                      <p class="text-mainColor font-semibold">{{ products.product.name }}</p>
                    </div>
                    <p class="font-semibold">
                      ${{ products.product.price }}.00
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
        </div>
        <div v-else class="py-10 flex items-center justify-center">
          <div class="spinner p-6"></div>
        </div>
      </div>
    </div>
    <div class="mt-20">
      <p class="text-4xl font-bold mb-7 text-mainColor">Аналоги</p>
      <div
          v-if="products.analogs"
          class="block lg:flex justify-between">
        <client-only>
          <Carousel
              :breakpoints="breakpoints"
              :itemsToShow="settings.itemsToShow"
              class="mt-9 py-0">
            <Slide
                v-for="(product, index) in products.analogs"
                :key="index"
                class="relative cursor-pointer mb-3 lg:mb-0 block"
            >
              <div
                  class="w-full mb-5 bg-white rounded px-6 py-3 mt-20 cursor-pointer block"
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
                        @click="modalPreConfigSec(product)">Заказать</p>
                  </div>
                </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation/>
            </template>
          </Carousel>
        </client-only>
      </div>
      <div
          v-else
          class="py-10 flex items-center justify-center bg-white rounded"
          style="box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.15);"
      >
        <div class="spinner p-6"></div>
      </div>
    </div>
  </div>
  <dialog id="my_modal_3" class="modal">
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