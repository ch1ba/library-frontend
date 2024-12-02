<template>
    <div v-auto-animate class="flex flex-col justify-between">
        <CartItem 
            v-for="item in cart" 
            :key="item.id"
            :title="item.title"
            :author="item.author"
            :price="item.price"
            :onClickRemove="() => {removeFromCart(item.id)}"
        />
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import CartItem from './CartItem.vue'; 

const store = useStore();


const removeFromCart = (item) => {
    store.dispatch('removeFromCart', item); // Вызываем действие для добавления товара в корзину
};

const cart = store.getters.cartItems;
</script>

<style scoped>
</style>
