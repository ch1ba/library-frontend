<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Вход</h2>
        <form @submit.prevent="login">
            <input
                v-model="email"
                type="email"
                placeholder="Email"
                required
                class="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
                v-model="password"
                type="password"
                placeholder="Пароль"
                required
                class="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
                type="submit"
                class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                Войти
            </button>
        </form>
        <p class="mt-4 text-center">
            Нет аккаунта? 
            <router-link to="/register"><a class="text-blue-500 hover:underline cursor-pointer">Зарегистрироваться</a></router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // или другая библиотека для запросов

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://80.87.202.240:3000/api/auth/login', {
      email: email.value,
      password: password.value
    })      

    // Сохраняем JWT в localStorage
    localStorage.setItem('jwt', response.data.token)

    // Перенаправляем на главную страницу или dashboard
    router.push('/')
    router.go(0) // или '/', в зависимости от вашей маршрутизации
  } catch (err) {
    error.value = 'Ошибка входа. Проверьте почту и пароль.'
  }
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
