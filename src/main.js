import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import Antd from "ant-design-vue"
import './mock/index'
import "ant-design-vue/dist/antd.css"
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import '@/assets/css/main.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount("#app")
