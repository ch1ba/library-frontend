<template>

    <div v-if="items.length > 0" class="grid grid-cols-4 gap-5" v-auto-animate>
        <Book
        v-for = "item in items"
        v-bind:key="item.key"
        :title="item.title"
        :author="item.author"
        :price="item.price"
        :onClickAdd="onClickAdd"
        @click.native="goToBookDetail(item.id)"
        />
    </div>
</template>


<script>
import Book from './Book.vue';
import Card from './Card.vue';

export default {
    components: {
        Book,
        Card
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
        },
        goToBookDetail(id) {
          this.$router.push({ name: 'BookDetail', params: { id } }); // Переход к странице книги по ID
        }
    },
};
</script>

