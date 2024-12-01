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
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          @click="downloadBook"
        >
          Скачать книгу
        </button>
        <button
          class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          @click="logout"
        >
          Выйти
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserProfile",
    data() {
      return {
        name: "Иван Иванов",
        email: "ivan.ivanov@example.com",
        phone: "+7 (900) 123-45-67",
        avatarUrl: "/ava.png", 
        booksDownloaded: 12, 
        reviewsLeft: 5, 
        daysActive: 365, 
      };
    },
    methods: {
      downloadBook() {
        alert("Функция скачивания книги еще не реализована!");
      },
      logout() {
        alert("Вы успешно вышли из аккаунта!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Дополнительные стили для кнопок */
  button {
    transition: background-color 0.3s;
  }
  </style>
  