<!-- src\components\homedir\additional\privacyModal.vue -->
 
<script>
export default {
  name: 'PrivacyModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('input', false);
    }
  }
}
</script>

<template>
  <v-dialog v-model="visible" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Privacy Policy</v-card-title>
      <v-card-text class="text-subtitle-1">
        <p>Your privacy is important to us. It is Mapple's policy to respect your privacy regarding any information we may collect from you across our website, <strong>Mapple</strong>, and other sites we own and operate.</p>
        <div>
          <h2>1. Information We Collect</h2>
          <p>We collect information directly from you when you register, interact with our game, and input data into our system. This may include personal details such as your name and email address.</p>
        </div>
        <div>
          <h2>2. Use of Information</h2>
          <p>The information we collect is used for enhancing the game experience, providing support, and improving our services. We do not share personal information publicly or with third-parties, except when required to by law.</p>
        </div>
        <div>
          <h2>3. Data Security</h2>
          <p>We take the security of your personal information seriously and take all reasonable precautions to protect it.</p>
        </div>
        <div>
          <h2>4. Your Rights</h2>
          <p>You have the right to request copies of your personal information, request corrections, or request that we erase your personal information.</p>
        </div>
        <div>
          <h2>5. Amendments</h2>
          <p>We may update our privacy policy from time to time...</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

