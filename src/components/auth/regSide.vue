<!-- This is the code for src\components\auth\regSide.vue -->

<template>
  <div class="registration-container">
    <form @submit.prevent="register" class="registration-form">
      <h2>Registration</h2>
      <div class="form-group">
        <label for="username">Email</label>
        <input type="email" id="username" v-model.trim="form.username" required placeholder="Enter your email">
      </div>
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" v-model.trim="form.fullName" required placeholder="Enter your full name">
      </div>
      <div class="form-group">
        <label for="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" v-model="form.dateOfBirth" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required minlength="6" placeholder="Enter a password">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" required minlength="6" placeholder="Confirm your password">
      </div>
      <button type="submit" class="submit-button">Register</button>
    </form>
  </div>
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
        // Handle registration errors, such as displaying an error message
        console.error(error);
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
.registration-container {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-width: 95%;
  max-height: 70vh;
  margin: 40px auto;
}

.registration-form h2 {
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
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #5cb85c;
  color: white;
  border: none;
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

/* Add additional media queries and styling as necessary */
</style>

  