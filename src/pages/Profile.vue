<template>
  <div>
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
      <div class="flex justify-around px-6 py-4 border-t border-gray-200 bg-white text-gray-800">
        <div class="flex-1 text-center">
          <p class="font-semibold">{{ booksDownloaded }}</p>
          <p class="text-sm">Куплено книг</p>
        </div>
        <div class="flex-1 text-center">
          <p class="font-semibold">{{ reviewsLeft }}</p>
          <p class="text-sm">Оставлено отзывов</p>
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

    <div class="px-6 py-4 bg-white-100 ">
    <h3 class="text-lg font-semibold">Купленные книги:</h3>
      <div class="grid grid-cols-4 gap-5" v-auto-animate>
          <BookProfile
          v-for = "item in books"
          v-bind:key="item.id"
          :title="item.book_name"
          :author="item.book_author"
          :isAdded="item.isAdded"
          :onClickAdd="() => downloadPdf()"
          />
      </div>
    </div>
  </div>
    



  </template>
  

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BookProfile from '../components/BookProfile.vue'; // Импортируем новый компонент

// Определяем реактивные переменные
const name = ref("");
const email = ref("");
const phone = ref("");
const avatarUrl = "/ava.png"; 
const booksDownloaded = ref(); 
const reviewsLeft = ref(3); 
const daysActive = ref(355);
const loading = ref(true);
const error = ref(null);
const books = ref([]); // Новый массив для хранения книг

// Функция для выхода из системы
const logout = () => {
  localStorage.removeItem('jwt');
  window.location.href = '/login'; // Перенаправляем на страницу входа
};

// Функция для получения профиля пользователя
const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('jwt');
    
    if (!token) {
      throw new Error('Токен не найден');
    }

    const response = await axios.get('http://localhost:3000/api/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const userData = response.data;
    name.value = userData.name;
    email.value = userData.email;
    phone.value = userData.phone;

    // Теперь загружаем книги пользователя
    await fetchUserBooks(userData.id); // Передаем user_id для получения книг

    loading.value = false;
  } catch (error) {
    error.value = 'Не удалось загрузить профиль';
    loading.value = false;

    if (error.response && error.response.status === 401) {
      logout();
    }

    console.error('Ошибка загрузки профиля:', error);
  }
};

// Функция для получения книг пользователя
const fetchUserBooks = async (userId) => {
  try {
    const token = localStorage.getItem('jwt');
    
    const response = await axios.get(`http://localhost:3000/api/getOrders/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const uniqueBooks = response.data.filter((book, index, self) => 
      index === self.findIndex((b) => (
        b.book_name === book.book_name && b.book_author === book.book_author))
    );

    // Обновляем массив книг из ответа
    books.value = uniqueBooks;
    booksDownloaded.value = uniqueBooks.length
    console.log(books) // Предполагается, что ответ - это массив объектов книг
  } catch (error) {
    console.error('Ошибка при получении книг:', error);
    alert('Не удалось получить книги.');
  }
};

const downloadPdf = async () => {
  const pdfUrl = 'library\frontend\public\test.txt'; // Укажите путь к вашему PDF файлу

  try {
    const response = await fetch(pdfUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    // Проверяем, успешен ли ответ
    if (!response.ok) {
      throw new Error('Ошибка при скачивании файла: ' + response.statusText);
    }

    // Получаем данные в виде Blob
    const blob = await response.blob();

    // Создаем URL для Blob
    const url = window.URL.createObjectURL(blob);

    // Создаем элемент <a> для скачивания
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'myFile.pdf'); // Имя файла для сохранения

    // Добавляем элемент <a> в документ
    document.body.appendChild(link);
    
    // Инициируем скачивание
    link.click();

    // Удаляем элемент <a> из документа
    document.body.removeChild(link);
    
    // Освобождаем созданный URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Ошибка при скачивании файла:', error);
  }
};

// Вызываем функцию для получения профиля при загрузке компонента
onMounted(() => {
  fetchUserProfile();
});
</script>
  
  <style scoped>
  /* Дополнительные стили для кнопок */
  button {
    transition: background-color 0.3s;
  }
  </style>
  