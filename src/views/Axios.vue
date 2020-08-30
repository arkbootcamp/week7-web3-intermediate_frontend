<template>
  <div class="axios">
    <h1>Axios Page</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <Navbar />
    <!-- <b-button :disabled="product_qty === 1" size="lg">-</b-button> -->
    <!-- ==================================================================== -->
    <b-container>
      <b-alert :show="alert">{{ isMsg }}</b-alert>
      <form v-on:submit.prevent="addProduct">
        <input type="text" v-model="form.product_name" placeholder="Product Name" />
        <br />
        <input type="text" v-model="form.product_harga" placeholder="Product Harga" />
        <br />
        <input type="text" v-model="form.category_id" placeholder="Category Id" />
        <br />
        <input type="text" v-model="form.product_status" placeholder="Product Status" />
        <br />
        <button type="submit" v-show="!isUpdate">Save</button>
        <button type="button" v-show="isUpdate" @click="patchProduct()">Update</button>
      </form>
    </b-container>
    <hr />
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4" v-for="(item, index) in products" :key="index">
          <b-card
            v-bind:title="item.product_name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <!-- ========================================= -->
            <p v-if="checkCart(item)">checklist</p>
            <!-- ========================================= -->
            <b-card-text>{{ item.product_harga }}</b-card-text>
            <b-button variant="primary" @click="addToCart(item)">Add To Cart</b-button>
            <b-button variant="success" @click="setProduct(item)">Update</b-button>
            <b-button variant="danger" @click="deleteProduct(item)">Delete</b-button>
          </b-card>
        </b-col>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="limit"
        @change="handlePageChange"
        aria-controls="my-table"
      ></b-pagination>

      <div v-for="(value, index) in cart" :key="index">
        <h6>{{value.product_name}}</h6>
        <button>-</button>
        <input type="text" :value="value.product_qty" />
        <button @click="incrementCart(value)">+</button>
        <p>{{value.product_total}}</p>
        <hr />
      </div>
      <h1>{{totals()}}</h1>
    </b-container>
    <!-- ==================================================================== -->
    <Card nama="Kopi" harga="2000" @increment="incrementCount" />
    <Card nama="Susu" harga="3000" v-bind:dataCart="cart" />
    <p>{{ count }}</p>
    <div v-if="cart.length > 0"></div>
    <div v-else></div>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '../components/_base/Card'
import Navbar from '../components/_base/Navbar'

export default {
  name: 'Axios',
  components: {
    Card,
    Navbar
  },
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 3,
      sort: '',
      products: [],
      form: {
        category_id: '',
        product_name: '',
        product_harga: '',
        product_status: ''
      },
      alert: false,
      isMsg: '',
      isUpdate: false,
      product_id: '',
      currentPage: 1,
      totalRows: null
    }
  },
  computed: {
    rows() {
      return this.totalRows
    }
  },
  created() {
    this.get_product()
  },
  updated() {
    console.log(this.$route.query)
  },
  methods: {
    totals() {
      let total = 0
      this.cart.map(
        (value) => (total += value.product_price * value.product_qty)
      )
      return total
    },
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.page = numberPage
      this.get_product()
    },
    incrementCart(data) {
      // console.log(data) // item yang di klik
      // console.log(this.cart) // array
      const incrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      incrementData.product_qty += 1
      incrementData.product_total = data.product_price * data.product_qty
      // incrementData.totalPrice = incrementData.price * ....
      // console.log(this.cart)
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    incrementCount(data) {
      this.count += data
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_harga,
        product_qty: 1,
        product_total: data.product_harga
      }
      const fixedData = [...this.cart, setCart]
      const addedItem = fixedData.find(
        (item) => item.product_id === data.product_id
      )
      const existItem = this.cart.find(
        (item) => item.product_id === data.product_id
      )
      if (existItem) {
        addedItem.product_total = data.product_harga * data.qty
        addedItem.product_qty += 1
      } else {
        this.cart = [...this.cart, setCart]
      }
      // console.log(fixedData)
      // spread opertaor
      // this.cart = [...this.cart, setCart]
      // console.log(this.cart)
    },
    get_product() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}`
        )
        .then((response) => {
          this.products = response.data.data
          this.totalRows = response.data.pagination.totalData
          // console.log(this.totalRows)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then((response) => {
          // console.log(response)
          this.alert = true
          this.isMsg = response.data.msg
          this.get_product()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        category_id: data.category_id,
        product_harga: data.product_harga,
        product_status: data.product_status
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    patchProduct() {
      console.log(this.product_id)
      console.log(this.form)
      this.isUpdate = false
    },
    deleteProduct(data) {
      console.log(data.product_id)
    }
  }
}
</script>

<style scoped>
.axios {
  text-align: center;
}
</style>
