<template>
  <div class="header">
    <h1 class="hotel-name"><a href="/">ABC Hotel</a></h1>
    <div v-if="width < 768 & currentView != '/login'">
      <i class="bi bi-list" @click="showMenu()"></i>
      <div class="side" id="side">
        <NavbarHotel />
      </div>
    </div>
    <router-link to="/register" class="register-box" v-show="currentView == '/login'">
      Register
    </router-link>
  </div>
</template>

<script>
import NavbarHotel from './NavbarHotel.vue'

export default {
  name: 'HotelHeader',
  components: {
    NavbarHotel
  },

  setup() {
    const showMenu = () => {
      const sidebar = document.getElementById('side')
      console.log(sidebar.style.display)
      if (sidebar.style.display === '') {
        sidebar.style.display = 'block'
      } else {
        sidebar.style.display = ''
      }
    }

    return {
      showMenu,
    }
  },

  computed: {
    currentView() {
      return this.$route.path
    },
    width() {
      return window.innerWidth
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

@media (min-width: 769px) {
  .header {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    justify-content: space-between;
    display: flex;
  }

  .hotel-name {
    font-size: 30px;
  }

  .register-box {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    padding: 5px;
    font-size: 15px;
    cursor: pointer;
  }

  .register-box:hover {
    background-color: rgb(215, 215, 215);
  }
}

@media (max-width: 768px) {
  .header {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .hotel-name {
    font-size: 20px;
  }

  .side {
    display: none;
    position: absolute;
    right: 0;
  }

  .register-box {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    padding: 5px;
    font-size: 15px;
    cursor: pointer;
  }
}
</style>
