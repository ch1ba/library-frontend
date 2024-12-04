<template>
    <div class="max-w-lg mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg rounded-lg overflow-hidden">
      <div class="flex flex-col items-center p-6">
        <img
          :src="avatarUrl"
          alt="User Avatar"
          class="w-32 h-32 rounded-full border-4 border-white shadow-md"
        />
        <h2 class="mt-4 text-2xl font-bold">{{ name }}</h2>
        <p class="text-sm text-gray-200">{{ email }}</p>
        <p class="text-sm text-gray-200">{{ phone }}</p>
        <p class="text-grey mt-2 text-md"> 
          Пользователь онлайн-библиотеки
        </p>
        <div class="flex items-center space-x-2 mt-4 text-sm">
          <p>Иркутск, Россия</p>
          <span>•</span>
          <p>Активный читатель</p>
        </div>
      </div>
      <div class="flex justify-between px-6 py-4 border-t border-gray-200 bg-white text-gray-800">
        <div>
          <p class="font-semibold text-center">{{ booksDownloaded }}</p>
          <p class="text-sm">Книги скачаны</p>
        </div>
        <div>
          <p class="font-semibold text-center">{{ reviewsLeft }}</p>
          <p class="text-sm">Оставлено отзывов</p>
        </div>
        <div>
          <p class="font-semibold text-center">{{ daysActive }}</p>
          <p class="text-sm">Дней активности</p>
        </div>
      </div>
      <div class="flex space-x-4 px-6 py-4 bg-gray-100">
        <button
          class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          @click="logout"
        >
          Выйти
        </button>
      </div>
    </div>
  </template>
  
  vue

  <script>
  import axios from 'axios'
  
  export default {
    name: "UserProfile",
    data() {
      return {
        name: "",
        email: "",
        phone: "",
        avatarUrl: "/ava.png", 
        booksDownloaded: 5, 
        reviewsLeft: 3, 
        daysActive: 355,
        loading: true,
        error: null
      };
    },
    created() {
      this.fetchUserProfile()
    },
    methods: {
      async fetchUserProfile() {
        try {
          // Получаем JWT из localStorage
          const token = localStorage.getItem('jwt')
          
          if (!token) {
            throw new Error('Токен не найден')
          }
  
          // Настраиваем axios для отправки токена
          const response = await axios.get('http://80.87.202.240:3000/api/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
  
          // Обновляем данные пользователя
          const userData = response.data
          this.name = userData.name
          this.email = userData.email
          
          // Если в ответе есть другие поля, обновляем их
          this.phone = userData.phone
  
          this.loading = false
        } catch (error) {
          this.error = 'Не удалось загрузить профиль'
          this.loading = false
          
          // Обработка ошибок
          if (error.response && error.response.status === 401) {
            // Токен недействителен, выходим из системы
            this.logout()
          }
          
          console.error('Ошибка загрузки профиля:', error)
        }
      },
      logout() {
        // Очищаем localStorage
        localStorage.removeItem('jwt')
        
        // Перенаправляем на страницу входа
        this.$router.push('/login')
      },
    },
  }
  </script>
  
  <style scoped>
  /* Дополнительные стили для кнопок */
  button {
    transition: background-color 0.3s;
  }
  </style>
  