<script setup>
    import {onMounted, reactive,watch,ref} from 'vue'; 
    import axios from 'axios';
    import BookList from '../components/BookList.vue';


    const items = ref([]); 


    const filters = reactive({
            sortBy: '',
            title: ''
    })

    const onChangeSelect = event => {
            filters.sortBy = event.target.value; 
    };

    const onChangeSearch = event => {
        filters.title = event.target.value; 
    };


    const fetchBooks = async () => {
        console.log(filters);
        try {
            const params = {}

            if (filters.title) {
                console.log(filters.title);
                params.title = filters.title;
            }

            if (filters.sortBy) {
                params.sortBy = filters.sortBy
            }

            const token = localStorage.getItem('jwt');

            console.log(params)

            const response = await axios.get(`http://localhost:3000/api/books`,{
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            items.value = response.data;
            
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };

    onMounted(fetchBooks)


    watch(filters, fetchBooks)

</script>


<template>
    <div class="p-10" >
        <div class = "flex justify-between items-center">
            <h2 class="text-3xl font-bold mb-8">Ассортимент книг</h2>

            <div class = "flex gap-4">
                <select @change="onChangeSelect" class = "py-2 px-3 border rounded-md outline-none bg-white">
                    <option value="title=asc">По названию</option>
                    <option value="price=asc">По цене(дешевые)</option>
                    <option value="price=desc">По цене(дорогие)</option>
                </select>

                <div class = "relative">
                    <img class = "absolute left-3 top-2.5" src="/search.svg" alt="Поиск">
                    <input
                    @input ="onChangeSearch"
                    class = "border rounded-md py-1.5 pl-10 pr-4 outline-none focus:border-gray-400"
                    placeholder="Поиск..."
                    type="text"
                    />
                </div>
            </div>
        </div>
                    
        <div class = "mt-10" v-auto-animate>
            <BookList :items="items"/>
        </div>
    </div>

</template>