<template>
  <div class="booking-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Schedule Your Service</h1>
        <p>Book your tree service appointment online</p>
      </div>
    </section>

    <!-- Booking Process -->
    <section class="booking-section">
      <div class="full-width-container">
        <div class="booking-layout">
          <!-- Step Indicator -->
          <div class="steps-indicator">
            <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <div class="step-number">1</div>
              <span>Service Details</span>
            </div>
            <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
              <div class="step-number">2</div>
              <span>Select Date & Time</span>
            </div>
            <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
              <div class="step-number">3</div>
              <span>Contact Information</span>
            </div>
            <div class="step" :class="{ active: currentStep >= 4 }">
              <div class="step-number">4</div>
              <span>Confirmation</span>
            </div>
          </div>

          <!-- Step 1: Service Details -->
          <div v-if="currentStep === 1" class="booking-step">
            <h2>Tell Us About Your Service Needs</h2>
            <form @submit.prevent="nextStep">
              <div class="form-grid">
                <div class="form-group">
                  <label for="serviceType">Service Type *</label>
                  <select v-model="booking.serviceType" id="serviceType" required>
                    <option value="">Select a service</option>
                    <option value="assessment">Free Assessment/Quote</option>
                    <option value="removal">Tree Removal</option>
                    <option value="trimming">Tree Trimming/Pruning</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="stump-grinding">Stump Grinding</option>
                    <option value="maintenance">Regular Maintenance</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="priority">Priority Level</label>
                  <select v-model="booking.priority" id="priority">
                    <option value="standard">Standard (2-4 weeks)</option>
                    <option value="high">High Priority (1-2 weeks)</option>
                    <option value="urgent">Urgent (ASAP)</option>
                    <option value="emergency">Emergency (24/7)</option>
                  </select>
                </div>

                <div class="form-group full-width">
                  <label for="description">Project Description</label>
                  <textarea
                    v-model="booking.description"
                    id="description"
                    rows="4"
                    placeholder="Please describe your tree service needs, including tree size, location, and any specific concerns..."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="propertyType">Property Type</label>
                  <select v-model="booking.propertyType" id="propertyType">
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="municipal">Municipal/Government</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="estimatedBudget">Estimated Budget</label>
                  <select v-model="booking.estimatedBudget" id="estimatedBudget">
                    <option value="">Select budget range</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="over-5000">Over $5,000</option>
                  </select>
                </div>
              </div>

              <button type="submit" class="btn-primary">Continue to Date Selection</button>
            </form>
          </div>

          <!-- Step 2: Date & Time Selection -->
          <div v-if="currentStep === 2" class="booking-step">
            <h2>Select Your Preferred Date & Time</h2>

            <!-- Calendar -->
            <div class="calendar-section">
              <div class="calendar-header">
                <button @click="previousMonth" class="nav-btn">&lt;</button>
                <h3>{{ currentMonthName }} {{ currentYear }}</h3>
                <button @click="nextMonth" class="nav-btn">&gt;</button>
              </div>

              <div class="calendar-grid">
                <div class="calendar-day-header" v-for="day in dayHeaders" :key="day">
                  {{ day }}
                </div>
                <div
                  v-for="day in calendarDays"
                  :key="`${day.date}-${day.isCurrentMonth}`"
                  class="calendar-day"
                  :class="{
                    'other-month': !day.isCurrentMonth,
                    available: day.isAvailable,
                    selected: selectedDate === day.fullDate,
                    today: day.isToday,
                  }"
                  @click="selectDate(day)"
                >
                  {{ day.date }}
                </div>
              </div>
            </div>

            <!-- Time Slots -->
            <div v-if="selectedDate" class="time-slots-section">
              <h3>Available Time Slots for {{ formatSelectedDate }}</h3>
              <div class="time-slots">
                <button
                  v-for="slot in availableTimeSlots"
                  :key="slot.time"
                  class="time-slot"
                  :class="{ selected: booking.timeSlot === slot.time }"
                  @click="booking.timeSlot = slot.time"
                >
                  {{ slot.time }}
                  <span class="slot-type">{{ slot.type }}</span>
                </button>
              </div>
            </div>

            <div class="step-actions">
              <button @click="previousStep" class="btn-secondary">Back</button>
              <button
                @click="nextStep"
                class="btn-primary"
                :disabled="!selectedDate || !booking.timeSlot"
              >
                Continue to Contact Info
              </button>
            </div>
          </div>

          <!-- Step 3: Contact Information -->
          <div v-if="currentStep === 3" class="booking-step">
            <h2>Contact Information</h2>
            <form @submit.prevent="nextStep">
              <div class="form-grid">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input type="text" v-model="booking.firstName" id="firstName" required />
                </div>

                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input type="text" v-model="booking.lastName" id="lastName" required />
                </div>

                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input type="email" v-model="booking.email" id="email" required />
                </div>

                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input type="tel" v-model="booking.phone" id="phone" required />
                </div>

                <div class="form-group full-width">
                  <label for="address">Property Address *</label>
                  <input
                    type="text"
                    v-model="booking.address"
                    id="address"
                    required
                    placeholder="123 Main Street, Toronto, ON M5V 1A1"
                  />
                </div>

                <div class="form-group full-width">
                  <label for="specialInstructions">Special Instructions</label>
                  <textarea
                    v-model="booking.specialInstructions"
                    id="specialInstructions"
                    rows="3"
                    placeholder="Gate codes, access instructions, pets, or other important details..."
                  ></textarea>
                </div>

                <div class="form-group full-width">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="booking.agreeToTerms" required />
                    I agree to the <a href="#" class="link">terms and conditions</a> and authorize
                    Beaver Tree to contact me regarding this appointment
                  </label>
                </div>

                <div class="form-group full-width">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="booking.emailUpdates" />
                    I would like to receive email updates about my appointment and seasonal tree
                    care tips
                  </label>
                </div>
              </div>

              <div class="step-actions">
                <button @click="previousStep" class="btn-secondary">Back</button>
                <button type="submit" class="btn-primary">Review Booking</button>
              </div>
            </form>
          </div>

          <!-- Step 4: Confirmation -->
          <div v-if="currentStep === 4" class="booking-step">
            <div class="confirmation-content">
              <div class="success-icon">✅</div>
              <h2>Booking Request Submitted!</h2>
              <p>Thank you for choosing Beaver Tree. We've received your booking request.</p>

              <div class="booking-summary">
                <h3>Booking Summary</h3>
                <div class="summary-item">
                  <strong>Service:</strong> {{ getServiceName(booking.serviceType) }}
                </div>
                <div class="summary-item"><strong>Date:</strong> {{ formatSelectedDate }}</div>
                <div class="summary-item"><strong>Time:</strong> {{ booking.timeSlot }}</div>
                <div class="summary-item">
                  <strong>Priority:</strong> {{ getPriorityName(booking.priority) }}
                </div>
                <div class="summary-item">
                  <strong>Contact:</strong> {{ booking.firstName }} {{ booking.lastName }}
                </div>
                <div class="summary-item"><strong>Phone:</strong> {{ booking.phone }}</div>
                <div class="summary-item"><strong>Email:</strong> {{ booking.email }}</div>
                <div class="summary-item"><strong>Address:</strong> {{ booking.address }}</div>
              </div>

              <div class="next-steps-info">
                <h3>What Happens Next?</h3>
                <div class="steps-list">
                  <div class="step-item">
                    <div class="step-icon">1</div>
                    <div class="step-text">
                      <h4>Confirmation Call</h4>
                      <p>We'll call you within 2 hours to confirm your appointment details</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <div class="step-icon">2</div>
                    <div class="step-text">
                      <h4>Pre-Visit Assessment</h4>
                      <p>
                        For complex jobs, we may schedule a brief site visit for accurate quoting
                      </p>
                    </div>
                  </div>
                  <div class="step-item">
                    <div class="step-icon">3</div>
                    <div class="step-text">
                      <h4>Service Day</h4>
                      <p>Our certified team arrives on time with all necessary equipment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="contact-emergency">
                <h4>Need to Make Changes?</h4>
                <p>Call us at <a href="tel:4165550123" class="phone-link">(416) 555-0123</a></p>
                <p>
                  Or email
                  <a href="mailto:bookings@scotttreebusiness.ca" class="email-link"
                    >bookings@scotttreebusiness.ca</a
                  >
                </p>
              </div>

              <div class="action-buttons">
                <RouterLink to="/" class="btn-primary">Return to Home</RouterLink>
                <button @click="bookAnother" class="btn-secondary">Book Another Service</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'

