<script setup>
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Professional Tree Services in Toronto</h1>
            <p class="hero-subtitle">
              Expert tree removal, trimming, and maintenance services. Licensed, insured, and
              committed to your safety.
            </p>
            <div class="hero-buttons">
              <button class="btn-primary" @click="scrollToQuote">Get Instant Quote</button>
              <RouterLink to="/contact" class="btn-secondary">Contact Us</RouterLink>
            </div>
          </div>
          <div class="hero-image">
            <img
              src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Professional tree service"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="services-overview">
      <div class="container">
        <h2>Our Services</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🌳</div>
            <h3>Tree Removal</h3>
            <p>
              Safe and efficient removal of unwanted or dangerous trees using professional
              equipment.
            </p>
            <RouterLink to="/services" class="learn-more">Learn More</RouterLink>
          </div>
          <div class="service-card">
            <div class="service-icon">✂️</div>
            <h3>Tree Trimming</h3>
            <p>
              Expert pruning and trimming to maintain tree health and improve your property's
              appearance.
            </p>
            <RouterLink to="/services" class="learn-more">Learn More</RouterLink>
          </div>
          <div class="service-card">
            <div class="service-icon">🚨</div>
            <h3>Emergency Services</h3>
            <p>24/7 emergency tree services for storm damage and hazardous situations.</p>
            <RouterLink to="/contact" class="learn-more">Call Now</RouterLink>
          </div>
          <div class="service-card">
            <div class="service-icon">🔍</div>
            <h3>Tree Assessment</h3>
            <p>Professional evaluation of tree health and safety recommendations.</p>
            <RouterLink to="/services" class="learn-more">Learn More</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Quote Calculator -->
    <section class="quick-quote" id="quote-section">
      <div class="container">
        <h2>Get an Instant Quote</h2>
        <p>Get a ballpark estimate for your tree service needs</p>

        <div class="quote-calculator">
          <div class="calculator-form">
            <div class="form-group">
              <label for="serviceType">Service Type</label>
              <select v-model="quoteForm.serviceType" id="serviceType">
                <option value="">Select a service</option>
                <option value="removal">Tree Removal</option>
                <option value="trimming">Tree Trimming</option>
                <option value="emergency">Emergency Service</option>
                <option value="assessment">Tree Assessment</option>
              </select>
            </div>

            <div class="form-group">
              <label for="treeHeight">Estimated Tree Height</label>
              <select v-model="quoteForm.treeHeight" id="treeHeight">
                <option value="">Select height range</option>
                <option value="small">Under 25 feet</option>
                <option value="medium">25-50 feet</option>
                <option value="large">50-75 feet</option>
                <option value="extra-large">Over 75 feet</option>
              </select>
            </div>

            <div class="form-group">
              <label for="accessibility">Property Accessibility</label>
              <select v-model="quoteForm.accessibility" id="accessibility">
                <option value="">Select accessibility</option>
                <option value="easy">Easy access</option>
                <option value="moderate">Moderate access</option>
                <option value="difficult">Difficult access</option>
              </select>
            </div>

            <div class="form-group">
              <label for="urgency">Timeline</label>
              <select v-model="quoteForm.urgency" id="urgency">
                <option value="">Select timeline</option>
                <option value="flexible">Flexible (2-4 weeks)</option>
                <option value="soon">Within 2 weeks</option>
                <option value="urgent">ASAP/Emergency</option>
              </select>
            </div>

            <button class="btn-calculate" @click="calculateQuote">Calculate Estimate</button>
          </div>

          <div class="quote-result" v-if="estimatedPrice">
            <h3>Estimated Price Range</h3>
            <div class="price-display">
              <span class="price">${{ estimatedPrice.min }} - ${{ estimatedPrice.max }}</span>
            </div>
            <p class="price-note">
              *This is a rough estimate. Final pricing depends on specific conditions and on-site
              assessment.
            </p>
            <div class="next-steps">
              <RouterLink to="/booking" class="btn-primary">Schedule Assessment</RouterLink>
              <RouterLink to="/contact" class="btn-secondary">Contact for Details</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-us">
      <div class="container">
        <h2>Why Choose Beaver Tree?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🛡️</div>
            <h3>Fully Licensed & Insured</h3>
            <p>Complete coverage for your peace of mind</p>
          </div>
          <div class="feature">
            <div class="feature-icon">⭐</div>
            <h3>15+ Years Experience</h3>
            <p>Proven track record of quality service</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔧</div>
            <h3>Professional Equipment</h3>
            <p>Latest tools and safety equipment</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💰</div>
            <h3>Competitive Pricing</h3>
            <p>Fair, transparent pricing with no hidden fees</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📞</div>
            <h3>24/7 Emergency Service</h3>
            <p>Available when you need us most</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🌱</div>
            <h3>Eco-Friendly Practices</h3>
            <p>Sustainable and environmentally conscious</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Contact us today for a free consultation and detailed quote</p>
          <div class="cta-buttons">
            <RouterLink to="/contact" class="btn-primary">Get Free Quote</RouterLink>
            <a href="tel:4165550123" class="btn-secondary">Call (416) 555-0123</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const quoteForm = reactive({
      serviceType: '',
      treeHeight: '',
      accessibility: '',
      urgency: '',
    })

    const estimatedPrice = ref(null)

    const scrollToQuote = () => {
      document.getElementById('quote-section').scrollIntoView({
        behavior: 'smooth',
      })
    }

    const calculateQuote = () => {
      if (!quoteForm.serviceType || !quoteForm.treeHeight || !quoteForm.accessibility) {
        alert('Please fill in all required fields')
        return
      }

      // Simple pricing logic based on form inputs
      let basePrice = 0
      let multiplier = 1

      // Base price by service type
      switch (quoteForm.serviceType) {
        case 'removal':
          basePrice = 800
          break
        case 'trimming':
          basePrice = 400
          break
        case 'emergency':
          basePrice = 1200
          break
        case 'assessment':
          basePrice = 200
          break
      }

      // Height multiplier
      switch (quoteForm.treeHeight) {
        case 'small':
          multiplier *= 0.7
          break
        case 'medium':
          multiplier *= 1.0
          break
        case 'large':
          multiplier *= 1.5
          break
        case 'extra-large':
          multiplier *= 2.2
          break
      }

      // Accessibility multiplier
      switch (quoteForm.accessibility) {
        case 'easy':
          multiplier *= 1.0
          break
        case 'moderate':
          multiplier *= 1.3
          break
        case 'difficult':
          multiplier *= 1.8
          break
      }

      // Urgency multiplier
      if (quoteForm.urgency === 'urgent') {
        multiplier *= 1.5
      } else if (quoteForm.urgency === 'soon') {
        multiplier *= 1.2
      }

      const finalPrice = Math.round(basePrice * multiplier)
      estimatedPrice.value = {
        min: Math.round(finalPrice * 0.8),
        max: Math.round(finalPrice * 1.3),
      }
    }

    return {
      quoteForm,
      estimatedPrice,
      scrollToQuote,
      calculateQuote,
    }
  },
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 4rem 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-text h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Services Overview */
.services-overview {
  padding: 4rem 0;
  background-color: white;
}

