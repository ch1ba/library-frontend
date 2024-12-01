import { createApp } from 'vue'
import { autoAnimatePlugin } from "@formkit/auto-animate/vue"
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue'
import Profile from './pages/Profile.vue'
import Oplata from './components/Oplata.vue'
import BookDetail from './components/BookDetail.vue'


const app = createApp(App);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/oplata',
        name: 'Oplata',
        component: Oplata
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/book/:id', 
        name: 'BookDetail',
        component: BookDetail
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(autoAnimatePlugin);
app.use(router)

app.mount('#app')
