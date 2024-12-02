
<script setup>
import { computed, inject, ref, watch } from 'vue';
import { useStore } from 'vuex';

const { openCart } = inject('cartActions');
const store = useStore();

const totalAmount = computed(() => store.getters.totalAmount);
const animatedTotal = ref(0);

// Функция анимации увеличения числа
const animateNumber = (start, end, duration = 500) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    animatedTotal.value = Math.floor(progress * (end - start) + start);
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Следим за изменениями общей суммы и запускаем анимацию
watch(totalAmount, (newValue, oldValue) => {
  animateNumber(oldValue, newValue);
}, { immediate: false });
</script>

<template>
  <header class="flex justify-between border-b border-slate-100 px-8 py-8">
    <div class="flex items-center gap-4">
      <img src="/original.png" alt="Logo" class="w-10"/>
      <router-link to="/">
        <div>
          <h2 class="text-xl font-bold uppercase">Yurtem`s Library</h2>
          <p class="text-slate-400">Онлайн библиотека</p>
        </div>
      </router-link>
    </div>

    <ul class="flex items-center gap-10">
      <li @click="openCart" class="flex items-center gap-3 cursor-pointer text-slate-400 hover:text-black">
        <img src="/cart.svg" alt="">
        <b>{{ animatedTotal }} руб.</b>
      </li>

      <router-link to="/profile">
        <li class="flex items-center gap-3 cursor-pointer text-slate-400 hover:text-black">
          <img src="/profile.svg" alt="">
          <b>Профиль</b>
        </li>
      </router-link>
    </ul>
  </header>
</template>
