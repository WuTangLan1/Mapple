<!-- This is the code for src\components\auth\authModal.vue -->
<script>
import { computed, ref, watch } from 'vue';
import RegSide from './regSide.vue';
import LogSide from './logSide.vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  components: {
    RegSide,
    LogSide
  },
  setup(props, { emit }) {
    const currentComponent = ref('RegSide');
    const authStore = useAuthStore();
    const dialogVisible = ref(true);

    const toggleButtonText = computed(() => {
      return currentComponent.value === 'RegSide' ? 'Log In' : 'Register';
    });

    watch(() => authStore.user, (newUser) => {
      if (newUser) {
        dialogVisible.value = false;
      }
    });

    function toggleComponent() {
      currentComponent.value = currentComponent.value === 'RegSide' ? 'LogSide' : 'RegSide';
    }

    function closeModal() {
      dialogVisible.value = false;
      emit('closeModal'); 
    }

    return {
      currentComponent,
      toggleComponent,
      closeModal,
      toggleButtonText,
      dialogVisible
    };
  }
};
</script>

<template>
  <v-dialog v-model="dialogVisible" persistent max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <v-btn color="blue darken-1" text @click="toggleComponent">
          Switch to {{ toggleButtonText }}
        </v-btn>
        <v-spacer></v-spacer> 
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <component :is="currentComponent" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-dialog .v-card {
  overflow: hidden; 
}
</style>

  