import '../assets/css/animate.min.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/flaticon.css'
import '../assets/css/fontawesome-all.min.css'
import '../assets/css/magnific-popup.css'
import '../assets/css/nice-select.css'
import '../assets/css/owl.carousel.min.css'
import '../assets/css/price_rangs.css'
import '../assets/css/responsive.css'
import '../assets/css/slick.css'
import '../assets/css/slicknav.css'
import '../assets/css/themify-icons.css'
import '../assets/css/style.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
