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
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import Book from './Book.vue';
import { useStore } from 'vuex/dist/vuex.cjs.js';

// Определяем пропсы
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});

// Определяем события
const router = useRouter();

// Метод для добавления книги в корзину

const store = useStore();

const addToCart = (item) => {
    store.dispatch('addToCart', item); // Вызываем действие для добавления товара в корзину
};

// Метод для перехода на страницу книги
const goToBookDetail = (id) => {
    // Используем router для перехода по ID книги
    router.push({ name: 'BookDetail', params: { id } });
};
</script>

