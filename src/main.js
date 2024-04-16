import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/useAuthStore';
import { createPinia } from 'pinia'; // Import createPinia

// Debounce function
const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

// Extending ResizeObserver with a debounced callback
const OriginalResizeObserver = window.ResizeObserver;
window.ResizeObserver = class extends OriginalResizeObserver {
  constructor(callback) {
    super(debounce(callback, 20));
  }
};

const app = createApp(App);
app.use(createPinia());

const authStore = useAuthStore();
authStore.initializeAuthListener();

app.use(router);

app.mount('#app');
