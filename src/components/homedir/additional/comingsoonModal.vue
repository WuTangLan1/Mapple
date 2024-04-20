<!-- src\components\homedir\additional\comingsoonModal.vue -->
<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h2>Coming Soon: Daily Challenges!</h2>
            <p>Get ready for a new way to play Mapple! Our upcoming Daily Challenges will test your geographical prowess with a new country featured every day. Dive into a focused challenge where you select countries from the map until the correct one is identified. Are you up to the task of becoming a daily geography expert?</p>
            <p>Each day presents a fresh opportunity to learn interesting facts and test your knowledge against the clock. Earn badges and climb the leaderboard by participating daily and showing off your geographical skills!</p>
            <button @click="closeModal">Close</button>
        </div>
    </div>
    </template>
    
    <script>
    export default {
      name: "ComingSoonModal",
      methods: {
        closeModal() {
          this.$emit('close-modal');
        }
      }
    }
    </script>
    
    <style scoped>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-content {
      background: #fff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
      max-width: 80%;
      text-align: center;
      position: relative;
    }
    
    button {
      background-color: #4CAF50;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }
    
    button:hover {
      background-color: #45a049;
    }
    </style>
    