<template>
    <div v-if="showContent" class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
        <Header v-if="!isLoginOrRegister" />
        <Cart v-if="cartOpen && !isLoginOrRegister"/>
        <router-view></router-view>
    </div>

    <div v-else>
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, provide, computed, watch } from 'vue'; 
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Cart from './components/Cart.vue';

export default {
    components: {
        Header,
        Cart
    },
    setup() {
        const cartOpen = ref(false);
        const route = useRoute();

        const openCart = () => {
            console.log("открылась")
            cartOpen.value = true;
        };

        const closeCart = () => {
            console.log("закрылась")
            cartOpen.value = false;
        };

    

        provide('cartActions', {
            openCart,
            closeCart,
            
        });



        const isAuthenticated = ref(!!localStorage.getItem('jwt'));

        watch(
            () => localStorage.getItem('jwt'),
            (newValue) => {
                isAuthenticated.value = !!newValue;
            }
        );

        // Страницы логина и регистрации
        const isLoginOrRegister = computed(() => 
            ['/login', '/register'].includes(route.path)
        );

        // Показываем контент только для авторизованных пользователей
        const showContent = computed(() => 
            isAuthenticated.value && !isLoginOrRegister.value
        );

        return {
            cartOpen,
            isAuthenticated,
            isLoginOrRegister,
            showContent,
        };
    }
};
</script>