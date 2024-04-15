<!-- This is the code for the src\components\homedir\bottomfooter.vue -->

<script>
export default {
  name: 'BottomFooter',
  data() {
    return {
      footerExpanded: false,
      footerMaxHeight: '100px',
      toggleIconUrl: require('@/assets/images/socials/toggle_arrow.png'),
    };
  },
  mounted() {
    this.updateFooterHeight();
  },
  methods: {
      toggleFooter() {
        this.footerExpanded = !this.footerExpanded;
        this.$nextTick(() => {
          this.updateFooterHeight();
        });
      },
      updateFooterHeight() {
        const newHeight = this.footerExpanded ? '400px' : '100px'; 
        this.footerMaxHeight = newHeight;
        document.documentElement.style.setProperty('--footer-height', newHeight);
      }
    },
  watch: {
    footerExpanded(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updateFooterHeight();
      }
    },
  },
}
</script>


<template>
    <footer :class="{ 'footer-expanded': footerExpanded }" class="footer" :style="{ 'max-height': footerMaxHeight }">
    <div class="footer-content" ref="footerContent">
      <div class="footer-toggle" @click="toggleFooter">
        <img :src="toggleIconUrl" class="toggle-icon" alt="Toggle arrow" />
      </div>
      <div class="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      <div class="footer-section about" v-show="footerExpanded">
        <h3>About Mapple</h3>
        <p>Mapple is a daily geographical challenge that tests your knowledge of the world's countries. Join the adventure and learn with us every day!</p>
      </div>
      <div class="footer-section social" v-show="footerExpanded">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="https://www.instagram.com/discover_mapple" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/socials/insta_icon.png" alt="Instagram" />
          </a>
          <a href="https://www.twitter.com/epic_maps" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/socials/x_icon.png" alt="Twitter" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Mapple. All rights reserved.</p>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  position: fixed; /* or 'absolute' if you want it to scroll away */
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #c9d2f3;
  color: #333;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  transition: max-height 0.5s ease;
}

.footer-content {
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0.5rem;
  transition: max-height 0.3s ease;
  position: relative;
}


.footer:not(.footer-expanded) .footer-content {
  max-height: 100px; 
}

.footer-toggle {
  position: absolute; 
  top: 0; 
  right: 0; 
  cursor: pointer;
}

.toggle-icon {
  position: absolute; 
  top: 10px; 
  right: 20px;
  width: 20px;
  height: 20px; 
  transition: transform 0.3s ease;
}

  .footer-expanded .toggle-icon {
    transform: rotate(180deg); 
  }


.social-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.social-icons {
  justify-content: center;
  gap: 2rem;
}

.social-icon a {
  text-decoration: none;
}

img {
  height: 2.5rem;
  width: auto;
  display: block; 
}

.social-icon span {
  font-size: 0.75rem;
  color: #333;
  margin-top: 0.5rem;
}


.footer-section {
  width: 100%; /* Set width to 100% for proper centering */
  display: flex; /* Use flexbox for centering content */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  text-align: center; /* Center text */
  margin-bottom: 1.5rem;
}


.footer-section h3 {
  color: #333;
  margin-bottom: 0.2rem;
}

.footer-section.links ul {
  display: flex;
  justify-content: center;
  padding: 0;
}


.footer-section.links li {
  padding: 0 1rem; /* Add some spacing between the links */
}

.footer-section ul {
  list-style: none;
}

.footer-section li a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section li a:hover {
  color: #000;
}

.footer-bottom {
  text-align: center;
  margin-top:0.5rem;
  font-size: 0.85rem;
}

</style>


