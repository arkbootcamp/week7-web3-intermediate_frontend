import axios from 'axios'

export default {
  state: {
    count: 0,
    cart: [],
    page: 1,
    limit: 6,
    sort: '',
    products: [],
    totalRows: null
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalRows = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    },
    addToCart(state, payload) {
      const setCart = {
        product_id: payload.product_id,
        product_name: payload.product_name,
        product_price: payload.product_harga,
        product_image: payload.product_image,
        product_qty: 1,
        product_total: payload.product_harga
      }
      const fixedData = [...state.cart, setCart]
      const addedItem = fixedData.find(
        item => item.product_id === payload.product_id
      )
      const existItem = state.cart.find(
        item => item.product_id === payload.product_id
      )
      if (existItem) {
        addedItem.product_total = payload.product_harga * payload.qty
        addedItem.product_qty += 1
      } else {
        state.cart = [...state.cart, setCart]
      }
    },
    incrementCart(state, payload) {
      const incrementData = state.cart.find(
        value => value.product_id === payload.product_id
      )
      incrementData.product_qty += 1
      incrementData.product_total = payload.product_price * payload.product_qty
    }
  },
  actions: {
    getProducts(context) {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${context.state.page}&limit=${context.state.limit}`
        )
        .then(response => {
          console.log(response.data)
          context.commit('setProduct', response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/product', payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            // console.log(error)
          })
      })
    },
    updateProducts(context, payload) {
      console.log(payload.product_id)
      console.log(payload.form)
      // return new Promise((resolve, reject) => {})
    },
    deleteProducts(context, payload) {
      console.log(payload)
      // return new Promise((resolve, reject) => {})
    }
  },
  getters: {
    getPage(state) {
      return state.page
    },
    getLimit(state) {
      return state.limit
    },
    getProduct(state) {
      return state.products
    },
    getTotalRows(state) {
      return state.totalRows
    },
    getCart(state) {
      return state.cart
    },
    getTotalsCart(state) {
      let total = 0
      state.cart.map(
        value => (total += value.product_price * value.product_qty)
      )
      return total
    }
  }
}
