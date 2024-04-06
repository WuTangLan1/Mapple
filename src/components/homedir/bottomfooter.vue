<!-- This is the code for the src\components\homedir\bottomfooter.vue -->

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h3>About Mapple</h3>
        <p>Mapple is a daily geographical challenge that tests your knowledge of the world's countries. Join the adventure and learn with us every day!</p>
      </div>
      <div class="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      </div>
      <div class="footer-section social">
    <h3>Follow Us</h3>
    <div class="social-icons">
      <a href="https://www.instagram.com/discover_mapple" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/images/socials/insta_icon.jpg" alt="Instagram" />
      </a>
      <a href="https://www.twitter.com/discover_mapple" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/images/socials/x_icon.jpg" alt="Twitter" />
      </a>
    </div>
  </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Mapple. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BottomFooter'
}
</script>

<style scoped>
.footer {
  background-color: #c9d2f3;
  color: #333;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width:100%;
}


.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  padding-left:0.5rem;
  padding-right :0.5rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.social-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 1.5rem;
}

.footer-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}
@media (max-width: 1000px) {
  .footer-content,
  .footer-section,
  .footer-bottom {
    text-align: center; 
    align-items: center;
  }

  .footer-section {
    margin-bottom: 1.5rem;
  }

  .footer-section ul {
    justify-content: center; 
  }

  .footer-section {
    justify-content: center; 
  }

  .social-icons {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .footer-section h3,
  .footer-section p,
  .footer-bottom p {
    margin-left: auto;
    margin-right: auto;
  }

  .footer-section.links ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; 
    gap: 0.5rem;
  }

  .footer-section.links li {
    margin: 0.5rem; /* Add margin around each link for better spacing */
  }
}


@media (min-width: 800px) {
  .footer-content {
    flex-direction: row; /* switch to row layout for larger screens */
    justify-content: space-between; /* distribute space between sections */
  }

  .footer-section.links ul {
    flex-direction: row; /* align Quick Links in a row */
    justify-content: flex-start; /* align Quick Links to the start */
    gap: 1rem; /* add a gap between the links */
  }
  
  .footer-section {
    margin-bottom: 0; /* remove the margin-bottom for larger screens if desired */
  }
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
  margin-top: 1.5rem;
  font-size: 0.85rem;
}

</style>


