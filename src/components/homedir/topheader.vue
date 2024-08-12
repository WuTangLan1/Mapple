
<!-- src\components\homedir\topheader.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'TopHeader',
  emits: ['auth-modal-open', 'coming-soon-modal-open'],  
  setup(props, { emit }) {
    const authStore = useAuthStore();

    const handleAuthAction = () => {
      if (authStore.user) {
        authStore.logout();
      } else {
        emit('auth-modal-open');
      }
    }
    const openComingSoonModal = () => {
      emit('coming-soon-modal-open');
    }

    return { authStore, handleAuthAction, openComingSoonModal };
  }
}
</script>

<template>
  <v-app-bar dense>
    <img src="@/assets/images/logo/logo.png" alt="Mapple Logo" height="40" style="margin-right: auto;"> 
    <v-spacer></v-spacer>

    <v-btn icon @click="openComingSoonModal">
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
    <v-btn icon @click="handleAuthAction">
      <v-icon>{{ authStore.user ? 'mdi-logout' : 'mdi-login' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>


<style scoped>
.v-app-bar {
  background-color: #c9d2f3 !important;
  justify-content: space-between; 
}

img {
  margin-right: auto; 
}
</style>