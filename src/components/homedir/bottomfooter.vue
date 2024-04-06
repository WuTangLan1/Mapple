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
          <!-- Icons or links to social media -->
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
  padding: 2rem 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
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


@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    margin-bottom: 1rem;
  }

  .footer-bottom {
    font-size: 0.75rem;
  }
}
</style>


