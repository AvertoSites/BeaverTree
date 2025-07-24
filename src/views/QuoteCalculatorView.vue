<template>
  <div class="quote-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Get Your Free Tree Service Quote</h1>
        <p>Professional estimates in minutes. No hidden fees, no surprises.</p>
      </div>
    </section>

    <!-- Main Calculator -->
    <section class="calculator-section">
      <div class="calculator-container">
        <!-- Form Side -->
        <div class="form-side">
          <div class="form-card">
            <div class="form-header">
              <h2>Project Details</h2>
              <p>Tell us about your tree service needs</p>
            </div>

            <form @submit.prevent="calculateQuote" class="quote-form">
              <!-- Service Type -->
              <div class="form-row">
                <div class="form-group">
                  <label for="service">Service Type *</label>
                  <select v-model="form.service" id="service" required>
                    <option value="">Choose service</option>
                    <option value="removal">Tree Removal</option>
                    <option value="trimming">Tree Trimming</option>
                    <option value="pruning">Tree Pruning</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="stump">Stump Grinding</option>
                    <option value="assessment">Tree Assessment</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="trees">Number of Trees *</label>
                  <select v-model="form.trees" id="trees" required>
                    <option value="">Select count</option>
                    <option value="1">1 Tree</option>
                    <option value="2-3">2-3 Trees</option>
                    <option value="4-6">4-6 Trees</option>
                    <option value="7-10">7-10 Trees</option>
                    <option value="10+">10+ Trees</option>
                  </select>
                </div>
              </div>

              <!-- Tree Details -->
              <div class="form-row">
                <div class="form-group">
                  <label for="height">Tree Height *</label>
                  <select v-model="form.height" id="height" required>
                    <option value="">Select height</option>
                    <option value="small">Under 25ft (Small)</option>
                    <option value="medium">25-50ft (Medium)</option>
                    <option value="large">50-75ft (Large)</option>
                    <option value="xlarge">Over 75ft (Extra Large)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="condition">Tree Condition</label>
                  <select v-model="form.condition" id="condition">
                    <option value="">Select condition</option>
                    <option value="healthy">Healthy</option>
                    <option value="diseased">Diseased</option>
                    <option value="dead">Dead</option>
                    <option value="damaged">Storm Damaged</option>
                    <option value="leaning">Leaning/Unstable</option>
                  </select>
                </div>
              </div>

              <!-- Property Details -->
              <div class="form-row">
                <div class="form-group">
                  <label for="access">Accessibility *</label>
                  <select v-model="form.access" id="access" required>
                    <option value="">Select access</option>
                    <option value="easy">Easy Access</option>
                    <option value="moderate">Moderate Access</option>
                    <option value="difficult">Difficult Access</option>
                    <option value="crane">Crane Required</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="timeline">Timeline</label>
                  <select v-model="form.timeline" id="timeline">
                    <option value="">Select timeline</option>
                    <option value="emergency">Emergency (Today)</option>
                    <option value="urgent">Urgent (This Week)</option>
                    <option value="normal">Normal (1-2 Weeks)</option>
                    <option value="flexible">Flexible (1+ Month)</option>
                  </select>
                </div>
              </div>

              <!-- Additional Services -->
              <div class="form-group full-width">
                <label>Additional Services</label>
                <div class="services-grid">
                  <label class="service-checkbox">
                    <input type="checkbox" v-model="form.services.cleanup">
                    <span class="checkmark"></span>
                    <span class="service-text">
                      <strong>Cleanup</strong>
                      <small>Debris removal</small>
                    </span>
                  </label>

                  <label class="service-checkbox">
                    <input type="checkbox" v-model="form.services.stump">
                    <span class="checkmark"></span>
                    <span class="service-text">
                      <strong>Stump Grinding</strong>
                      <small>Remove stump</small>
                    </span>
                  </label>

                  <label class="service-checkbox">
                    <input type="checkbox" v-model="form.services.wood">
                    <span class="checkmark"></span>
                    <span class="service-text">
                      <strong>Wood Chipping</strong>
                      <small>Process branches</small>
                    </span>
                  </label>

                  <label class="service-checkbox">
                    <input type="checkbox" v-model="form.services.hauling">
                    <span class="checkmark"></span>
                    <span class="service-text">
                      <strong>Hauling</strong>
                      <small>Remove debris</small>
                    </span>
                  </label>
                </div>
              </div>

              <!-- Contact Info -->
              <div class="form-group full-width">
                <label>Contact Information (Optional)</label>
                <div class="contact-grid">
                  <input 
                    type="text" 
                    v-model="form.contact.name" 
                    placeholder="Your name"
                    class="contact-input"
                  >
                  <input 
                    type="email" 
                    v-model="form.contact.email" 
                    placeholder="Email address"
                    class="contact-input"
                  >
                  <input 
                    type="tel" 
                    v-model="form.contact.phone" 
                    placeholder="Phone number"
                    class="contact-input"
                  >
                  <textarea 
                    v-model="form.contact.message" 
                    placeholder="Additional details about your project..."
                    class="contact-textarea"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="calculate-btn"
                :disabled="isCalculating"
              >
                <span v-if="!isCalculating">Calculate Quote</span>
                <span v-else>Calculating...</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Results Side -->
        <div class="results-side">
          <div class="results-card" :class="{ 'has-results': quote }">
            <div v-if="!quote" class="empty-state">
              <div class="empty-icon">💰</div>
              <h3>Get Your Quote</h3>
              <p>Fill out the form to see your personalized estimate</p>
            </div>

            <div v-else class="quote-results">
              <div class="quote-header">
                <h3>Your Estimate</h3>
                <p>Based on your project details</p>
              </div>

              <div class="price-display">
                <div class="price-range">
                  <span class="price-label">Estimated Range</span>
                  <div class="price-amount">
                    <span class="currency">$</span>
                    <span class="amount">{{ quote.min }}</span>
                    <span class="separator">-</span>
                    <span class="amount">{{ quote.max }}</span>
                  </div>
                  <span class="price-note">CAD</span>
                </div>
              </div>

              <div class="quote-breakdown">
                <h4>Price Breakdown</h4>
                <div class="breakdown-items">
                  <div 
                    v-for="item in quote.breakdown" 
                    :key="item.name"
                    class="breakdown-item"
                  >
                    <span class="item-name">{{ item.name }}</span>
                    <span class="item-price">${{ item.price }}</span>
                  </div>
                </div>
              </div>

              <div class="quote-disclaimer">
                <h4>Important Notes</h4>
                <ul>
                  <li>This is an estimate based on your inputs</li>
                  <li>Final price may vary after on-site inspection</li>
                  <li>Emergency services may have additional fees</li>
                  <li>Valid for 30 days from today</li>
                </ul>
              </div>

              <div class="quote-actions">
                <button class="btn-primary" @click="bookService">
                  Book This Service
                </button>
                <button class="btn-secondary" @click="contactUs">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-section">
      <div class="container">
        <h2>Why Use Our Quote Calculator?</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">⚡</div>
            <h3>Instant Estimates</h3>
            <p>Get a ballpark figure in seconds, not days</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🎯</div>
            <h3>Accurate Pricing</h3>
            <p>Based on real project data and market rates</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔒</div>
            <h3>No Obligation</h3>
            <p>Free estimates with no pressure to book</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📞</div>
            <h3>Expert Consultation</h3>
            <p>Follow up with our certified arborists</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'QuoteCalculatorView',
  setup() {
    const isCalculating = ref(false)
    const quote = ref(null)

    const form = reactive({
      service: '',
      trees: '',
      height: '',
      condition: '',
      access: '',
      timeline: '',
      services: {
        cleanup: false,
        stump: false,
        wood: false,
        hauling: false
      },
      contact: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    })

    const calculateQuote = () => {
      isCalculating.value = true
      
      // Simulate calculation delay
      setTimeout(() => {
        const basePrice = getBasePrice(form.service, form.height)
        const treeMultiplier = getTreeMultiplier(form.trees)
        const conditionMultiplier = getConditionMultiplier(form.condition)
        const accessMultiplier = getAccessMultiplier(form.access)
        const timelineMultiplier = getTimelineMultiplier(form.timeline)
        const servicesPrice = getServicesPrice(form.services)

        const total = basePrice * treeMultiplier * conditionMultiplier * accessMultiplier * timelineMultiplier + servicesPrice
        
        const minPrice = Math.round(total * 0.9)
        const maxPrice = Math.round(total * 1.1)

        quote.value = {
          min: minPrice.toLocaleString(),
          max: maxPrice.toLocaleString(),
          breakdown: [
            { name: 'Base Service', price: Math.round(basePrice).toLocaleString() },
            { name: 'Tree Count', price: Math.round(basePrice * (treeMultiplier - 1)).toLocaleString() },
            { name: 'Condition Factor', price: Math.round(basePrice * (conditionMultiplier - 1)).toLocaleString() },
            { name: 'Access Factor', price: Math.round(basePrice * (accessMultiplier - 1)).toLocaleString() },
            { name: 'Timeline Factor', price: Math.round(basePrice * (timelineMultiplier - 1)).toLocaleString() },
            { name: 'Additional Services', price: servicesPrice.toLocaleString() }
          ]
        }

        isCalculating.value = false
      }, 1500)
    }

    const getBasePrice = (service, height) => {
      const basePrices = {
        removal: { small: 300, medium: 600, large: 1200, xlarge: 2000 },
        trimming: { small: 150, medium: 300, large: 600, xlarge: 1000 },
        pruning: { small: 120, medium: 250, large: 500, xlarge: 800 },
        emergency: { small: 500, medium: 1000, large: 2000, xlarge: 3500 },
        stump: { small: 100, medium: 150, large: 250, xlarge: 400 },
        assessment: { small: 80, medium: 120, large: 180, xlarge: 250 }
      }
      return basePrices[service]?.[height] || 500
    }

    const getTreeMultiplier = (trees) => {
      const multipliers = { '1': 1, '2-3': 1.8, '4-6': 3.2, '7-10': 5.5, '10+': 8 }
      return multipliers[trees] || 1
    }

    const getConditionMultiplier = (condition) => {
      const multipliers = { healthy: 1, diseased: 1.2, dead: 1.1, damaged: 1.3, leaning: 1.4 }
      return multipliers[condition] || 1
    }

    const getAccessMultiplier = (access) => {
      const multipliers = { easy: 1, moderate: 1.2, difficult: 1.5, crane: 2.2 }
      return multipliers[access] || 1
    }

    const getTimelineMultiplier = (timeline) => {
      const multipliers = { emergency: 1.5, urgent: 1.2, normal: 1, flexible: 0.9 }
      return multipliers[timeline] || 1
    }

    const getServicesPrice = (services) => {
      let total = 0
      if (services.cleanup) total += 150
      if (services.stump) total += 200
      if (services.wood) total += 100
      if (services.hauling) total += 250
      return total
    }

    const bookService = () => {
      // Navigate to booking page
      window.location.href = '/booking'
    }

    const contactUs = () => {
      // Navigate to contact page
      window.location.href = '/contact'
    }

    return {
      form,
      quote,
      isCalculating,
      calculateQuote,
      bookService,
      contactUs
    }
  }
}
</script>

