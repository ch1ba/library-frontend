<template>
    <div class="flex flex-col items-center m-10" >
        <div class="border border-slate-100 rounded-lg p-4 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
            <div 
                class="relative w-64 h-80 rounded-lg shadow-md flex flex-col justify-center items-center"
                :style="{ backgroundColor: randomColor }"
            >
                <div class="text-center z-10 text-white">
                    <h2 class="text-sm font-normal">{{ author }}</h2>
                    <h1 class="text-xl font-bold mt-1">{{ title }}</h1>
                </div>
                <span class="absolute inset-0 text-white text-[100px] opacity-10 flex justify-center items-center font-bold">{{title[0].toUpperCase()}}</span>
            </div>
            <div class="flex justify-end mt-2">
                <img @click="onClickAdd" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="plus" class="w-8 h-8">
            </div>
        </div>
        <div class="flex flex-col items-center mt-2"> 
            <span class="text-slate-400">Цена:</span>
            <b>{{price}} руб.</b>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        isAdded: {
            type: Boolean,
            default: false
        },
        onClickAdd: {
            type: Function,
            required: true 
        }
    },
    data() {
        return {
        };
    },
    computed: {
        randomColor() {
            const colors = [
                '#498E7A', 
                '#755D51', 
                '#398D99', 
                '#607168', 
                '#4A6E5A', 
                '#818B68', 
                '#576185', 
                '#8F4C4C',
                '#506F8F',
                '#946D91',
                '#525252',
            ];
            const randomIndex = Math.floor(Math.random() * colors.length);
            return colors[randomIndex];
        }
    },
};
</script>

<style scoped>
/* Ваши стили, если необходимо */
</style>
