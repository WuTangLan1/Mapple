<!-- src\components\homedir\additional\tosModal.vue -->
<script>
export default {
  name: 'ToSModal',
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
      <v-card-title class="text-h5">Terms of Service</v-card-title>
      <v-card-text>
        <p>By accessing and using Mapple, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this service, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        <div>
          <h2>1. License to Use</h2>
          <p>We grant you a non-exclusive, non-transferable, revocable license to access and use our website strictly in accordance with our legal terms.</p>
        </div>
        <div>
          <h2>2. User Responsibilities</h2>
          <p>Users are responsible for maintaining the confidentiality of their account and password and for restricting access to their computer, and agree to accept responsibility for all activities that occur under their account or password.</p>
        </div>
        <div>
          <h2>3. Disclaimers</h2>
          <p>The information on this website is provided "as is". We disclaim all warranties, expressed or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.</p>
        </div>
        <div>
          <h2>4. Modifications to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


