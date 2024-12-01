<template>

    <div class="grid grid-cols-4 gap-5">
        <Book
        v-for = "item in items"
        v-bind:key="item.key"
        :title="item.title"
        :author="item.author"
        :price="item.price"
        :onClickAdd="onClickAdd"
        />
    </div>
</template>


<script>
import CartItem from './CartItem.vue';

export default {
    components: {
        CartItem
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        onClickAdd() {
            alert("добавить");
        }
    },
};
</script>