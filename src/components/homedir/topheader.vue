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
  flex: 0 1 auto; 
  text-align: left;
  margin-left: 20px;
  font-size: 1.5em;
  padding-right: 1rem;
}

.navigation {
  flex: 1;
  display: flex;
  justify-content: space-between; /* This will space out the nav links */
  padding-right: 1rem; /* Ensure there's a gap on the right */
}

.nav-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  padding: 0.5em;
  margin: 0 0.5rem; /* This gives space between each nav link */
}


.nav-link:hover {
  text-decoration: underline;
}

@media (max-width: 750px) {
  .title {
    display: none;
  }

  .top-header {
    justify-content: space-between; 
  }

  .navigation {
    justify-content: space-around;
    padding-right: 0; 
  }
  
  .logo-container {
    flex: 0 0 auto; 
    margin-right: auto; /* This will push everything else to the right */
  }
  
  .logo {
    max-height: 80px; 
  }
  
  .nav-link {
    margin: 0; 
    padding: 0.5em; 
  }
}

</style>
