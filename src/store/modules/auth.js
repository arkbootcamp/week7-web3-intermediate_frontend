import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
      console.log(state.user)
    },
    delUser(state) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/users/login', payload)
          .then(response => {
            console.log(response)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('refreshToken', response.data.data.refreshToken)
            // router.push('/')
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    // proses register
    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      sessionStorage.clear()
      context.commit('delUser')
      router.push('/login')
    },
    interceptorRequest(context) {
      console.log('interceptor Works !')
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          // Do something before request is sent
          return config
        },
        function(error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response
        },
        function(error) {
          console.log(error.response)
          if (error.response.status === 403) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature'
            ) {
              context.dispatch('logout')
              // localStorage.removeItem('token')
              // localStorage.removeItem('refreshToken')
              // sessionStorage.clear()
              // context.commit('delUser')
              // router.push('/login')
              alert(
                'Maaf token anda salah dan anda tidak bisa melanjutkan di halaman ini !'
              )
            } else if (error.response.data.msg === 'jwt expired') {
              const setData = {
                userId: context.state.user.user_id,
                refreshToken: localStorage.getItem('refreshToken')
              }
              axios
                .post('http://127.0.0.1:3001/users/token', setData)
                .then(response => {
                  console.log(response)
                  localStorage.removeItem('token')
                  localStorage.removeItem('refreshToken')
                  localStorage.setItem('token', response.data.data.token)
                  localStorage.setItem('refreshToken', response.data.data.refreshToken)
                  context.commit('setUser', response.data.data)
                  location.reload()
                })
                .catch(error => {
                  alert(error.response.data.msg)
                  context.dispatch('logout')
                  // localStorage.removeItem('token')
                  // localStorage.removeItem('refreshToken')
                  // sessionStorage.clear()
                  // context.commit('delUser')
                  // router.push('/login')
                })
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    setUser(state) {
      return state.user
    }
  }
}
