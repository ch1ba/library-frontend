<template>

    <div class = "bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
        <Header/>
        
        <Cart v-if="cartOpen" />

        <router-view></router-view>   

    </div>
</template>


<script>
import { ref, provide} from 'vue'; 
import Home from './pages/Home.vue'
import Header from './components/Header.vue';
import Cart from './components/Cart.vue';

export default {
    components: {
        Header,
        Cart,
        Home
    },
    setup() {
        const cartOpen = ref(false);
        const openCart = () => {
            cartOpen.value = true;
        };

        const closeCart = () => {
            cartOpen.value = false;
        };


        provide('cartActions', {
            openCart,
            closeCart
        });
    

        return {
            cartOpen,
        };
    }
};
</script>





<style scoped>
</style>
