<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/axios">Axios</router-link> |
    <router-link to="/lifecycle">Lifecycle</router-link> |
    <a class="logout" @click="handleLogout">Logout</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Navbar',
  methods: {
    ...mapActions({ handleLogout: 'logout' })
    // handleLogout() {
    //   console.log('logout clicked')
    // }
  }
}
</script>

<style scoped>
.logout {
  cursor: pointer;
}
</style>
