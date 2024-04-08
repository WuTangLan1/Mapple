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
      },
    },
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
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  
  .buttons-container {
    margin-top: 20px;
  }
  
  .button-easy, .button-medium, .button-hard {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  
  .button-easy {
    background-color: #4CAF50; /* Green */
  }
  
  .button-medium {
    background-color: #FFC107; /* Amber */
  }
  
  .button-hard {
    background-color: #F44336; /* Red */
  }
  </style>
  