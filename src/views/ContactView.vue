<template>
  <div class="contact-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch for a free consultation and quote</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-layout">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours</p>

            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input
                    type="text"
                    v-model="form.firstName"
                    id="firstName"
                    required
                    :class="{ error: errors.firstName }"
                  />
                  <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                </div>

                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input
                    type="text"
                    v-model="form.lastName"
                    id="lastName"
                    required
                    :class="{ error: errors.lastName }"
                  />
                  <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input
                    type="email"
                    v-model="form.email"
                    id="email"
                    required
                    :class="{ error: errors.email }"
                  />
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>

                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input
                    type="tel"
                    v-model="form.phone"
                    id="phone"
                    required
                    placeholder="(416) 555-0123"
                    :class="{ error: errors.phone }"
                  />
                  <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="address">Property Address</label>
                <input
                  type="text"
                  v-model="form.address"
                  id="address"
                  placeholder="123 Main Street, Toronto, ON"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="serviceType">Service Needed</label>
                  <select v-model="form.serviceType" id="serviceType">
                    <option value="">Select a service</option>
                    <option value="consultation">Free Consultation/Quote</option>
                    <option value="removal">Tree Removal</option>
                    <option value="trimming">Tree Trimming/Pruning</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="assessment">Tree Health Assessment</option>
                    <option value="maintenance">Regular Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="urgency">Urgency Level</label>
                  <select v-model="form.urgency" id="urgency">
                    <option value="flexible">Flexible Timeline</option>
                    <option value="soon">Within 2-4 weeks</option>
                    <option value="urgent">Within 1 week</option>
                    <option value="emergency">Emergency - ASAP</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  v-model="form.message"
                  id="message"
                  rows="6"
                  required
                  placeholder="Please describe your tree service needs, including tree location, size, and any specific concerns or questions..."
                  :class="{ error: errors.message }"
                ></textarea>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>

              <div class="form-group">
                <label for="budget">Estimated Budget Range</label>
                <select v-model="form.budget" id="budget">
                  <option value="">Select budget range (optional)</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="over-5000">Over $5,000</option>
                </select>
              </div>

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="form.consent" required />
                  I consent to being contacted by Beaver Tree regarding my inquiry *
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="form.newsletter" />
                  I would like to receive seasonal tree care tips and maintenance reminders
                </label>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="showSuccess" class="success-message">
              <div class="success-icon">✅</div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="contact-info-section">
            <div class="contact-info-card">
              <h2>Get In Touch</h2>

              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon">📞</div>
                  <div class="method-details">
                    <h3>Phone</h3>
                    <p><a href="tel:4165550123">(416) 555-0123</a></p>
                    <span>Mon-Fri: 7AM-7PM, Sat: 8AM-5PM</span>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">📧</div>
                  <div class="method-details">
                    <h3>Email</h3>
                    <p><a href="mailto:info@beavertree.ca">info@beavertree.ca</a></p>
                    <span>We respond within 24 hours</span>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">📍</div>
                  <div class="method-details">
                    <h3>Service Area</h3>
                    <p>Greater Toronto Area</p>
                    <span
                      >Toronto, Mississauga, Brampton, Markham, Vaughan, Richmond Hill, and
                      surrounding areas</span
                    >
                  </div>
                </div>

                <div class="contact-method emergency">
                  <div class="method-icon">🚨</div>
                  <div class="method-details">
                    <h3>24/7 Emergency</h3>
                    <p><a href="tel:4165550123">(416) 555-0123</a></p>
                    <span>For urgent tree emergencies</span>
                  </div>
                </div>
              </div>

              <div class="business-hours">
                <h3>Business Hours</h3>
                <div class="hours-list">
                  <div class="hour-item">
                    <span>Monday - Friday</span>
                    <span>7:00 AM - 7:00 PM</span>
                  </div>
                  <div class="hour-item">
                    <span>Saturday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div class="hour-item">
                    <span>Sunday</span>
                    <span>Emergency Calls Only</span>
                  </div>
                  <div class="hour-item emergency-hours">
                    <span>Emergency Service</span>
                    <span>24/7 Available</span>
                  </div>
                </div>
              </div>

              <div class="certifications-mini">
                <h3>Licensed & Insured</h3>
                <div class="cert-badges">
                  <div class="mini-badge">ISA Certified</div>
                  <div class="mini-badge">$2M Insured</div>
                  <div class="mini-badge">WSIB Compliant</div>
                  <div class="mini-badge">15+ Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="quick-faq">
      <div class="container">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>How quickly can you provide a quote?</h3>
            <p>
              We provide free quotes within 24 hours. For simple assessments, we can often give
              estimates over the phone.
            </p>
          </div>
          <div class="faq-item">
            <h3>Do you offer emergency services?</h3>
            <p>
              Yes! We provide 24/7 emergency tree services for storm damage, fallen trees, and
              dangerous situations.
            </p>
          </div>
          <div class="faq-item">
            <h3>Are you licensed and insured?</h3>
            <p>
              Absolutely. We carry $2M liability insurance, WSIB coverage, and all required
              municipal licenses.
            </p>
          </div>
          <div class="faq-item">
            <h3>What's included in your service?</h3>
            <p>
              All services include complete cleanup, debris removal, and site restoration unless
              otherwise specified.
            </p>
          </div>
        </div>
        <div class="faq-cta">
          <RouterLink to="/faq" class="btn-secondary">View All FAQs</RouterLink>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <h2>Our Service Area</h2>
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-content">
              <h3>🗺️ Greater Toronto Area</h3>
              <p>We proudly serve the entire GTA including:</p>
              <div class="service-areas">
                <div class="area-column">
                  <ul>
                    <li>Toronto</li>
                    <li>Mississauga</li>
                    <li>Brampton</li>
                    <li>Markham</li>
                  </ul>
                </div>
                <div class="area-column">
                  <ul>
                    <li>Vaughan</li>
                    <li>Richmond Hill</li>
                    <li>Etobicoke</li>
                    <li>North York</li>
                  </ul>
                </div>
                <div class="area-column">
                  <ul>
                    <li>Scarborough</li>
                    <li>Oakville</li>
                    <li>Burlington</li>
                    <li>And more!</li>
                  </ul>
                </div>
              </div>
              <p class="area-note">
                Don't see your area listed? Give us a call - we may still be able to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'ContactView',
  setup() {
    const form = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      serviceType: '',
      urgency: 'flexible',
      message: '',
      budget: '',
      consent: false,
      newsletter: false,
    })

    const errors = reactive({})
    const isSubmitting = ref(false)
    const showSuccess = ref(false)

    const validateForm = () => {
      // Clear previous errors
      Object.keys(errors).forEach((key) => delete errors[key])

      let isValid = true

      // Required field validation
      if (!form.firstName.trim()) {
        errors.firstName = 'First name is required'
        isValid = false
      }

      if (!form.lastName.trim()) {
        errors.lastName = 'Last name is required'
        isValid = false
      }

      if (!form.email.trim()) {
        errors.email = 'Email is required'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address'
        isValid = false
      }

      if (!form.phone.trim()) {
        errors.phone = 'Phone number is required'
        isValid = false
      } else if (!/^[\d\s\-\(\)\+]{10,}$/.test(form.phone.replace(/\s/g, ''))) {
        errors.phone = 'Please enter a valid phone number'
        isValid = false
      }

      if (!form.message.trim()) {
        errors.message = 'Message is required'
        isValid = false
      } else if (form.message.trim().length < 10) {
        errors.message = 'Please provide more details (at least 10 characters)'
        isValid = false
      }

      if (!form.consent) {
        errors.consent = 'You must consent to being contacted'
        isValid = false
      }

      return isValid
    }

    const submitForm = async () => {
      if (!validateForm()) {
        return
      }

      isSubmitting.value = true

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Show success message
        showSuccess.value = true

        // Reset form
        Object.keys(form).forEach((key) => {
          if (typeof form[key] === 'string') {
            form[key] = ''
          } else if (typeof form[key] === 'boolean') {
            form[key] = false
          }
        })
        form.urgency = 'flexible'

        // Hide success message after 5 seconds
        setTimeout(() => {
          showSuccess.value = false
        }, 5000)
      } catch (error) {
        alert('There was an error sending your message. Please try again or call us directly.')
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      errors,
      isSubmitting,
      showSuccess,
      submitForm,
    }
  },
}
</script>

