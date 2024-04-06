<!-- This is the code for the src\components\homedir\topheader.vue -->

<template>
  <header class="top-header">
    <div class="logo-container">
      <img src="@/assets/images/logo/mapple_logo.png" alt="Mapple Logo" class="logo"/>
    </div>
    <h1 class="title">MAPPLE</h1>
    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/stay" class="nav-link">Stay of the week</router-link>
      <router-link to="/login" class="nav-link">register/login</router-link>
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
  background-color: #c9d2f3; /* Consistent light blue for both */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0; /* Use rem for padding to ensure responsiveness */
  height: 10vh; /* Adjusted for header */
  width: 100%;
}

.logo-container {
  flex: 1;
}

.logo {
  height: 100%; /* Adjust as necessary */
}

.title {
  flex: 2;
  text-align: center;
  margin: 0;
  font-size: 2em; /* Adjust size as necessary */
}

.navigation {
  flex: 1;
  display: flex;
  justify-content: space-around;
}

.nav-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  padding: 0.5em 1em;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>