// src\stores\useGameStore.js

import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    difficulty: null, 
  }),
  actions: {
    setDifficulty(level) {
      this.difficulty = level;
    }
  }
});