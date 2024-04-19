<!-- src\components\homedir\additional\tosModal.vue -->
<script>
export default {
  name: 'ToSModal',
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>Terms of Service</h1>
      <p>By accessing and using Mapple, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this particular service, you shall be subject to any posted guidelines or rules applicable to such services.</p>
      <h2>1. License to Use</h2>
      <p>We grant you a non-exclusive, non-transferable, revocable license to access and use our website strictly in accordance with our legal terms.</p>
      <h2>2. User Responsibilities</h2>
      <p>Users are responsible for maintaining the confidentiality of their account and password and for restricting access to their computer, and agree to accept responsibility for all activities that occur under their account or password.</p>
      <h2>3. Disclaimers</h2>
      <p>The information on this website is provided "as is". We disclaim all warranties, expressed or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.</p>
      <h2>4. Modifications to Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  max-width: 80%; /* Adjusted for better readability */
  text-align: left; /* Align text to the left for readability */
  position: relative;
  transition: all 0.3s ease;
  margin-bottom: 20%;
  animation: dropAnimation 1.5s ease-in-out forwards;
  cursor: default; /* To prevent text selection cursor */
  overflow-y: auto; /* Allows scrolling */
  max-height: 80%; /* Limits height and enables scrolling */
}

button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

h1, h2 {
  color: #333;
}

p {
  margin: 10px 0;
}
</style>
