<template>
  <div class="wrapper" id="app">
  <div class="card-form">
    <div class="card-list">
      <div class="card-item" v-bind:class="{ '-active' : isCardFlipped }">
        <div class="card-item__side -front">
          <div class="card-item__focus" v-bind:class="{'-active' : focusElementStyle }" v-bind:style="focusElementStyle" ref="focusElement"></div>
          <div class="card-item__cover">
            <img
            v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'" class="card-item__bg">
          </div>
          
          <div class="card-item__wrapper">
            <div class="card-item__top">
              <img src="/2.png" class="card-item__chip">
              <div class="card-item__type">
                <transition name="slide-fade-up">
                  <img v-bind:src= "'/mir.png'" class="card-item__typeImg">
                </transition>
              </div>
            </div>

            <label for="cardNumber" class="card-item__number" ref="cardNumber">
                <span v-for="(n, $index) in otherCardMask" :key="$index">
                  <transition name="slide-fade-up">
                    <div
                      class="card-item__numberItem"
                      v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''"
                    >*</div>
                    <div class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                      :key="$index" v-else-if="cardNumber.length > $index">
                      {{cardNumber[$index]}}
                    </div>
                    <div
                      class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                      v-else
                      :key="$index + 1"
                    >{{n}}</div>
                  </transition>
                </span>
            

            </label>
            <div class="card-item__content">
              <label for="cardName" class="card-item__info" ref="cardName">
                <div class="card-item__holder">Имя Фамилия</div>
                <transition name="slide-fade-up">
                  <div class="card-item__name" v-if="cardName.length" key="1">
                    <transition-group name="slide-fade-right">
                      <span class="card-item__nameItem" v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')" v-bind:key="$index + 1">{{n}}</span>
                    </transition-group>
                  </div>
                  <div class="card-item__name" v-else key="2">Ivanov I.I</div>
                </transition>
              </label>
              <div class="card-item__date" ref="cardDate">
                <label for="cardMonth" class="card-item__dateTitle">Дата</label>
                <label for="cardMonth" class="card-item__dateItem">
                  <transition name="slide-fade-up">
                    <span v-if="cardMonth" v-bind:key="cardMonth">{{cardMonth}}</span>
                    <span v-else key="2">MM</span>
                  </transition>
                </label>
                /
                <label for="cardYear" class="card-item__dateItem">
                  <transition name="slide-fade-up">
                    <span v-if="cardYear" v-bind:key="cardYear">{{String(cardYear).slice(2,4)}}</span>
                    <span v-else key="2">YY</span>
                  </transition>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item__side -back">
          <div class="card-item__cover">
            <img
            v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'" class="card-item__bg">
          </div>
          <div class="card-item__band"></div>
          <div class="card-item__cvv">
              <div class="card-item__cvvTitle">CVV</div>
              <div class="card-item__cvvBand">
                <span class = "secret" v-for="(n, $index) in cardCvv" :key="$index">
                  *
                </span>
              
              </div>
                <div class="card-item__type">
                    <img v-bind:src="'/mir.png'" class="card-item__typeImg">
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-form__inner">
        <div class="card-input">
          <label for="cardNumber" class="card-input__label">Номер карты</label>
          <input type="text" id="cardNumber" class="card-input__input" v-mask="otherCardMask" v-model="cardNumber" data-ref="cardNumber" autocomplete="off">
        </div>
        <div class="card-input">
          <label for="cardName" class="card-input__label">Держатель карты</label>
          <input type="text" id="cardName" class="card-input__input" v-model="cardName" data-ref="cardName" autocomplete="off">
        </div>
        <div class="card-form__row">
          <div class="card-form__col">
            <div class="card-form__group">
              <label for="cardMonth" class="card-input__label">Дата</label>
              <select class="card-input__input -select" id="cardMonth" v-model="cardMonth" data-ref="cardDate">
                <option value="" disabled selected>Месяц</option>
                <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:disabled="n < minCardMonth" v-bind:key="n">
                    {{n < 10 ? '0' + n : n}}
                </option>
              </select>
              <select class="card-input__input -select" id="cardYear" v-model="cardYear" data-ref="cardDate">
                <option value="" disabled selected>Год</option>
                <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">
                    {{$index + minCardYear}}
                </option>
              </select>
            </div>
          </div>
          <div class="card-form__col -cvv">
            <div class="card-input">
              <label for="cardCvv" class="card-input__label">CVV</label>
              <input type="text" class="card-input__input" id="cardCvv" v-mask="'###'" maxlength="3" v-model="cardCvv" v-on:focus="flipCard(true)" v-on:blur="flipCard(false)" autocomplete="off">
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center text-lg font-semibold mt-4 p-2 border rounded-lg bg-gray-50">
          <span class="text-gray-700">К оплате:</span>
          <span class="text-blue-500">{{ paymentAmount }} ₽</span>
        </div>

        <button @click="handlePayment" class="card-form__button">
          Оплатить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import store from '../store';
export default {
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), 
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      paymentAmount: 0
    };
  },
  created() {
    this.paymentAmount = store.getters.totalAmount
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    },
    
    handlePayment() {
      store.dispatch('clearCart'); // Очищаем корзину
      this.$router.push('/'); // Переход на главную страницу
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./styles.scss"; 
</style>


