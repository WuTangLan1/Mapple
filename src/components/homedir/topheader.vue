<!-- This is the code for the src\components\homedir\topheader.vue -->

<template>
  <header class="top-header">
    <div class="logo-container">
      <img src="@/assets/images/logo/mapple_logo.png" alt="Mapple Logo" class="logo"/>
    </div>
    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/stay" class="nav-link">Stay of the week</router-link>
      <router-link to="/login" class="nav-link">Register/Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TopHeader'
}
</script>

<style scoped>
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Use space-between to place logo and nav-links on opposite ends */
  background-color: #c9d2f3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 100px;
  overflow: hidden;
}

.logo-container {
  flex: 0 0 auto;
}

.logo {
  max-height: clamp(50px, 8vw, 120px); /* Responsive logo size */
  max-width: 100%; /* Ensure logo does not exceed its container width */
}

.navigation {
  display: flex;
  justify-content: flex-end; 
  gap: 2rem; 
}

.nav-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  padding: 0.5em;
  font-size: clamp(0.8em, 2.5vw, 1em); /* Adjust font size for responsive design */
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
