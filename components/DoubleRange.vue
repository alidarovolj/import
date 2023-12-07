<script setup>
import MultiRangeSlider from "multi-range-slider-vue";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";

const oBarMinValue = ref(10);
const oBarMaxValue = ref(100);
const props = defineProps({
    minValue: {
        type: Number
    },
    maxValue: {
        type: Number
    },
});

const update_oBarValues = (e) => {
    props.minValue = e.minValue;
    props.maxValue = e.maxValue;
}
</script>

<template>
    <div class="mb-4">
        <div class="flex justify-between mb-4">
            <div class="w-half text-mainColor py-2 bg-[#F6F6F6] rounded text-center font-semibold text-xl">
                <p v-if="minValue">
                    ${{ minValue }}
                </p>
            </div>
            <div class="w-half text-mainColor py-2 bg-[#F6F6F6] rounded text-center font-semibold text-xl">
                <p v-if="maxValue">
                    ${{ maxValue }}
                </p>
            </div>
        </div>
        <ClientOnly>
            <MultiRangeSlider baseClassName="multi-range-slider-bar-only" :minValue="minValue" :maxValue="maxValue"
                :max="100" :min="0" :step="5" :rangeMargin="0" @input="update_oBarValues" />
        </ClientOnly>
    </div>
</template>