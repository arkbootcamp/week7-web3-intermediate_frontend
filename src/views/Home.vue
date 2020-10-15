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
      <b-card>
        <h5>Custom Directive</h5>
        <input type="text" v-focus>
        <p v-fontsize="fontSizes <= 5 ? 'small' : 'medium'">Hello World</p>
      </b-card>
      <b-card>
        <h5>Mixins</h5>
         <b-button id="show-btn" @click="showModal">Open Modal</b-button>
          <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button>

          <b-modal ref="my-modal" hide-footer title="Using Component Methods">
            <div class="d-block text-center">
              <h3>Hello From My Modal!</h3>
            </div>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
            <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
          </b-modal>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import mixins from '../mixins/mixins'
import Navbar from '../components/_base/Navbar'

export default {
  name: 'Home',
  mixins: [mixins],
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
      },
      fontSizes: 1,
      msg: 'this message in home.vue'
    }
  },
  created() {
    console.log(this.msg)
  },
  directives: {
    fontsize: {
      bind: function(el, binding) {
        console.log(binding)
        if (binding.value === 'small') {
          el.style.fontSize = '5px'
        } else {
          el.style.fontSize = '25px'
        }
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
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    }
  }
}
</script>

<style scoped>
.centered {
  text-align: center;
}
</style>
