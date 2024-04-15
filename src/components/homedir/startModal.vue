<!-- This is the code for the startModal.vue component  -->

<template>
    <div class="modal-backdrop" v-if="isVisible">
      <div class="modal-content">
        <h2>Welcome to Mapple Game!</h2>
        <p>Guess the country based on the clue given. Select your difficulty level to start playing.</p>
        <div class="buttons-container">
          <button @click="selectDifficulty('easy')" class="button-easy">Easy</button>
          <button @click="selectDifficulty('medium')" class="button-medium">Medium</button>
          <button @click="selectDifficulty('hard')" class="button-hard">Hard</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCountryStore } from '@/stores/useCountryStore';
  export default {
    data() {
      return {
        isVisible: true,
      };
    },
    methods: {
    selectDifficulty(level) {
      this.$emit('difficultySelected', level);
      this.isVisible = false;
      const countryStore = useCountryStore();
      countryStore.getRandomCountry();
    },
  },
  };
  </script>
  
  <style scoped>
  @import '@/assets/css/styles.css';
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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 80%; 
}

.buttons-container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
}

.button-easy {
    background-color: rgb(116, 167, 118);   
}

.button-medium {
    background-color: rgb(39, 120, 179);   
}

.button-hard {
   background-color: rgb(128, 33, 159);     
 }

.button-easy, .button-medium, .button-hard {
  margin: 10px;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  flex-grow: 1; 
}

@media (max-width: 600px) {
  .modal-content {
    padding: 15px;
    width: 80%; 
  }
  .button-easy, .button-medium, .button-hard {
    padding: 12px 10px; 
  }
}
  </style>
  