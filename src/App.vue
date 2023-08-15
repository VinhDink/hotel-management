<template>
  <div class="layout">
    <div class="header">
      <HotelHeader />
    </div>
    <div class="body">
      <div v-if="shouldDisplaySidebar !== '/login' && !shouldDisplaySidebar.includes('/reset-password/')  && shouldDisplaySidebar !== '/register' && shouldDisplaySidebar !== '/verify-email' && width > 769">
        <div class="sidebar">
          <NavbarHotel />
        </div>
      </div>
      <div class="view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavbarHotel from './components/NavbarHotel.vue'
import HotelHeader from './components/HotelHeader.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    HotelHeader,
    NavbarHotel
  },

  setup() {
    const width = ref(window.innerWidth)

    return {
      width,
    }
  },
  computed: {
    shouldDisplaySidebar() {
      const currentView = this.$route.path;
      return currentView;
    },
  },

}
</script>
<style scoped>
@media (min-width: 769px) {

  .header {}

  .layout {
    width:99vw;
    min-height: 100vh;
  }
  .body {
    display: flex;
    width:100%;
  }

  .layout {
    display: flex;
    flex-direction: column;

  }

  .footer {
    margin-top: auto
  }

  .sidebar {
    position: sticky;
    top: 0;
  }

  .view {
    width: 100%;
  }
}

@media (max-width:768px) {
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  .body {
    display: flex;
    flex-direction: column;
  }
}
</style>
