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
  padding: clamp(10px, 2vw, 20px);
  width: 100%;
  max-height: 100px; /* Set a fixed maximum height */
  overflow: hidden; /* Ensure content does not overflow */
}


.logo-container {
  flex: 0 0 auto;
}

.logo {
  max-height: clamp(50px, 8vw, 120px); /* Responsive logo size */
  max-width: 100%; /* Ensure logo does not exceed its container width */
}

.title {
  flex: 0 1 auto;
  text-align: left;
  margin-left: 20px;
  font-size: clamp(1.2em, 2.5vw, 2.5em); /* Responsive font size for title */
  padding-right: 1rem;
}

.navigation {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  padding: 0.5em;
  margin: 0 0.5rem;
  font-size: clamp(0.9em, 1vw, 1.2em); /* Responsive font size for navigation links */
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
    padding: 10px clamp(2vw, 5vw, 20px);
  }

  .logo-container {
    margin-right: auto; 
  }

  .logo {
    /* Adjust the logo size for smaller screens */
    max-height: clamp(40px, 8vw, 60px); /* Smaller min and max sizes for narrow viewports */
  }

  .navigation {
    padding-right: 0;
    justify-content: space-around;  
  }
  
  .logo-container {
    flex: 0 0 auto; 
    margin-right: auto; /* This will push everything else to the right */
  }
  
  .logo {
    max-height: 6rem; 
  }
  
  .nav-link {
    padding: 0.5em clamp(2vw, 5vw, 20px); /* Responsive horizontal padding for nav links */
    margin: 0; /* No margins necessary if padding is handling spacing */
    font-size: clamp(0.8em, 2.5vw, 1em);
  }
}

</style>
