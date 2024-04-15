<!-- This is the code for src\components\auth\authModal.vue -->

<template>
    <div class="modal-backdrop" v-if="isVisible">
      <div class="modal">
        <component :is="currentComponent"></component>
        <button @click="toggleComponent">Toggle</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import RegSide from './regSide.vue';
  import LogSide from './logSide.vue';
  
  export default {
    components: {
      RegSide,
      LogSide
    },
    props: ['isVisible'],
    emits: ['update:isVisible'],
    setup() {
      const currentComponent = ref('RegSide');
  
      function toggleComponent() {
        currentComponent.value = currentComponent.value === 'RegSide' ? 'LogSide' : 'RegSide';
      }
  
      return { currentComponent, toggleComponent };
    }
  };
  </script>
  
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
  }
  </style>
  