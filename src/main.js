import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import storeConfig from './store';
import { createStore } from 'vuex';
import './style/CommonStyle.css'


const app = createApp(App)
const store = createStore(storeConfig)
app.config.globalProperties.$axios = axios.create({
    baseURL: 'http://localhost:8000/api'
})

app.use(store)

app.use(router).mount('#app')
