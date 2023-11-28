import {defineStore} from "pinia";

export const useCatalogListStore = defineStore('catalog', () => {
    const runtimeConfig = useRuntimeConfig();
    const accData = ref(null)
    const searchData = ref(null)

    return {
        accData,
        searchData,
        async getCatalog() {
            const {data} = await useFetch('/catalog', {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            accData.value = data.value
        },
        async search(query) {
            const {data} = await useFetch('/catalog/search?query=' + query, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            searchData.value = data.value
        },
    }
})
