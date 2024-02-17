import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.vue'
import router from './router'

// Import our custom CSS
import './assets/main.scss'

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
