<!-- This is the code for src\components\auth\regSide.vue -->

<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  name: 'RegSide',
  setup() {
    const form = ref({
      username: '',
      fullName: '',
      password: '',
      confirmPassword: ''
    });
    const touchedFields = ref({});
    const showPassword = ref(false);
    const authStore = useAuthStore();

    const passwordRules = computed(() => [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be at least 6 characters',
    ]);

    const isValid = computed(() => {
      return (
        form.value.username &&
        form.value.fullName &&
        form.value.password &&
        form.value.password === form.value.confirmPassword
      );
    });

    function validateField(fieldName) {
      touchedFields.value[fieldName] = true;
    }

    function getError(fieldName) {
      return touchedFields.value[fieldName] ? null : '';
    }

    const register = async () => {
      if (form.value.password !== form.value.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        await authStore.registerUser({
          username: form.value.username,
          fullName: form.value.fullName,
          password: form.value.password
        });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      form,
      showPassword,
      register,
      isValid,
      passwordRules,
      validateField,
      getError
    };
  }
};
</script>

<template>
  <v-form 
    ref="form" 
    @submit.prevent="register" 
    class="registration-form" 
    lazy-validation
  >
    <v-card class="pa-4">
      <v-card-title class="text-h5 mb-4">Registration</v-card-title>
      <v-text-field
        v-model="form.username"
        :rules="[v => !!v || 'Email is required']"
        label="Email"
        required
        clearable
        type="email"
        placeholder="Enter your email"
        @blur="validateField('username')"
        :error-messages="getError('username')"
      ></v-text-field>
      <v-text-field
        v-model="form.fullName"
        :rules="[v => !!v || 'Full Name is required']"
        label="Full Name"
        required
        clearable
        placeholder="Enter your full name"
        @blur="validateField('fullName')"
        :error-messages="getError('fullName')"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="passwordRules"
        label="Password"
        required
        clearable
        :type="showPassword ? 'text' : 'password'"
        placeholder="Enter a password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        @blur="validateField('password')"
        :error-messages="getError('password')"
      ></v-text-field>
      <v-text-field
        v-model="form.confirmPassword"
        :rules="[v => v === form.password || 'Passwords must match']"
        label="Confirm Password"
        required
        clearable
        :type="showPassword ? 'text' : 'password'"
        placeholder="Confirm your password"
        @blur="validateField('confirmPassword')"
        :error-messages="getError('confirmPassword')"
      ></v-text-field>
      <v-btn
        color="primary"
        block
        large
        :disabled="!isValid"
        @click="register"
      >
        Register
      </v-btn>
    </v-card>
  </v-form>
</template>

<style scoped>
.registration-form {
  max-width: 400px;
  margin: auto;
}
</style>
