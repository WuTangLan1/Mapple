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

    const toggleButtonText = computed(() => {
      return currentComponent.value === 'RegSide' ? 'Log In' : 'Register';
    });

    watch(() => authStore.user, (newUser) => {
      if (newUser) {
        closeModal(); 
      }
    });

    function toggleComponent() {
      currentComponent.value = currentComponent.value === 'RegSide' ? 'LogSide' : 'RegSide';
    }

    function closeModal() {
      emit('closeModal');
    }

    return {
      currentComponent,
      toggleComponent,
      closeModal,
      toggleButtonText // make sure to return it here so it can be used in the template
    };
  }
};
</script>

<template>
    <div class="modal-backdrop">
      <div class="modal">
        <button @click="toggleComponent" class="toggle-button">
          Switch to {{ toggleButtonText }}
        </button>
        <button class="close-button" @click="closeModal">✕</button>
        <component :is="currentComponent"></component>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 30px;
    border-radius: 5px;
    width: auto;
    max-width: 90%;
    max-height: 95vh;
    overflow: auto;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    animation: dropAnimation 1.5s ease-in-out forwards;
    position: relative; /* For absolute positioning of child elements like close button */
  }

  @keyframes dropAnimation {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .toggle-button {
      /* Style adjustments */
      background-color: #759acd; /* Light grey background */
      color: #ffffff; /* Dark text color for contrast */
      padding: 10px 20px;
      border-radius: 5px;
      border: 1px solid #ccc; /* Light border */
      font-weight: bold; /* Make text bold */
      position: absolute;
      top: 20px; /* Distance from the top */
      left: 50%; /* Center horizontally */
      transform: translateX(-50%); /* Adjust for exact centering */
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

  .close-button {
    color: #2562b8;
    position: absolute;
    background: none;
    right: 0;
    top:0;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .close-button:hover {
    transform: rotate(180deg);
  }

  </style>
  