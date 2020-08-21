<template>
  <div class="home">
    <b-container class="centered">
      <img alt="Vue logo" src="../assets/logo.png" />
      <Navbar />
      <b-card>
        <h4>My name is {{ name }}</h4>
      </b-card>
      <b-card>
        <h5>Computed</h5>
        <p>Original Message : {{ message }}</p>
        <p>Reverse Message : {{ reverseMessage }}</p>
        <input type="text" v-model="message" />
        <p>Computed Setter : {{ reverseMessage }}</p>
      </b-card>
      <b-card>
        <h5>Directive</h5>
        <!-- v-if -->
        <div v-if="isFulled === true">{{ name }}</div>
        <div v-else-if="isFulled === 'tampil'">Harjanto</div>
        <div v-else>Tri</div>
        <div v-show="isFulled === true">V show: {{ name }}</div>
        <!-- v-for -->
        <ul>
          <li v-for="(value, index) in product" :key="index">{{ value.name }} - {{ value.price }}</li>
        </ul>
        <!-- v-on -->
        <button @click="boom()">Click Me !</button>
        <input type="text" v-on:keyup.enter="search" />
        <br />
        <!-- v-bind -->
        <a
          :href="url_google"
          v-bind:style="url_google === 'http://google.com' ? isTrue : isFalse"
        >Click Link Google</a>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar'

export default {
  name: 'Home',
  data() {
    return {
      name: 'Bagus Tri Harjanto',
      message: 'Malam',
      a: 'Hai',
      b: 'Bagus',
      isFulled: false,
      product: [
        { name: 'Kipas', price: 100000 },
        { name: 'Mouse', price: 50000 }
      ],
      url_google: 'http://google.com',
      isTrue: {
        color: 'black'
      },
      isFalse: {
        color: 'red'
      }
    }
  },
  components: {
    Navbar
  },
  computed: {
    reverseMessage: {
      // getter
      get() {
        return this.message.split('').reverse().join('')
      },
      // setter
      set(newValue) {
        const value = newValue.split(' ')
        this.message = value[0]
      }
    }
  },
  methods: {
    boom() {
      console.log('Boom !')
      alert('Boom !')
    },
    search() {
      console.log('Search !')
      alert('Search !')
    }
  }
}
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>
