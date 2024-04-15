<!-- This is the code for src\components\auth\authModal.vue -->

<template>
    <div class="modal-backdrop">
      <div class="modal">
        <button @click="toggleComponent">Toggle</button>
        <button class="close-button" @click="closeModal">✕</button>
        <component :is="currentComponent"></component>
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
    setup(props, { emit }) {
      const currentComponent = ref('RegSide');
  
      function toggleComponent() {
        currentComponent.value = currentComponent.value === 'RegSide' ? 'LogSide' : 'RegSide';
      }
  
      function closeModal() {
        console.log('closemodal clicked')
        emit('update:isVisible', false);
      }
  
      return { currentComponent, toggleComponent, closeModal };
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
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    animation: dropAnimation 1.5s ease-in-out forwards;
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
  position: absolute;
  background: none;
  left: 0;
  top:0;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 10px;
}


.close-button {
  position: absolute;
  background: none;
  right: 0;
  top:0;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 10px;
}

.close-button:hover {
  transform: rotate(180deg);
}

  </style>
  