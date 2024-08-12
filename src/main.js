// src\main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/useAuthStore';
import { createPinia } from 'pinia'; 
import vuetify from './plugins/vuetify';


const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};


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
app.use(vuetify);

app.mount('#app');
