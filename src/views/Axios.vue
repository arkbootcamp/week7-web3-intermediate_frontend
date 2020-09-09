<template>
  <div class="axios">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <Navbar />
    <hr />
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
        <input type="file" @change="handleFile" />
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
      <h1>{{totals}}</h1>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/_base/Navbar'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Axios',
  components: {
    Navbar
  },
  data() {
    return {
      product_id: '',
      form: {
        category_id: '',
        product_name: '',
        product_harga: '',
        product_status: '',
        product_image: ''
      },
      alert: false,
      isMsg: '',
      isUpdate: false,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      products: 'getProduct',
      rows: 'getTotalRows',
      limit: 'getLimit',
      cart: 'getCart',
      totals: 'getTotalsCart'
    })
  },
  methods: {
    ...mapActions([
      'getProducts',
      'addProducts',
      'updateProducts',
      'deleteProducts'
    ]),
    ...mapMutations(['changePage', 'addToCart', 'incrementCart']),
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.changePage(numberPage)
      this.getProducts()
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    handleFile(e) {
      this.form.product_image = e.target.files[0]
    },
    addProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_harga', this.form.product_harga)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      this.addProducts(data)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.getProducts()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    },
    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        category_id: data.category_id,
        product_harga: data.product_harga,
        product_status: data.product_status,
        product_image: data.product_image
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    patchProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_harga', this.form.product_harga)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      const setData = {
        product_id: this.product_id,
        form: data
      }
      this.updateProducts(setData)
      this.isUpdate = false
    },
    deleteProduct(data) {
      this.deleteProducts(data.product_id)
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style scoped>
.axios {
  text-align: center;
}
</style>
