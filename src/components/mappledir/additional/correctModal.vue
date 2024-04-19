<!-- This is the code for hte src\components\mappledir\additional\correctModal.vue -->

<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <p class="correct">{{ country.c_name }}</p>
      <img :src="country.flag_url" alt="Flag of the country" class="flag">
      <p class="blurb">{{ country.blurb }}</p>
      <p class="encouragement">Keep up the great work!</p>
      <button class="next-button" @click="closeModal">Next</button>
    </div>
  </div>
</template>

  
  <script>
  import { computed} from 'vue';
  import { useCountryStore } from '@/stores/useCountryStore';
 
  export default {
    name: 'CorrectModal',
    props: ['visible'],
    emits: ['close'],
    setup(props, { emit }) {
      const countryStore = useCountryStore();
      const country = computed(() => countryStore.currentCountry);
  
      const closeModal = () => {
        emit('close');
      };
    
      return {
        country,
        closeModal
      };
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
  background-color: rgba(0, 0, 0, 0.6); 
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
  max-width: 60%; 
  text-align: center;
  position: relative; 
  transition: all 0.3s ease; 
  margin-bottom: 20%;
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

h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.encouragement {
  background-color: #dff0d8; /* Light green for additional success highlight */
  color: #3c763d; /* Darker text for contrast */
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.correct {
  background-color: #d8def0; /* Light green for additional success highlight */
  color: #000000; /* Darker text for contrast */
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

h1 {
  margin: 0 0 1rem 0; /* Spacing under the title */
  color: #333;
  font-size: 1.75rem;
}

.flag {
  max-width: 100%; /* Make flag responsive */
  height: auto; /* Maintain aspect ratio */
  margin: 1rem 0; /* Space around the flag */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.7); /* Subtle shadow for the flag */
}

.next-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  margin-top: 0.5em;
  padding: 0.5rem 1rem;
  background-color: #3498db; /* A nice blue color for the button */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s; /* Smooth transition for hover effect */
}

.next-button:hover {
  background-color: #2980b9; /* A slightly darker blue for the hover state */
}

p {
  color: #555;
  line-height: 1.6;
}

  </style>
  