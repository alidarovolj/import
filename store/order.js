import {defineStore} from "pinia";
import {useVuelidate} from "@vuelidate/core";
import {required} from '@vuelidate/validators';

export const useOrderStore = defineStore('order', () => {
    const runtimeConfig = useRuntimeConfig();
    const orderData = ref({
        client_name: null,
        phone: null,
        email: null,
        address: null,
        product_id: null,
        city: "Алматы",
        house: null,
        floor: null,
        flat: null,
        quantity: 1
    })

    const v$ = useVuelidate({
        client_name: {required},
        phone: {required},
        email: {required},
        address: {required},
        product_id: {required},
        city: {required},
    }, orderData)

    const result = ref(null)

    return {
        orderData, v$, result, async order() {
            await v$.value.$validate()
            v$.value.$touch()

            if (v$.value.$invalid) {
                return
            }

            const {data, error} = await useFetch('/checkout/create', {
                method: 'POST', headers: {
                    accept: "application/json"
                }, body: orderData, baseURL: runtimeConfig.public.API_LINK, lazy: true,
            })

            if (data.value) {
                result.value = data.value
            } else {
                // if (error.value.data.errors) {
                //     if (Object.keys(error.value.data.errors).length > 0) {
                //         Object.values(error.value.data.errors).forEach((err) => {
                //             result.value = err[0]
                //         })
                //     }
                //     result.value = error.value.data
                // } else {
                //     result.value = error.value.data.message
                // }
                result.value = error.value.data
            }

        },
    }
})
