<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Регистрация</h2>
        <form @submit.prevent="register">
            <input v-model="name" type="text" placeholder="Имя пользователя" required class="w-full p-2 mb-4 border rounded" />
            <input v-model="email" type="email" placeholder="Email" required class="w-full p-2 mb-4 border rounded" />
            <input v-model="phone" type="tel" placeholder="Телефон" required class="w-full p-2 mb-4 border rounded" />
            <input v-model="password" type="password" placeholder="Пароль" required class="w-full p-2 mb-4 border rounded" />
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Зарегистрироваться</button>
        </form>
        <p class="mt-4">Уже есть аккаунт? <router-link to="/login"><a class="text-blue-500 hover:underline">Войти</a></router-link></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            phone: '', // Добавляем поле для телефона
            password: ''
        };
    },
    methods: {
        async register() {
            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        password: this.password
                    })
                });

                const data = await response.json();
                
                console.log(data)

                if (response.ok) {
                    alert('Регистрация успешна! Теперь вы можете войти в систему.');
                    // Дополнительная логика, например, перенаправление на страницу входа
                    this.$router.push('/login'); // Предполагаем, что у вас есть маршрут на страницу входа
                } else {
                    alert(data.message || 'Ошибка регистрации');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при регистрации. Попробуйте еще раз.');
            }
        }
    }
};
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
