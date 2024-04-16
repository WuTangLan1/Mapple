<!-- This is the code for src\components\auth\logSide.vue -->

<!-- src/components/auth/logSide.vue -->
<template>
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <h2>Login</h2>
        <div class="form-group">
          <label for="loginEmail">Email</label>
          <input type="email" id="loginEmail" v-model.trim="loginForm.email" required placeholder="Enter your email">
        </div>
        <div class="form-group">
          <label for="loginPassword">Password</label>
          <input type="password" id="loginPassword" v-model="loginForm.password" required minlength="6" placeholder="Enter your password">
        </div>
        <div class="btn-grp">
          <button type="submit" class="submit-button">Login</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/useAuthStore';
  
  export default {
    name: 'LogSide',
    setup(_, {emit}) {
      const loginForm = ref({
        email: '',
        password: ''
      });
  
      const authStore = useAuthStore();
  
      const login = async () => {
        try {
          await authStore.loginUser({
            username: loginForm.value.email,
            password: loginForm.value.password
          });
          loginForm.value = { email: '', password: '' }; 
          emit('closeModal'); 
        } catch (error) {
          console.error(error);
        }
      };
  
      return {
        loginForm,
        login
      };
    }
  };
  </script>

<style scoped>
.login-container {
  background: #e1e8eb;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-height: 70vh;
  margin-top: 0.5rem;
}

.login-form h2 {
    font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #666;
}

.form-group input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.btn-grp {
  display: flex;
  justify-content: flex-end; /* Aligns the button to the right */
  margin-top: 10px; /* Space above the button */
}

.submit-button {
  padding: 15px;
  background-color: #5cb85c;
  color: white;
  border: none;
  width:50%;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.submit-button:hover, .submit-button:focus {
  background-color: #4cae4c;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
  }

</style>