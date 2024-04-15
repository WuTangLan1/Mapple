<!-- This is the code for src\components\auth\regSide.vue -->

<template>
    <form @submit.prevent="register" class="registration-form">
      <h2>Registration</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="form.username" required>
      </div>
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" v-model="form.fullName" required>
      </div>
      <div class="form-group">
        <label for="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" v-model="form.dateOfBirth" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" required>
      </div>
      <button type="submit" class="submit-button">Register</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/useAuthStore';
  
  export default {
    name: 'RegSide',
    setup() {
      const form = ref({
        username: '',
        fullName: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: ''
      });
  
      const authStore = useAuthStore();
  
      const register = async () => {
        if (form.value.password !== form.value.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
  
        try {
          await authStore.registerUser({
            username: form.value.username,
            fullName: form.value.fullName,
            dateOfBirth: form.value.dateOfBirth,
            password: form.value.password
          });
          // Handle successful registration, like redirecting the user or clearing the form
        } catch (error) {
         console.log(error)
        }
      };
  
      return {
        form,
        register
      };
    }
  };
  </script>
  
  
  <style scoped>
  .registration-form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .submit-button {
    padding: 10px 15px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #4cae4c;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  