
<!-- src\components\homedir\topheader.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'TopHeader',
  emits: ['auth-modal-open', 'coming-soon-modal-open'],  // Add new event
  setup(props, { emit }) {
    const authStore = useAuthStore();

    const handleAuthAction = () => {
      if (authStore.user) {
        authStore.logout();
      } else {
        emit('auth-modal-open');
      }
    }

    // Function to emit event to open the Coming Soon modal
    const openComingSoonModal = () => {
      emit('coming-soon-modal-open');
    }

    return { authStore, handleAuthAction, openComingSoonModal };
  }
}
</script>


<template>
  <header class="top-header">
    <div class="logo-container">
      <img src="@/assets/images/logo/logo.png" alt="Mapple Logo" class="logo"/>
    </div>
    <nav class="navigation">
      <router-link to="/" class="nav-link">
        <img src="@/assets/images/header/home.png" alt="Home" class="nav-icon"/>
      </router-link>
      <div class="nav-link" @click="openComingSoonModal">
        <img src="@/assets/images/header/calender.png" alt="Daily" class="nav-icon"/>
      </div>
      <div class="nav-link" @click="handleAuthAction">
        <img v-if="authStore.user" src="@/assets/images/header/logout.png" alt="Logout" class="nav-icon"/>
        <img v-else src="@/assets/images/header/login.png" alt="Reg/Login" class="nav-icon"/>
      </div>
    </nav>
  </header>
</template>


<style scoped>
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0px; 
  background-color: #c9d2f3;
  width: 100%;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}

.logo-container {
  flex: 0 0 auto;
}

.logo {
  height: auto;
  width: auto;
  max-height: 60px; 
}

.navigation {
  display: flex;
  gap: 1rem; 
}

.nav-link {
  text-decoration: none;
  color: black;
  padding: 0.2em 0.8em; 
  border-radius: 5px; 
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.nav-icon {
  height: 35px; /* Adjust the size to fit your navigation bar */
  width: auto;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon {
  transform: scale(1.3); /* Slightly increase the size on hover for a visual effect */
}


</style>
