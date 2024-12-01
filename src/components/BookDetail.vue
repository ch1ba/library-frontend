<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 space-y-8">
      <div v-if="book" class="max-w-4xl w-full bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        <!-- Left Side: Book Cover and Basic Info -->
        <div 
          class="relative w-full md:w-2/5 h-[500px] flex flex-col justify-center items-center text-center p-8"
          :style="{ backgroundColor: getRandomColor() }"
        >
          <span class="absolute inset-0 text-white text-[200px] opacity-10 flex justify-center items-center font-bold">
            {{ book.title[0].toUpperCase() }}
          </span>
          
          <div class="z-10 text-white">
            <h1 class="text-3xl font-bold mb-4">{{ book.title }}</h1>
            <p class="text-2xl font-semibold mb-6">{{ book.author.trim() }}</p>
            
            <div class="bg-white bg-opacity-20 rounded-lg p-4 mt-6">
              <p class="text-white text-opacity-90 text-lg font-medium">
                {{ book.genre }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Right Side: Detailed Information -->
        <div class="w-full md:w-3/5 p-8 flex flex-col justify-between">
          <div>
            <div class="mb-6">
              <span class="text-gray-600 text-lg font-semibold block mb-2">Аннотация:</span>
              <p class="text-gray-800 text-base leading-relaxed">{{ book.annotation }}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-base">
              <div>
                <span className="text-gray-500 block">Год издания:</span>
                <p className="font-semibold text-gray-800">{{ book.publication_year }}</p>
              </div>
              <div>
                <span className="text-gray-500 block">ISBN:</span>
                <p className="font-semibold text-gray-800">{{ book.isbn }}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div>
              <span className="text-gray-500 text-base block">Цена:</span>
              <p className="text-3xl font-bold text-blue-600">
                {{ book.price.toLocaleString() }} руб.
              </p>
            </div>
            
            <button 
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors text-base font-semibold"
              @click="addToCart"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
      
    <div class="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Отзывы читателей</h2>
      
      <div class="space-y-6">
        <div 
          v-for="(review, index) in reviews" 
          :key="index" 
          class="bg-gray-50 p-6 rounded-lg"
        >
          <div class="flex items-center mb-4">
            <div 
              class="w-12 h-12 rounded-full mr-4 flex items-center justify-center font-bold text-white"
              :style="{ backgroundColor: getRandomColor() }"
            >
              {{ review.name[0].toUpperCase() }}
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">{{ review.name }}</h3>
              <div class="flex text-yellow-500">
                <svg v-for="n in review.rating" :key="n" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
          <p class="text-gray-600">{{ review.text }}</p>
          <p class="text-sm text-gray-500 mt-2">{{ review.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: null,
      reviews: [
        {
          name: "Анна Петрова",
          rating: 5,
          text: "Невероятно глубокое и захватывающее произведение! Каждая страница заставляет задуматься о человеческой природе и исторических процессах. Толстой - абсолютный гений.",
          date: "2 недели назад"
        },
        {
          name: "Михаил Смирнов",
          rating: 4,
          text: "Эпический роман, который не оставляет равнодушным. Детальное описание быта и психологии персонажей просто великолепно. Местами немного сложно читается, но того стоит.",
          date: "1 месяц назад"
        },
        {
          name: "Елена Кузнецова",
          rating: 5,
          text: "Шедевр мировой литературы! Глубина характеров, философские размышления о войне и мире - это то, что делает книгу вне времени. Рекомендую каждому.",
          date: "3 недели назад"
        }
      ]
    };
  },
  methods: {
    fetchBookDetails(bookId) {
      fetch(`http://localhost:3000/api/books/${bookId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Сетевая ошибка при получении данных о книге');
          }
          return response.json();
        })
        .then(data => {
          this.book = data;
        })
        .catch(error => {
          console.error("Ошибка при загрузке данных о книге:", error);
        });
    },
    getRandomColor() {
      const colors = [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#6366F1', // Indigo
        '#8B5CF6', // Purple
        '#EC4899'  // Pink
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    addToCart() {
      alert(`Книга "${this.book.title}" добавлена в корзину`);
    }
  },
  created() {
    const bookId = this.$route.params.id;
    this.fetchBookDetails(bookId);
  }
};
</script>
