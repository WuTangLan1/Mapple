<!-- src\components\homedir\additional\privacyModal.vue -->

<script>
export default {
  name: 'PrivacyModal',
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
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. It is Mapple's policy to respect your privacy regarding any information we may collect from you across our website, <strong>Mapple</strong>, and other sites we own and operate.</p>
      <h2>1. Information We Collect</h2>
      <p>We collect information directly from you when you register, interact with our game, and input data into our system. This may include personal details such as your name and email address.</p>
      <h2>2. Use of Information</h2>
      <p>The information we collect is used for enhancing the game experience, providing support, and improving our services. We do not share personal information publicly or with third-parties, except when required to by law.</p>
      <h2>3. Data Security</h2>
      <p>We take the security of your personal information seriously and take all reasonable precautions to protect it.</p>
      <h2>4. Your Rights</h2>
      <p>You have the right to request copies of your personal information, request corrections, or request that we erase your personal information.</p>
      <h2>5. Amendments</h2>
      <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this website.</p>
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
  max-width: 80%;
  text-align: left; 
  position: relative;
  transition: all 0.3s ease;
  margin-bottom: 20%;
  animation: dropAnimation 1.5s ease-in-out forwards;
  cursor: default;
  overflow-y: auto; 
  max-height: 80%; 
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
