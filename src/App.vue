<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <div class="logo-section">
            <img src="/images/logo.jpg" alt="Beaver Tree" class="logo" />
            <div class="business-info">
              <h1>Beaver Tree</h1>
              <p>Professional Tree Services</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="desktop-nav">
            <RouterLink to="/" class="nav-link" exact-active-class="router-link-active"
              >Home</RouterLink
            >
            <RouterLink to="/about" class="nav-link">About</RouterLink>
            <RouterLink to="/services" class="nav-link">Services</RouterLink>
            <RouterLink to="/gallery" class="nav-link">Gallery</RouterLink>
            <RouterLink to="/quote" class="nav-link">Get Quote</RouterLink>
            <RouterLink to="/booking" class="nav-link">Booking</RouterLink>
            <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
            <RouterLink to="/faq" class="nav-link">FAQ</RouterLink>
          </nav>

          <!-- Mobile Menu Button -->
          <button
            class="mobile-menu-btn"
            @click="toggleMobileMenu"
            :class="{ active: mobileMenuOpen }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="mobile-nav" :class="{ active: mobileMenuOpen }">
          <RouterLink
            to="/"
            class="mobile-nav-link"
            @click="closeMobileMenu"
            exact-active-class="router-link-active"
            >Home</RouterLink
          >
          <RouterLink to="/about" class="mobile-nav-link" @click="closeMobileMenu"
            >About</RouterLink
          >
          <RouterLink to="/services" class="mobile-nav-link" @click="closeMobileMenu"
            >Services</RouterLink
          >
          <RouterLink to="/gallery" class="mobile-nav-link" @click="closeMobileMenu"
            >Gallery</RouterLink
          >
          <RouterLink to="/quote" class="mobile-nav-link" @click="closeMobileMenu"
            >Get Quote</RouterLink
          >
          <RouterLink to="/booking" class="mobile-nav-link" @click="closeMobileMenu"
            >Booking</RouterLink
          >
          <RouterLink to="/contact" class="mobile-nav-link" @click="closeMobileMenu"
            >Contact</RouterLink
          >
          <RouterLink to="/faq" class="mobile-nav-link" @click="closeMobileMenu">FAQ</RouterLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        </template>
      </Suspense>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Beaver Tree</h3>
            <p>Professional tree services in Toronto and surrounding areas.</p>
            <div class="contact-info">
              <p><strong>Phone:</strong> (416) 555-0123</p>
              <p><strong>Email:</strong> info@beavertree.ca</p>
            </div>
          </div>

          <div class="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Tree Removal</li>
              <li>Tree Trimming</li>
              <li>Emergency Services</li>
              <li>Tree Health Assessment</li>
              <li>Stump Grinding</li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Service Areas</h4>
            <ul>
              <li>Toronto</li>
              <li>Mississauga</li>
              <li>Brampton</li>
              <li>Markham</li>
              <li>Vaughan</li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Emergency Service</h4>
            <div class="emergency-contact">
              <p class="emergency-phone">(416) 555-0123</p>
              <p>Available 24/7</p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2024 Beaver Tree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* CSS Variables */
:root {
  --primary-green: #2d5016;
  --secondary-green: #4a7c3a;
  --light-green: #7ba05b;
  --accent-orange: #d2691e;
  --cream: #f5f5dc;
  --light-cream: #faf8f3;
  --dark-brown: #3d2914;
  --text-dark: #333;
  --text-light: #666;
  --border-light: #e0e0e0;
  --white: #ffffff;
}

/* Reset */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
  background-color: var(--white);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Header */
.header {
  background-color: var(--primary-green);
  color: var(--white);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  gap: 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.logo {
  height: 60px;
  width: auto;
  border-radius: 8px;
}

.business-info h1 {
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
  color: var(--white);
}

.business-info p {
  font-size: 0.9rem;
  color: var(--cream);
  opacity: 0.9;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: var(--secondary-green);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: var(--accent-orange);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  justify-content: center;
  gap: 4px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background-color: var(--white);
  transition: 0.3s;
  transform-origin: center;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  flex-direction: column;
  background-color: var(--secondary-green);
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.mobile-nav.active {
  display: flex;
}

.mobile-nav-link {
  color: var(--white);
  text-decoration: none;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background-color: var(--primary-green);
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

/* Main Content */
.main {
  flex: 1;
}

/* Loading States */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--primary-green);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--light-cream);
  border-top: 4px solid var(--primary-green);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Footer */
.footer {
  background-color: var(--dark-brown);
  color: var(--white);
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: var(--accent-orange);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.footer-section h4 {
  color: var(--light-green);
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  padding: 0.3rem 0;
  color: var(--cream);
}

.contact-info {
  margin-top: 1rem;
}

.contact-info p {
  margin-bottom: 0.5rem;
  color: var(--cream);
}

.emergency-contact {
  background-color: var(--accent-orange);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.emergency-phone {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--white);
  margin-bottom: 0.3rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--cream);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-content {
    gap: 1.5rem;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .header-content {
    min-height: 70px;
    gap: 1rem;
  }

  .logo-section {
    gap: 0.8rem;
  }

  .logo {
    height: 50px;
  }

  .business-info h1 {
    font-size: 1.2rem;
  }

  .business-info p {
    font-size: 0.8rem;
  }

  .container {
    padding: 0 15px;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .footer-section h3 {
    font-size: 1.2rem;
  }

  .footer-section h4 {
    font-size: 1.1rem;
  }

  .emergency-contact {
    padding: 0.8rem;
  }

  .emergency-phone {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .header-content {
    gap: 0.8rem;
    min-height: 65px;
  }

  .logo {
    height: 45px;
  }

  .business-info h1 {
    font-size: 1.1rem;
  }

  .business-info p {
    font-size: 0.75rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .container {
    padding: 0 10px;
  }

  .footer {
    padding: 2rem 0 1rem;
  }

  .footer-section {
    text-align: center;
  }

  .footer-section h3 {
    font-size: 1.1rem;
  }

  .footer-section h4 {
    font-size: 1rem;
  }

  .emergency-contact {
    padding: 0.7rem;
  }

  .emergency-phone {
    font-size: 1rem;
  }

  .footer-bottom {
    font-size: 0.9rem;
    padding-top: 1.5rem;
  }
}
</style>