<style scoped>
/* Page Layout */
.quote-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--light-cream) 0%, #f8f9fa 100%);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-content p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Calculator Section */
.calculator-section {
  padding: 4rem 0;
}

.calculator-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 0 2rem;
}

/* Form Side */
.form-side {
  display: flex;
  flex-direction: column;
}

.form-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  color: var(--primary-green);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--text-light);
  font-size: 1rem;
}

/* Form Styles */
.quote-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: var(--primary-green);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group select,
.form-group input,
.form-group textarea {
  padding: 0.8rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 0 3px rgba(74, 124, 58, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.service-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.service-checkbox:hover {
  border-color: var(--primary-green);
  background: #f8f9fa;
}

.service-checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e9ecef;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.service-checkbox input[type="checkbox"]:checked + .checkmark {
  background: var(--primary-green);
  border-color: var(--primary-green);
}

.service-checkbox input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.service-text {
  display: flex;
  flex-direction: column;
}

.service-text strong {
  font-weight: 600;
  color: var(--text-dark);
}

.service-text small {
  color: var(--text-light);
  font-size: 0.8rem;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
}

.contact-input {
  padding: 0.8rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.contact-textarea {
  grid-column: 1 / -1;
  padding: 0.8rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
}

/* Calculate Button */
.calculate-btn {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.calculate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 124, 58, 0.3);
}

.calculate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Results Side */
.results-side {
  display: flex;
  flex-direction: column;
}

.results-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
  position: sticky;
  top: 2rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Empty State */
.empty-state {
  text-align: center;
  color: var(--text-light);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.empty-state p {
  font-size: 1rem;
}

/* Quote Results */
.quote-results {
  width: 100%;
}

.quote-header {
  text-align: center;
  margin-bottom: 2rem;
}

.quote-header h3 {
  color: var(--primary-green);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.quote-header p {
  color: var(--text-light);
  font-size: 1rem;
}

/* Price Display */
.price-display {
  margin-bottom: 2rem;
}

.price-range {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--light-cream) 0%, #f8f9fa 100%);
  border-radius: 12px;
  border: 2px solid var(--primary-green);
}

.price-label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.price-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1.5rem;
  color: var(--accent-orange);
  font-weight: 600;
}

.amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-orange);
}

