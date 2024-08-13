<!-- This is the code for hte src\components\mappledir\additional\correctModal.vue --> 
<script>
import { computed } from 'vue';
import { useCountryStore } from '@/stores/useCountryStore';

export default {
  name: 'CorrectModal',
  props: {
    visible: Boolean  
  },
  emits: ['update:visible', 'close'],  
  setup(props, { emit }) {
    const countryStore = useCountryStore();
    const country = computed(() => countryStore.currentCountry);

    const dialogVisible = computed({
      get: () => props.visible,
      set: value => emit('update:visible', value)  
    });

    const closeModal = () => {
      emit('update:visible', false);  
      emit('close');
    };

    return {
      country,
      dialogVisible,
      closeModal
    };
  }
}
</script>

<template>
  <v-dialog v-model="dialogVisible" persistent max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ country.c_name }}</span>
        <v-btn color="blue darken-1" text @click="closeModal">Next</v-btn>
      </v-card-title>
      <v-card-text>
        <v-img :src="country.flag_url" aspect-ratio="1.7" contain></v-img>
        <p>{{ country.blurb }}</p>
        <v-alert dense type="success">{{ "Keep up the great work!" }}</v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-btn {
  margin-top: -3px; 
}
</style>
