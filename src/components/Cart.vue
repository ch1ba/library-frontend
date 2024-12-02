<script setup>
import CartItemList from './CartItemList.vue';
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const cartActions = inject('cartActions');
const closeCart = cartActions?.closeCart; 

const store = useStore();

// Используем computed для получения общей суммы
const totalAmount = computed(() => store.getters.totalAmount);

const router = useRouter();

// Функция перехода к оплате
const goToPayment = () => {
  if (closeCart) {
    closeCart(); // Закрываем корзину
  }
  router.push('/oplata'); // Переход на страницу оплаты
};
</script>

<template>
    <div>
      <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
      <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 overflow-y-auto">
        <div class="flex items-center gap-5 mb-4">
          <svg @click="closeCart" class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h2 class="text-2xl font-bold">Корзина</h2>
        </div>

        <CartItemList/>

        <div>
          <div class="flex gap-2 mb-6">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalAmount }} руб.</b> <!-- Используем computed свойство -->
          </div>
        </div>

        <button @click="goToPayment" class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700">
          Перейти к оплате
        </button>
      </div>
    </div>
</template>

<style scoped>
</style>
