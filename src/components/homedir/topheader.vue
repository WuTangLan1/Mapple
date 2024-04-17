
<!-- src\components\homedir\topheader.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'TopHeader',
  emits: ['auth-modal-open'], 
  setup(props, { emit }) {
    const authStore = useAuthStore();

    const handleAuthAction = () => {
      if (authStore.user) {
        authStore.logout();
      } else {
        emit('auth-modal-open');
      }
    }

    return { authStore, handleAuthAction };
  }
}
</script>

<template>
  <header class="top-header">
    <div class="logo-container">
      <img src="@/assets/images/logo/mapple_logo.png" alt="Mapple Logo" class="logo"/>
    </div>
    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/daily" class="nav-link">Daily</router-link>
      <div class="nav-link" @click="handleAuthAction">
        {{ authStore.user ? 'Logout' : 'Register/Login' }}
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
  padding: 10px 15px; 
  border-radius: 5px; 
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  background-color: #3a5f70;
  color: white; 
  text-decoration: none;
}
</style>
