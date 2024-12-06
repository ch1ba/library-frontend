<template>

    <div v-if="items.length > 0" class="grid grid-cols-4 gap-5" v-auto-animate>
        <Book
        v-for = "item in items"
        v-bind:key="item.key"
        :title="item.title"
        :author="item.author"
        :price="item.price"
        :onClickAdd="() => addToCart(item)"
        :isAdded="item.isAdded"
        :onClickPhoto="() => goToBookDetail(item.id)" 
        />
    </div>
</template>


<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Book from './Book.vue';
import { useStore } from 'vuex/dist/vuex.cjs.js';
import axios from 'axios';

// Определяем пропсы
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});

// Используем router для навигации
const router = useRouter();
const store = useStore();
const userId = ref(null); // Переменная для хранения user ID

// Метод для получения данных профиля пользователя
const fetchUserProfile = async () => {
    const token = localStorage.getItem('jwt'); // Получаем JWT токен из локального хранилища
    try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}` // Передаем токен в заголовках
            }
        });
        userId.value = response.data.id;
        console.log(userId) // Предполагается, что ID пользователя находится в response.data.id
    } catch (error) {
        console.error('Ошибка при получении профиля пользователя:', error);
    }
};

// Метод для добавления книги в корзину
const addToCart = async (item) => {
    // Добавляем элемент в корзину
    await store.dispatch('addToCart', item);
    
    // Проверяем наличие ключа isCreated в локальном хранилище
    const isCreated = localStorage.getItem('isCreated');
    const token = localStorage.getItem('jwt');

    if (isCreated === null) {
        try {
            const cartData = {
                user_id: userId.value
            };

            await axios.post('http://localhost:3000/api/createCart', cartData, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            localStorage.setItem('isCreated', 'false'); 
        } catch (error) {
            console.error('Ошибка при создании корзины:', error);
        }
    }
};

// Метод для перехода на страницу книги
const goToBookDetail = (id) => {
    router.push({ name: 'BookDetail', params: { id } });
};

onMounted(() => {
    fetchUserProfile();
});
</script>

