<template>
  <div class="flex items-center">
    <p class="  mr-3 dark:text-darkText">Показать</p>
    <select
        v-model="perPage"
        class=" font-bold px-4 py-2 border rounded-md dark:bg-darkInp dark:text-darkText"
        @change="setPerPage"
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "PerPage",
  emits: ["apply_per_page"],
  data() {
    return {
      perPage: 10,
    };
  },
  created() {
    if (!this.$route.query.perPage) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          perPage: 10,
        },
      });
    } else {
      this.perPage = this.$route.query.perPage;
    }
  },
  mounted() {
    window.addEventListener("popstate", this.popstateEvent);
  },
  beforeUnmount() {
    window.removeEventListener("popstate", this.popstateEvent);
  },
  methods: {
    async setPerPage() {
      if (this.$route.query.perPage === this.perPage) return;
      await this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          perPage: this.perPage,
        },
      });
      this.$emit("apply_per_page");
    },
    popstateEvent() {
      this.perPage = this.$route.query.perPage || 10;
    },
  },
};
</script>
