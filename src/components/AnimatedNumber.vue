<template>
    <div class="animated-number">
      <transition name="fade">
        <span v-if="visible">{{ currentNumber }}</span>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    value: {
      type: Number,
      required: true
    }
  });
  
  const currentNumber = ref(0);
  const visible = ref(false);
  
  watch(() => props.value, (newValue) => {
    visible.value = true;
    currentNumber.value = 0;
  
    const endValue = newValue;
    const duration = 2000; // Длительность анимации в миллисекундах
    const stepTime = Math.abs(Math.floor(duration / endValue));
    
    const interval = setInterval(() => {
      if (currentNumber.value < endValue) {
        currentNumber.value++;
      } else {
        clearInterval(interval);
        visible.value = false;
      }
    }, stepTime);
  });
  </script>
  
  <style scoped>
  .animated-number {
    font-size: 50px;
    font-weight: bold;
    color: #fff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active в <2.1.8 */ {
    opacity: 0;
  }
  </style>
  