<script setup>
    import { inject } from 'vue';
    const { openCart } = inject('cartActions'); 
</script>


<template>
    <header class = "flex justify-between border-b border-slate-100 px-8 py-8">

    <div class = "flex items-center gap-4">
        <img src = "/original.png" alt="Logo" class = "w-10"/>
        <router-link to="/">
            <div>
                <h2 class = "text-xl font-bold uppercase">Yurtem`s Library</h2>
                <p class = "text-slate-400">Онлайн библиотека</p>
            </div>
        </router-link>
    </div>

    <ul class = "flex items-center gap-10">
        <li @click="openCart" class = "flex items-center gap-3 cursor-pointer text-slate-400 hover:text-black">
            <img src="/cart.svg" alt="">
            <b>1 руб.</b>
        </li>

        <router-link to="/profile">
            <li class = "flex items-center gap-3 cursor-pointer text-slate-400 hover:text-black">
                <img src="/profile.svg" alt="">
                <b>Профиль</b>
            </li>
        </router-link>
    </ul>


    </header>
  </template>