export default {
  name: 'BookingView',
  setup() {
    const currentStep = ref(1)
    const selectedDate = ref(null)
    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())

    const booking = reactive({
      serviceType: '',
      priority: 'standard',
      description: '',
      propertyType: 'residential',
      estimatedBudget: '',
      date: '',
      timeSlot: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      specialInstructions: '',
      agreeToTerms: false,
      emailUpdates: false,
    })

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const currentMonthName = computed(() => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return months[currentMonth.value]
    })

    const formatSelectedDate = computed(() => {
      if (!selectedDate.value) return ''
      const date = new Date(selectedDate.value)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    })

    const calendarDays = computed(() => {
      const year = currentYear.value
      const month = currentMonth.value
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const firstDayOfWeek = firstDay.getDay()
      const daysInMonth = lastDay.getDate()

      const days = []
      const today = new Date()

      // Add days from previous month
      const prevMonth = new Date(year, month - 1, 0)
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = prevMonth.getDate() - i
        days.push({
          date,
          isCurrentMonth: false,
          isAvailable: false,
          isToday: false,
          fullDate: `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`,
        })
      }

      // Add days from current month
      for (let date = 1; date <= daysInMonth; date++) {
        const currentDate = new Date(year, month, date)
        const isToday = currentDate.toDateString() === today.toDateString()
        const isAvailable = currentDate >= today && currentDate.getDay() !== 0 // Not Sunday and not in past

        days.push({
          date,
          isCurrentMonth: true,
          isAvailable,
          isToday,
          fullDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(
            2,
            '0'
          )}`,
        })
      }

      // Add days from next month to fill the grid
      const remainingDays = 42 - days.length
      for (let date = 1; date <= remainingDays; date++) {
        days.push({
          date,
          isCurrentMonth: false,
          isAvailable: false,
          isToday: false,
          fullDate: `${year}-${String(month + 2).padStart(2, '0')}-${String(date).padStart(
            2,
            '0'
          )}`,
        })
      }

      return days
    })

    const availableTimeSlots = computed(() => {
      if (!selectedDate.value) return []

      return [
        { time: '8:00 AM', type: 'Morning' },
        { time: '10:00 AM', type: 'Morning' },
        { time: '12:00 PM', type: 'Afternoon' },
        { time: '2:00 PM', type: 'Afternoon' },
        { time: '4:00 PM', type: 'Afternoon' },
      ]
    })

    const nextStep = () => {
      if (currentStep.value < 4) {
        currentStep.value++
      }
    }

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--
      }
    }

    const selectDate = (day) => {
      if (day.isAvailable && day.isCurrentMonth) {
        selectedDate.value = day.fullDate
        booking.date = day.fullDate
      }
    }

    const previousMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
    }

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
    }

    const getServiceName = (serviceType) => {
      const services = {
        assessment: 'Free Assessment/Quote',
        removal: 'Tree Removal',
        trimming: 'Tree Trimming/Pruning',
        emergency: 'Emergency Service',
        'stump-grinding': 'Stump Grinding',
        maintenance: 'Regular Maintenance',
      }
      return services[serviceType] || serviceType
    }

    const getPriorityName = (priority) => {
      const priorities = {
        standard: 'Standard (2-4 weeks)',
        high: 'High Priority (1-2 weeks)',
        urgent: 'Urgent (ASAP)',
        emergency: 'Emergency (24/7)',
      }
      return priorities[priority] || priority
    }

    const bookAnother = () => {
      // Reset form
      currentStep.value = 1
      selectedDate.value = null
      Object.keys(booking).forEach((key) => {
        if (typeof booking[key] === 'string') {
          booking[key] = ''
        } else if (typeof booking[key] === 'boolean') {
          booking[key] = false
        }
      })
      booking.priority = 'standard'
      booking.propertyType = 'residential'
    }

    return {
      currentStep,
      selectedDate,
      currentMonth,
      currentYear,
      booking,
      dayHeaders,
      currentMonthName,
      formatSelectedDate,
      calendarDays,
      availableTimeSlots,
      nextStep,
      previousStep,
      selectDate,
      previousMonth,
      nextMonth,
      getServiceName,
      getPriorityName,
      bookAnother,
    }
  },
}
</script>

<style scoped>
.booking-page {
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

/* Booking Section */
.booking-section {
  padding: 3rem 0;
  background-color: var(--light-cream);
  min-height: 80vh;
}

.booking-layout {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Steps Indicator */
.steps-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
  transition: all 0.3s ease;
  position: relative;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 100%;
  width: 50px;
  height: 2px;
  background-color: var(--border-light);
  transition: background-color 0.3s ease;
}

.step.completed:not(:last-child)::after {
  background-color: var(--accent-orange);
}

.step.active,
.step.completed {
  opacity: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--border-light);
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step.active .step-number {
  background-color: var(--primary-green);
  color: white;
  transform: scale(1.1);
}

.step.completed .step-number {
  background-color: var(--accent-orange);
  color: white;
}

.step span {
  font-size: 0.9rem;
  text-align: center;
  color: var(--text-light);
  font-weight: 500;
}

.step.active span,
.step.completed span {
  color: var(--text-dark);
  font-weight: 600;
}

/* Booking Steps */
.booking-step {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.booking-step h2 {
  color: var(--primary-green);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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
  transition: border-color 0.3s ease;
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
  min-height: 100px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  line-height: 1.5;
}

.checkbox-label input[type='checkbox'] {
  margin-top: 0.2rem;
  width: auto;
}

.link {
  color: var(--primary-green);
  text-decoration: underline;
}

/* Calendar Styles */
.calendar-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.calendar-nav {
  background: var(--primary-green);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calendar-nav:hover {
  background-color: var(--secondary-green);
}

.calendar-nav:disabled {
  background-color: var(--border-light);
  cursor: not-allowed;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: var(--border-light);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.calendar-header-day {
  background-color: var(--primary-green);
  color: white;
  padding: 0.8rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.calendar-day {
  background-color: white;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.calendar-day:hover {
  background-color: var(--light-cream);
}

.calendar-day.other-month {
  color: var(--text-light);
  background-color: #f8f8f8;
}

.calendar-day.selected {
  background-color: var(--accent-orange);
  color: white;
  font-weight: bold;
}

.calendar-day.unavailable {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.calendar-day.unavailable:hover {
  background-color: #f5f5f5;
}

/* Time Slots */
.time-slots-section {
  margin-bottom: 2rem;
}

.time-slots-section h3 {
  color: var(--primary-green);
  margin-bottom: 1rem;
}

.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.time-slot {
  background: white;
  border: 2px solid var(--border-light);
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.time-slot:hover {
  border-color: var(--primary-green);
  background-color: var(--light-cream);
}

.time-slot.selected {
  background-color: var(--primary-green);
  color: white;
  border-color: var(--primary-green);
}

.time-slot.unavailable {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #ddd;
}

.slot-type {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Step Actions */
.step-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.btn-step {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn-step.primary {
  background-color: var(--primary-green);
  color: white;
}

.btn-step.primary:hover {
  background-color: var(--secondary-green);
  transform: translateY(-2px);
}

.btn-step.secondary {
  background-color: transparent;
  color: var(--primary-green);
  border: 2px solid var(--primary-green);
}

.btn-step.secondary:hover {
  background-color: var(--primary-green);
  color: white;
}

.btn-step:disabled {
  background-color: var(--border-light);
  color: var(--text-light);
  cursor: not-allowed;
  transform: none;
}

/* Summary Section */
.booking-summary {
  background: var(--light-cream);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.booking-summary h3 {
  color: var(--primary-green);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--border-light);
}

.summary-item:last-child {
  border-bottom: none;
  font-weight: 600;
  color: var(--primary-green);
}

.summary-label {
  font-weight: 500;
  color: var(--text-dark);
}

.summary-value {
  font-weight: 600;
  color: var(--primary-green);
}

.next-steps-info {
  margin-bottom: 2rem;
  text-align: left;
}

.next-steps-info h3 {
  color: var(--primary-green);
  margin-bottom: 1.5rem;
  text-align: center;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--accent-orange);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text h4 {
  color: var(--primary-green);
  margin-bottom: 0.3rem;
}

.step-text p {
  color: var(--text-light);
  line-height: 1.5;
  margin: 0;
}

.contact-emergency {
  background-color: var(--light-cream);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.contact-emergency h4 {
  color: var(--primary-green);
  margin-bottom: 0.5rem;
}

.phone-link,
.email-link {
  color: var(--accent-orange);
  text-decoration: none;
  font-weight: bold;
}

.phone-link:hover,
.email-link:hover {
  text-decoration: underline;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .steps-indicator {
    gap: 1rem;
  }

  .step span {
    font-size: 0.8rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .calendar-day {
    min-height: 35px;
    padding: 0.5rem;
  }

  .time-slots {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-actions {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .summary-item {
    flex-direction: column;
    gap: 0.2rem;
  }
}

@media (max-width: 480px) {
  .steps-indicator {
    gap: 0.5rem;
  }

  .booking-step {
    padding: 1.5rem;
  }

  .time-slots {
    grid-template-columns: 1fr;
  }

  .calendar-grid {
    font-size: 0.9rem;
  }

  .calendar-day {
    min-height: 30px;
  }
}
</style> 