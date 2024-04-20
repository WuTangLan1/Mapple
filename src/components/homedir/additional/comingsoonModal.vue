<!-- src\components\homedir\additional\comingsoonModal.vue -->
   
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

    <template>
        <div class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h2>🌟 Coming Soon: Daily Challenges! 🌟</h2>
                </div>
                <div class="modal-body">
                    <p><strong>Excitement Alert!</strong> A thrilling new game mode is on the horizon! Prepare to put your geography knowledge to the ultimate test with <em>Daily Challenges</em> — a feature where every day is a new adventure!</p>
                    <p>Zoom into a world of fun and sharpen your map skills by pinpointing the mystery country of the day. Hurry though, the clock is ticking! Quick wits and rapid responses will be your allies as you strive for glory.</p>
                    <p>🏅 Chase daily high scores, collect exclusive badges, and make your mark on the global leaderboard. It's not just about being smart, it's about being quick! Stay tuned, explorers!</p>
                </div>
                <div class="modal-footer">
                    <button class="close-btn" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </template>
    
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
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
      max-width: 80%;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (max-width: 600px) {
        .modal-content {
            width: 70%; 
        }
    }

    .modal-body {
        /* Additional styling for body if needed */
        margin-bottom: 1rem;
        }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        }

        h2 {
            color: rgb(93, 93, 198);
        }

    
    button {
      background-color: #4CAF50;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 0;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }
    
    button:hover {
      background-color: #45a049;
    }
    </style>
    