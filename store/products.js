import {defineStore} from "pinia";

export const useProductsListStore = defineStore('products', () => {
    const runtimeConfig = useRuntimeConfig();
    const accData = ref(null)
    const product = ref(null)
    const analogs = ref(null)

    return {
        accData, analogs, product,
        async getProducts(par) {
            const {data} = await useFetch('/catalog/category/' + par, {
                method: 'GET', headers: {
                    accept: "application/json"
                }, baseURL: runtimeConfig.public.API_LINK, lazy: true,
            })
            accData.value = data.value
        }, async getProduct(par) {
            const {data} = await useFetch('catalog/product/' + par, {
                method: 'GET', headers: {
                    accept: "application/json"
                }, baseURL: runtimeConfig.public.API_LINK, lazy: true,
            })
            product.value = data.value
        }, async getAnalogs(par) {
            const {data} = await useFetch('catalog/product/' + par + '/analogs', {
                method: 'GET', headers: {
                    accept: "application/json"
                }, baseURL: runtimeConfig.public.API_LINK, lazy: true,
            })
            analogs.value = data.value
        },
    }
})
