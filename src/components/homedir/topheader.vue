<!-- src\components\homedir\topheader.vue -->
<script>
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'TopHeader',
  emits: ['auth-modal-open', 'coming-soon-modal-open', 'tos-modal-open', 'privacy-modal-open'],  // Added two more emits
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

    const openToSModal = () => {
      emit('tos-modal-open');
    };

    const openPrivacyModal = () => {
    emit('privacy-modal-open');
  };

    return { authStore, handleAuthAction, openComingSoonModal, openToSModal, openPrivacyModal };
  }
}
</script>

<template>
  <v-app-bar dense>
    <img src="@/assets/images/logo/logo.png" alt="Mapple Logo" height="40" style="margin-right: auto;"> 
    <v-spacer></v-spacer>
    
    <v-btn icon @click="openToSModal">
      <v-icon>mdi-book-outline</v-icon>
    </v-btn>
    <v-btn icon @click="openPrivacyModal">
      <v-icon>mdi-shield-account-outline</v-icon>
    </v-btn>
    
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