.separator {
  font-size: 1.5rem;
  color: var(--text-light);
  font-weight: 400;
}

.price-note {
  font-size: 0.8rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Quote Breakdown */
.quote-breakdown {
  margin-bottom: 2rem;
}

.quote-breakdown h4 {
  color: var(--primary-green);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.breakdown-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.9rem;
}

.item-name {
  color: var(--text-dark);
  font-weight: 500;
}

.item-price {
  color: var(--accent-orange);
  font-weight: 600;
}

/* Quote Disclaimer */
.quote-disclaimer {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid var(--primary-green);
}

.quote-disclaimer h4 {
  color: var(--primary-green);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.quote-disclaimer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quote-disclaimer li {
  color: var(--text-light);
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.quote-disclaimer li::before {
  content: '•';
  color: var(--primary-green);
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Quote Actions */
.quote-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: var(--primary-green);
  color: white;
}

.btn-primary:hover {
  background: var(--secondary-green);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
}

.btn-secondary:hover {
  background: var(--primary-green);
  color: white;
  transform: translateY(-2px);
}

/* Why Choose Section */
.why-choose-section {
  background: white;
  padding: 4rem 0;
  border-top: 1px solid #e9ecef;
}

.why-choose-section h2 {
  text-align: center;
  color: var(--primary-green);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.benefit-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.benefit-card h3 {
  color: var(--primary-green);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.benefit-card p {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .calculator-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
  
  .results-card {
    position: static;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .calculator-section {
    padding: 2rem 0;
  }
  
  .form-card,
  .results-card {
    padding: 1.5rem;
  }
  
  .form-header h2 {
    font-size: 1.5rem;
  }
  
  .price-amount .amount {
    font-size: 2rem;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .calculator-section {
    padding: 1.5rem 0;
  }
  
  .form-card,
  .results-card {
    padding: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .price-amount .amount {
    font-size: 1.8rem;
  }
  
  .why-choose-section h2 {
    font-size: 2rem;
  }
}
</style> 