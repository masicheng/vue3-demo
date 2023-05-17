import { createApp } from "vue"

import App from "./App.vue"
import {setupRouter} from "./router"
import Antd from "ant-design-vue"
import "./mock/index"
import "ant-design-vue/dist/antd.css"
import "virtual:uno.css"
import "@unocss/reset/normalize.css"
import "@/assets/css/main.less"
import { setupStore } from "./store"

const app = createApp(App)

setupStore(app)
setupRouter(app)
app.use(Antd)

app.mount("#app")
