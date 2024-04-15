<template>
  <header class="top-header">
    <div class="logo-container">
      <img src="@/assets/images/logo/mapple_logo.png" alt="Mapple Logo" class="logo"/>
    </div>
    <nav class="navigation">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/daily" class="nav-link">Daily</router-link>
      <div class="nav-link" @click="openAuthModal">Register/Login</div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TopHeader',
  methods : {
    openAuthModal() {
      console.log('log/reg modal clicked')
      this.$emit('auth-modal-open');
    }
  }
}
</script>

<style scoped>
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0px; 
  background-color: #34568B;
  color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}

.logo-container {
  flex: 0 0 auto;
}

.logo {
  height: auto;
  width: auto;
  max-height: 60px; 
}

.navigation {
  display: flex;
  gap: 1rem; 
}

.nav-link {
  text-decoration: none;
  color: #FFF;
  padding: 10px 15px; 
  border-radius: 5px; 
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  background-color: #D9EAD3;
  color: #34568B; 
  text-decoration: none;
}
</style>
