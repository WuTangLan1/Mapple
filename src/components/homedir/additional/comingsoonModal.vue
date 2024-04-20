<!-- src\components\homedir\additional\comingsoonModal.vue -->
<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h2>🌟 Coming Soon: Daily Challenges! 🌟</h2>
            <p><strong>Excitement Alert!</strong> A thrilling new game mode is on the horizon! Prepare to put your geography knowledge to the ultimate test with <em>Daily Challenges</em> — a feature where every day is a new adventure!</p>
            <p>Zoom into a world of fun and sharpen your map skills by pinpointing the mystery country of the day. Hurry though, the clock is ticking! Quick wits and rapid responses will be your allies as you strive for glory.</p>
            <p>🏅 Chase daily high scores, collect exclusive badges, and make your mark on the global leaderboard. It's not just about being smart, it's about being quick! Stay tuned, explorers!</p>
            <button class="close-btn" @click="closeModal">Close</button>
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

    @media (max-width: 600px) {
        .modal-content {
            width: 70%; 
        }
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
    