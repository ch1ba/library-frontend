<template>
    <div 
        class="relative w-14 h-14 rounded-lg shadow-md flex flex-col justify-center items-center"
        :style="{ backgroundColor: randomColor }"
    >
        <div class="text-center z-10 text-white">
            <h2 class="text-sm font-normal">{{ author }}</h2>
            <h1 class="text-xl font-bold mt-1">{{ title }}</h1>
        </div>
        <span class="absolute inset-0 text-white text-[20px] opacity-10 flex justify-center items-center font-bold">K</span>
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