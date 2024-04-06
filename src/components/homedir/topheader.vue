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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #c9d2f3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  width: 100%;
}

.logo-container {
  flex: 0 0 auto; 
}

.logo {
  max-height: 100px; 
  max-width: 100%; 
}

.title {
  flex: 1 0 auto; 
  text-align: left; 
  margin-left: 20px;
  font-size: 1.5em; 
}

.navigation {
  /* This allows the navigation to take up the space it needs based on content */
  flex: 0 0 auto; /* Do not grow or shrink, base width on content */
  display: flex;
  justify-content: flex-end;
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
