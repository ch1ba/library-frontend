<script setup>
import { useStore } from 'vuex/dist/vuex.cjs.js';
import BookCart from './BookCart.vue';

defineProps({
    id: Number,
    title: String,
    author: String,
    price: Number,
    onClickRemove: Function
})

const store = useStore();


const removeFromCart = (item) => {
    store.dispatch('removeFromCart', item); // Вызываем действие для добавления товара в корзину
};

</script>
<template>
    <div class = "flex items-center m-2 border border-slate-200 p-4 rounded-xl gap-4">
        <BookCart/>
        <div class = "flex flex-col">
            <p>{{ title }}</p>
            <p class = "text-slate-200">{{author}}</p>
            <div class = "flex justify-between mt-2">
                <b>{{ price }} руб.</b>
                <img @click="onClickRemove"  class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="">
            </div>
        </div>
    </div>

</template>