<style scoped>
.contact-page {
  padding-top: 0;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Contact Section */
.contact-section {
  padding: 4rem 0;
  background-color: var(--light-cream);
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Contact Form */
.contact-form-section {
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.contact-form-section h2 {
  color: var(--primary-green);
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.contact-form-section > p {
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-form {
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

.form-group label {
  font-weight: 600;
  color: var(--primary-green);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.8rem;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 0 3px rgba(74, 124, 58, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type='checkbox'] {
  margin: 0;
  width: auto;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.checkbox-label span {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-light);
}

.form-submit {
  background-color: var(--primary-green);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.form-submit:hover {
  background-color: var(--secondary-green);
  transform: translateY(-2px);
}

.form-submit:disabled {
  background-color: var(--border-light);
  cursor: not-allowed;
  transform: none;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #c3e6cb;
}

/* Contact Info Card */
.contact-info-card {
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
}

.contact-info-card h2 {
  color: var(--primary-green);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--light-cream);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.contact-method:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.method-icon {
  width: 50px;
  height: 50px;
  background-color: var(--primary-green);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.method-details h3 {
  color: var(--primary-green);
  margin-bottom: 0.3rem;
  font-size: 1.2rem;
}

.method-details p {
  color: var(--text-dark);
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.method-details span {
  color: var(--text-light);
  font-size: 0.9rem;
}

.method-details a {
  color: var(--accent-orange);
  text-decoration: none;
  font-weight: 600;
}

.method-details a:hover {
  text-decoration: underline;
}

/* Hours of Operation */
.hours-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border-light);
}

.hours-section h3 {
  color: var(--primary-green);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hours-day {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.hours-day strong {
  color: var(--text-dark);
}

.hours-time {
  color: var(--primary-green);
  font-weight: 500;
}

.emergency-note {
  background-color: var(--accent-orange);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
}

.emergency-note strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

/* Certifications Mini */
.certifications-mini {
  padding-top: 2rem;
  border-top: 2px solid var(--border-light);
}

.certifications-mini h3 {
  color: var(--primary-green);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.cert-badges {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.mini-badge {
  background-color: var(--primary-green);
  color: white;
  padding: 0.5rem;
  text-align: center;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Quick FAQ */
.quick-faq {
  padding: 4rem 0;
  background-color: white;
}

.quick-faq h2 {
  text-align: center;
  color: var(--primary-green);
  font-size: 2.2rem;
  margin-bottom: 3rem;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.faq-item {
  background-color: var(--light-cream);
  padding: 1.5rem;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-3px);
}

.faq-item h3 {
  color: var(--primary-green);
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.faq-item p {
  color: var(--text-light);
  line-height: 1.6;
}

.faq-cta {
  text-align: center;
}

.btn-secondary {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: transparent;
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: var(--primary-green);
  color: white;
}

/* Map Section */
.map-section {
  padding: 4rem 0;
  background-color: var(--light-cream);
}

.map-section h2 {
  text-align: center;
  color: var(--primary-green);
  font-size: 2.2rem;
  margin-bottom: 3rem;
}

.map-container {
  max-width: 800px;
  margin: 0 auto;
}

.map-placeholder {
  background-color: white;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.map-content h3 {
  color: var(--primary-green);
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.map-content > p {
  color: var(--text-light);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.service-areas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.area-column ul {
  list-style: none;
  padding: 0;
}

.area-column li {
  padding: 0.3rem 0;
  color: var(--primary-green);
  font-weight: 500;
}

.area-note {
  color: var(--text-light);
  font-style: italic;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-info-card {
    position: static;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .cert-badges {
    grid-template-columns: 1fr;
  }

  .service-areas {
    grid-template-columns: repeat(2, 1fr);
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contact-form-section,
  .contact-info-card {
    padding: 1.5rem;
  }

  .service-areas {
    grid-template-columns: 1fr;
  }

  .map-placeholder {
    padding: 2rem;
  }
}
</style> 