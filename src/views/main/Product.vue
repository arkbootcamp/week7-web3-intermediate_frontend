<template>
  <div>
    <h1>Page Product</h1>
    <form>
      <input type="text" v-model="form.product_name" placeholder="Product Name..." />
      <br />
      <input type="text" v-model="form.product_harga" placeholder="Product Harga..." />
      <br />
      <input type="text" v-model="form.category_id" placeholder="Category Id..." />
      <br />
      <input type="text" v-model="form.product_status" placeholder="Product Status..." />
      <br />
      <input type="file" @change="handleFile" />
      <br />
      <br />
      <button @click.prevent="postProduct">Submit</button>
      <!-- <button>Update</button> -->
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
      form: {
        product_name: '',
        category_id: '',
        product_harga: '',
        product_status: '',
        product_image: {}
      }
    }
  },
  methods: {
    ...mapActions(['addProducts']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
      console.log(event.target.files[0])
    },
    postProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_harga', this.form.product_harga)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      // console.log(this.form)
      this.addProducts(data)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
