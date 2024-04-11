// src\stores\useGameStore.js

import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    difficulty: 'easy', // default difficulty
  }),
  actions: {
    setDifficulty(level) {
      this.difficulty = level;
    }
  }
});
