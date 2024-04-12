<!-- This is the code for hte src\components\mappledir\additional\correctModal.vue -->

<template>
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h1>{{ country.name }}</h1>
        <img :src="country.flag_url" alt="Flag of the country">
        <p>{{ blurbText }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  import { useCountryStore } from '@/stores/useCountryStore';
  import { db } from '@/components/fbdir/fbInit';  // Ensure this path is correct
  
  export default {
    name: 'CorrectModal',
    props: ['visible'],
    setup(props, { emit }) {
      const countryStore = useCountryStore();
      const country = computed(() => countryStore.currentCountry);
      const blurbText = ref('');
  
      // Define fetchBlurb inside setup
      const fetchBlurb = async () => {
        try {
          const blurbRef = db.collection('countries').doc(country.value.id).collection('blurb').doc('exampleDoc');
          const doc = await blurbRef.get();
          if (doc.exists()) {
            blurbText.value = doc.data().text;
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        }
      };
  
      const closeModal = () => {
        emit('close');
      };
  
      // Setup watcher using the watch function from the Composition API
      watch(() => props.visible, (newVal) => {
        if (newVal) {
          fetchBlurb();  // Now correctly scoped
        }
      });
  
      return {
        country,
        blurbText,
        fetchBlurb,  // Make sure to return it here
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    transition: opacity 0.5s ease;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 25px;
    cursor: pointer;
  }
  </style>
  