import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './app.vue'
import router from './router'

// Import our custom CSS
import '../node_modules/bootstrap/scss/bootstrap.scss'

// Import all of Bootstrap's JS
// import 'bootstrap'

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
