import {defineStore} from "pinia";

export const useProductsListStore = defineStore('products', () => {
    const runtimeConfig = useRuntimeConfig();
    const route = useRoute()
    const products = ref(null)
    const accData = ref(null)
    const product = ref(null)
    const analogs = ref(null)

    return {
        accData, analogs, product, products,
        async getProducts(par) {
            const route = useRoute();

            const queryArray = Object.entries(route.query).map(([key, value]) => {
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(value);
                return `${encodedKey}=${encodedValue}`;
            });

            const queryString = queryArray.join('&');

            const { data } = await useFetch('catalog/category/' + par + '?' + queryString, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            });

            accData.value = data.value;
        }, async getAllProducts() {
            const route = useRoute();

            const queryArray = Object.entries(route.query).map(([key, value]) => {
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(value);
                return `${encodedKey}=${encodedValue}`;
            });

            const queryString = queryArray.join('&');

            const {data} = await useFetch('catalog/products/' + '?' + queryString, {
                method: 'GET',
                headers: {
                    accept: "application/json"
                },
                baseURL: runtimeConfig.public.API_LINK,
                lazy: true,
            })
            products.value = data.value
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
