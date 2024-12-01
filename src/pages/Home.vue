<script setup>
    import {onMounted, reactive,watch,ref} from 'vue'; 
    import axios from 'axios';
    import BookList from '../components/BookList.vue';


    const items = ref([]);
    const genres = ref([]);         
    const selectedGenre = ref('');


    const filters = reactive({
            sortBy: '',
            title: '',
            genre: ''
    })

    async function loadGenres() {
        try {
            // Извлекаем JWT из локального хранилища
            const token = localStorage.getItem('jwt'); // Убедитесь, что ключ указан правильно

            const response = await axios.get('http://localhost:3000/api/genres', {
            headers: {
                'Authorization': `Bearer ${token}`, // Включаем JWT в заголовок Authorization
                'Content-Type': 'application/json'
            }
            });

            genres.value = response.data;
        } catch (error) {
            console.error('Ошибка при получении жанров:', error);
        }
    }

    const onChangeSelect = event => {
        filters.sortBy = event.target.value; 
    };

    const onGenreSelect = event => {
        filters.genre = event.target.value;
    }

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

            if (filters.genre) {
                params.genreId = filters.genre
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

    const resetFilters = () => {
        filters.sortBy = '';
        filters.title = '';
        filters.genre = '';
        selectedGenre.value = ''; 
    };

    onMounted(fetchBooks)
    onMounted(loadGenres)


    watch(filters, fetchBooks)

</script>


<template>
    <div class="p-10" >
        <div class = "flex justify-between items-center">
            <h2 class="text-3xl font-bold mb-8">Ассортимент книг</h2>


        

            <div class = "flex gap-4">

                <button @click="resetFilters" class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl transition">
                    Сбросить фильтры
                </button>



                <select @change="onChangeSelect" class = "py-2 px-3 border rounded-md outline-none bg-white">
                    <option value="title=asc">По названию</option>
                    <option value="price=asc">По цене(дешевые)</option>
                    <option value="price=desc">По цене(дорогие)</option>
                </select>

                <select @change="onGenreSelect" v-model="selectedGenre" class = "py-2 px-3 border rounded-md outline-none bg-white">
                    <option value="" disabled>Выберите жанр</option>
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                        {{ genre.name }}
                    </option>
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


<style scoped>
    select {
        max-height: 5rem; 
        overflow-y: auto;  
    }
</style>