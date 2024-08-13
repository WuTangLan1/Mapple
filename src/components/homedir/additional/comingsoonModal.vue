<!-- src\components\homedir\additional\comingsoonModal.vue -->

<script>
export default {
  name: "ComingSoonModal",
  props: ['value'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function closeModal() {
      emit('update:modelValue', false); 
    }
    return { closeModal };
  }
};
</script>


<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline">🌟 Coming Soon: Daily Challenges! 🌟</v-card-title>
      <v-card-text>
        <strong>Excitement Alert!</strong> A thrilling new game mode is on the horizon! Prepare to put your geography knowledge to the ultimate test with <em>Daily Challenges</em> — a feature where every day is a new adventure!
        <br><br>
        Zoom into a world of fun and sharpen your map skills by pinpointing the mystery country of the day. Hurry though, the clock is ticking! Quick wits and rapid responses will be your allies as you strive for glory.
        <br><br>
        <span role="img" aria-label="medal">🏅</span> Chase daily high scores, collect exclusive badges, and make your mark on the global leaderboard. It's not just about being smart, it's about being quick! Stay tuned, explorers!
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="success" text @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

