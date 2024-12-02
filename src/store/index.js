// store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            cart: [],
            totalAmount: 0
        };
    },
    mutations: {
        addToCart(state, item) {
            const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                state.cart.splice(state.cart.indexOf(existingItem), 1);
                item.isAdded = false;
                state.totalAmount -= item.price;
            } else {
                state.cart.push(item);
                item.isAdded = true;
                state.totalAmount += item.price;
            }
            console.log('Текущая корзина:', state.cart);
            console.log('Общая сумма:', state.totalAmount);
        },
        removeFromCart(state, itemId) {
            const index = state.cart.findIndex(cartItem => cartItem.id === itemId);
            if (index !== -1) {
                const removedItem = state.cart[index];
                state.cart.splice(index, 1);
                state.totalAmount -= removedItem.price;
                removedItem.isAdded = false
                console.log(`Товар с id ${itemId} удален из корзины.`);
            }
        },
        clearCart(state) {
            state.cart = [];
            state.totalAmount = 0;
            console.log('Корзина очищена.');
        }
    },
    actions: {
        addToCart({ commit }, item) {
            commit('addToCart', item);
        },
        removeFromCart({ commit }, itemId) {
            commit('removeFromCart', itemId);
        },
        clearCart({ commit }) {
            commit('clearCart');
        }
    },
    getters: {
        cartItems(state) {
            return state.cart;
        },
        cartCount(state) {
            return state.cart.length;
        },
        totalAmount(state) {
            return state.totalAmount;
        }
    }
});

export default store;