.services-overview h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: var(--primary-green);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: var(--primary-green);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.learn-more {
  color: var(--accent-orange);
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  display: inline-block;
}

.learn-more:hover {
  color: var(--secondary-green);
}

/* Quick Quote Section */
.quick-quote {
  padding: 4rem 0;
  background-color: var(--light-cream);
}

.quick-quote h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-green);
}

.quick-quote > p {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  color: var(--text-light);
}

.quote-calculator {
  width: 100%;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.calculator-form {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--primary-green);
}

.form-group select {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
}

.form-group select:focus {
  outline: none;
  border-color: var(--secondary-green);
}

.btn-calculate {
  grid-column: 1 / -1;
  background-color: var(--primary-green);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-calculate:hover {
  background-color: var(--secondary-green);
}

.quote-result {
  background-color: var(--primary-green);
  color: white;
  padding: 2rem;
  text-align: center;
}

.quote-result h3 {
  margin-bottom: 1rem;
}

.price-display {
  margin: 1.5rem 0;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--accent-orange);
}

.price-note {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.next-steps {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Page-specific button overrides for light backgrounds */
.hero-section .btn-secondary,
.cta-section .btn-secondary {
  color: white;
  border-color: white;
}

.hero-section .btn-secondary:hover,
.cta-section .btn-secondary:hover {
  background-color: white;
  color: var(--primary-green);
}

/* Why Choose Us */
.why-choose-us {
  padding: 4rem 0;
  background-color: white;
}

.why-choose-us h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: var(--primary-green);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 1.5rem;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature h3 {
  color: var(--primary-green);
  margin-bottom: 0.5rem;
}

/* CTA Section */
.cta-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--secondary-green) 0%, var(--primary-green) 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    gap: 2rem;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .calculator-form {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .price {
    font-size: 2rem;
  }

  .next-steps {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .hero-buttons {
    justify-content: center;
    gap: 0.8rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 0;
    min-height: 60vh;
  }

  .hero-text h1 {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .services-overview,
  .quick-quote,
  .why-choose-us,
  .cta-section {
    padding: 3rem 0;
  }

  .quick-quote h2,
  .services-overview h2,
  .why-choose-us h2,
  .cta-content h2 {
    font-size: 1.8rem;
  }

  .service-card,
  .feature {
    padding: 1.5rem;
  }

  .calculator-form {
    padding: 1rem;
  }

  .quote-result {
    padding: 1.5rem;
  }
}
</style>
