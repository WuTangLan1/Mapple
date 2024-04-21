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
      <!-- Typography consistency with margins for spacing -->
      <h1 class="modal-title">Privacy Policy</h1>
      <div class="modal-body">
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
        <p>We may update our privacy policy from time to time...</p>
      </div>
      <div class="modal-footer">
        <button class="modal-button" @click="closeModal">Close</button>
      </div>
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
  align-items: center; /* Align items to center vertically */
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: #fafafa;
  padding: 0.8rem;
  padding-bottom: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  max-width: 80%; 
  text-align: left; 
  position: relative;
  transition: all 0.3s ease;
  animation: dropAnimation 1s ease-in-out forwards;
  cursor: default;
  overflow-y: auto;
  max-height: 80%; 
  position:relative;
}


@keyframes dropAnimation {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

.modal-title, .modal-body h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 20px;
}

.modal-body {
  color: #555;
  line-height: 1.6;
}

.modal-footer {
  position: absolute;
  right: 1.5rem; /* Adjust this value as needed */
  bottom: 1.5rem; /* Adjust this value as needed, should be equal to modal-content padding */
  text-align: right;
}

button {
  padding: 10px 20px;
  display: inline-block; 
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
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
