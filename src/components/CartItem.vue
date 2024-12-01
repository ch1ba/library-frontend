<script setup>
import BookCart from './BookCart.vue';
</script>
<template>
    <div class = "flex items-center m-4 border border-slate-200 p-4 rounded-xl gap-4">
        <BookCart/>
        <div class = "flex flex-col">
            <p>"Война и Мир"</p>
            <p class = "text-slate-200">Лев Толстой</p>
            <div class = "flex justify-between mt-2">
                <b>129 руб.</b>
                <img class = "opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="">
            </div>
        </div>
    </div>

</template>