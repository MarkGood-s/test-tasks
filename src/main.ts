import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeflex/primeflex.scss'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

const app = createApp(App)
app.use(PrimeVue)

app.component('PrimeInput', InputText)
app.component('PrimeButton', Button)
app.component('PrimeCheckbox', Checkbox)

app.mount('#app')
