<!-- this is the code for the src\components\mappledir\gameovermodal.vue -->

<script>

export default {
  name : 'GameOver-Modal',
  props: ['score'],
  emits: ['restartGame'],
  methods: {
    restartGame(level) {
      console.log('game is restarting')
      this.$emit('restartGame', level);
    }
  }
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Game Over!</h2>
      <p>Your score: {{ score }}</p>
      <div class="buttons-container">
        <button @click="restartGame('easy')" class="button-easy">Restart on Easy</button>
        <button @click="restartGame('medium')" class="button-medium">Restart on Medium</button>
        <button @click="restartGame('hard')" class="button-hard">Restart on Hard</button>
      </div>
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
  background-color: rgba(0, 0, 0, 0.75);
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
  max-width: 500px;
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

.buttons-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.button-easy, .button-medium, .button-hard {
  margin: 5px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: white;
}

.button-easy {
  background-color: #4CAF50;
}

.button-medium {
  background-color: #ff9800;
}

.button-hard {
  background-color: #f44336;
}
</style>
