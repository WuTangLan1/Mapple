<!-- This is the code for src\components\auth\logSide.vue -->
<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'LogSide',
  setup() {
    const loginForm = ref({
      email: '',
      password: ''
    });
    const showPassword = ref(false);
    const touchedFields = ref({});
    const authStore = useAuthStore();

    const isValid = computed(() => {
      return loginForm.value.email && loginForm.value.password && loginForm.value.password.length >= 6;
    });

    function validateField(fieldName) {
      touchedFields.value[fieldName] = true;
    }

    function getError(fieldName) {
      return touchedFields.value[fieldName] ? null : '';
    }

    const login = async () => {
      if (!isValid.value) {
        alert("Please check your inputs.");
        return;
      }
      try {
        await authStore.loginUser({
          username: loginForm.value.email,
          password: loginForm.value.password
        });
      } catch (error) {
        console.error('Login Error:', error);
      }
    };

    return {
      loginForm,
      showPassword,
      login,
      isValid,
      validateField,
      getError
    };
  }
};
</script>

<template>
  <v-form ref="form" @submit.prevent="login" class="login-form" lazy-validation>
    <v-card class="pa-4">
      <v-card-title class="text-h5 mb-4">Login</v-card-title>
      <v-text-field
        v-model="loginForm.email"
        label="Email"
        required
        clearable
        type="email"
        placeholder="Enter your email"
        :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
        @blur="validateField('email')"
        :error-messages="getError('email')"
      ></v-text-field>
      <v-text-field
        v-model="loginForm.password"
        label="Password"
        required
        clearable
        :type="showPassword ? 'text' : 'password'"
        placeholder="Enter your password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :rules="[v => !!v || 'Password is required', v => v.length >= 6 || 'Minimum 6 characters required']"
        @blur="validateField('password')"
        :error-messages="getError('password')"
      ></v-text-field>
      <v-btn
        color="primary"
        block
        large
        :disabled="!isValid"
        type="submit"
      >
        Login
      </v-btn>
    </v-card>
  </v-form>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
}
</style>
