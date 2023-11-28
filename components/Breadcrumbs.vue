<script>
import {IconArrowLeft} from "@tabler/icons-vue";

export default {
  name: "BreadcrumbsComponent",
  components: {IconArrowLeft},
  props: {
    getLinks: {
      type: Object
    }
  },
  data() {
    return {
      newVal: null,
      oldVal: null,
    }
  }
};
</script>

<template>
  <div
      v-if="getLinks"
      class="breadcrumbs w-max rounded-lg flex text-sm items-center"
  >
    <div class="flex items-center flex-wrap">
      <NuxtLink
          v-if="getLinks.length > 1"
          :to="getLinks[getLinks.length - 2].to"
          class="block text-[#5e5873]"
      >
        <IconArrowLeft
            :size="24"
            class="block lg:hidden text-lg text-secondaryColor mr-3"
        />
      </NuxtLink>
      <div
          v-for="(link, index) of getLinks"
          :key="index"
          class="mr-3 flex items-center flex-wrap"
      >
        <router-link :to="link.to">
          {{$t(link.name)}}
        </router-link>
        <p
            v-if="getLinks.length - 1 !== index"
            class="ml-3"
        >
          /
        </p>
      </div>
    </div>
  </div>
</template>
