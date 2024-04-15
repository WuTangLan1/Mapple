<!-- This is the code for hte src\components\mappledir\additional\correctModal.vue -->

<template>
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p class="correct">You guessed correctly: {{ country.c_name }}</p>
        <img :src="country.flag_url" alt="Flag of the country" class="flag">
        <p class="blurb">{{ country.blurb }}</p>
        <p class="encouragement">Keep up the great work!</p>
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
  background-color: rgba(0, 0, 0, 0.6); /* Darker overlay for better focus on modal */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2); /* Smooth shadow for depth */
  max-width: 60%; /* Limiting max width */
  text-align: center; /* Centering text */
  position: relative; /* For absolute positioning of the close button */
  transition: all 0.3s ease; /* Smoother transition */
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
  margin-top: 1rem;
  font-weight: bold;
}

.correct {
  background-color: #d8def0; /* Light green for additional success highlight */
  color: #000000; /* Darker text for contrast */
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 1rem;
  font-weight: bold;
}

.close {
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  font-size: 2rem; /* Larger close icon */
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease; /* Color transition for hover effect */
}

.close:hover {
  color: #666; /* Darker shade when hovered */
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

p {
  color: #555;
  line-height: 1.6;
}

  </style>
  