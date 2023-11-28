import type {Config} from "tailwindcss";

export default <Config>{
    content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./app.vue", "./error.vue",],
    theme: {
        extend: {
            borderColor: {
                bColor: "#EFEFEF"
            }, colors: {
                mainColor: "#5330C8",
                secondaryColor: "#F3C837",
                negColor: "#7B7B7B"
            }, width: {
                third: "32%",
                fourth: "24.5%",
                half: "48%"
            }
        },
    },
    daisyui: {
        themes: false, logs: false,
    },
    plugins: [require("daisyui")],
}
