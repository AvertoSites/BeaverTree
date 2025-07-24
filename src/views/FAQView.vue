<template>
  <div class="faq-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our tree services</p>
      </div>
    </section>

    <!-- FAQ Search -->
    <section class="faq-search">
      <div class="full-width-container">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for answers..."
            class="search-input"
          />
          <div class="search-icon">🔍</div>
        </div>
      </div>
    </section>

    <!-- FAQ Categories -->
    <section class="faq-categories">
      <div class="full-width-container">
        <div class="category-filters">
          <button
            class="category-btn"
            :class="{ active: activeCategory === 'all' }"
            @click="setCategory('all')"
          >
            All Questions
          </button>
          <button
            class="category-btn"
            :class="{ active: activeCategory === 'pricing' }"
            @click="setCategory('pricing')"
          >
            Pricing & Quotes
          </button>
          <button
            class="category-btn"
            :class="{ active: activeCategory === 'services' }"
            @click="setCategory('services')"
          >
            Services
          </button>
          <button
            class="category-btn"
            :class="{ active: activeCategory === 'safety' }"
            @click="setCategory('safety')"
          >
            Safety & Insurance
          </button>
          <button
            class="category-btn"
            :class="{ active: activeCategory === 'process' }"
            @click="setCategory('process')"
          >
            Process & Timeline
          </button>
          <button
            class="category-btn"
            :class="{ active: activeCategory === 'emergency' }"
            @click="setCategory('emergency')"
          >
            Emergency Services
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="faq-content">
      <div class="full-width-container">
        <div class="faq-list">
          <div v-for="faq in filteredFAQs" :key="faq.id" class="faq-item">
            <div
              class="faq-question"
              @click="toggleFAQ(faq.id)"
              :class="{ expanded: expandedFAQs.includes(faq.id) }"
            >
              <h3>{{ faq.question }}</h3>
              <div class="expand-icon">
                {{ expandedFAQs.includes(faq.id) ? '−' : '+' }}
              </div>
            </div>
            <div class="faq-answer" :class="{ expanded: expandedFAQs.includes(faq.id) }">
              <div class="answer-content">
                <p v-html="faq.answer"></p>
                <div v-if="faq.additionalInfo" class="additional-info">
                  <strong>Additional Information:</strong>
                  <ul>
                    <li v-for="info in faq.additionalInfo" :key="info">{{ info }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results Message -->
        <div v-if="filteredFAQs.length === 0" class="no-results">
          <div class="no-results-icon">🤔</div>
          <h3>No matching questions found</h3>
          <p>Try adjusting your search terms or browse different categories</p>
          <button @click="clearSearch" class="btn-primary">Clear Search</button>
        </div>
      </div>
    </section>

    <!-- Still Have Questions -->
    <section class="contact-cta">
      <div class="full-width-container">
        <div class="cta-content">
          <h2>Still Have Questions?</h2>
          <p>Can't find the answer you're looking for? Our team is here to help!</p>
          <div class="cta-buttons">
            <RouterLink to="/contact" class="btn-primary">Contact Us</RouterLink>
            <a href="tel:4165550123" class="btn-secondary">Call (416) 555-0123</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'FAQView',
  setup() {
    const searchQuery = ref('')
    const activeCategory = ref('all')
    const expandedFAQs = ref([])

    const faqs = ref([
      // Pricing & Quotes
      {
        id: 1,
        category: 'pricing',
        question: 'How do you determine pricing for tree services?',
        answer:
          'Our pricing is based on several factors including tree size, species, location, accessibility, complexity of the job, and local market conditions. We provide transparent, upfront pricing with no hidden fees.',
        additionalInfo: [
          'Free on-site consultations and quotes',
          'Competitive pricing with detailed breakdown',
          'No surprise charges or hidden fees',
          'Payment plans available for larger projects',
        ],
      },
      {
        id: 2,
        category: 'pricing',
        question: 'Do you provide free estimates?',
        answer:
          'Yes! We provide completely free, no-obligation estimates for all tree services. Our certified arborist will visit your property to assess the work needed and provide a detailed written quote.',
        additionalInfo: [
          'Same-day quotes available',
          'Written estimates provided within 24 hours',
          'No pressure sales approach',
          'Valid for 30 days',
        ],
      },
      {
        id: 3,
        category: 'pricing',
        question: 'What payment methods do you accept?',
        answer:
          'We accept cash, check, and all major credit cards. For larger projects, we offer flexible payment plans and can work with your budget.',
        additionalInfo: [
          'Payment due upon completion',
          '50% deposit required for jobs over $2,000',
          'Senior and military discounts available',
          'Financing options for qualifying customers',
        ],
      },

      // Services
      {
        id: 4,
        category: 'services',
        question: 'What tree services do you offer?',
        answer:
          'We offer comprehensive tree care services including tree removal, pruning/trimming, stump grinding, tree health assessments, emergency services, and preventive maintenance programs.',
        additionalInfo: [
          'Complete tree removal and cleanup',
          'Crown reduction and shaping',
          'Dead branch removal',
          'Stump grinding and removal',
          'Tree health evaluations',
          'Storm damage cleanup',
          'Lot clearing services',
        ],
      },
      {
        id: 5,
        category: 'services',
        question: 'Do you clean up after tree work?',
        answer:
          'Absolutely! Complete cleanup and debris removal is included in all our services. We leave your property cleaner than we found it, with all branches, leaves, and wood chips removed unless you request to keep them.',
        additionalInfo: [
          'All debris hauled away',
          'Site restoration included',
          'Wood chips available upon request',
          'Firewood cutting service available',
        ],
      },
      {
        id: 6,
        category: 'services',
        question: 'Can you grind stumps after tree removal?',
        answer:
          'Yes, we offer professional stump grinding services. We can grind stumps below ground level and restore the area with topsoil and grass seed if needed.',
        additionalInfo: [
          'Ground 6-8 inches below surface',
          'All wood chips removed or redistributed',
          'Site restoration available',
          'Can accommodate tight access areas',
        ],
      },

      // Safety & Insurance
      {
        id: 7,
        category: 'safety',
        question: 'Are you licensed and insured?',
        answer:
          'Yes, we are fully licensed and carry comprehensive insurance coverage including $2 million general liability, workers compensation (WSIB), and equipment coverage. All certifications are current and available for review.',
        additionalInfo: [
          '$2 million general liability insurance',
          'WSIB workers compensation coverage',
          'ISA certified arborists on staff',
          'All municipal permits and licenses',
          'Bonded and insured team members',
        ],
      },
      {
        id: 8,
        category: 'safety',
        question: 'What safety measures do you take?',
        answer:
          'Safety is our top priority. Our team follows strict safety protocols, uses professional-grade equipment, and maintains current certifications. We conduct thorough site assessments and implement appropriate safety measures for each job.',
        additionalInfo: [
          'Comprehensive safety training for all staff',
          'Professional-grade safety equipment',
          'Property protection measures',
          'Electrical hazard awareness certification',
          'Regular equipment maintenance and inspection',
        ],
      },
      {
        id: 9,
        category: 'safety',
        question: "What happens if there's damage to my property?",
        answer:
          'While damage is extremely rare due to our safety protocols, we carry comprehensive insurance that covers any potential property damage. We also take extensive precautions to protect your property during all work.',
        additionalInfo: [
          'Full property damage coverage',
          'Quick claims processing',
          'Property protection measures standard',
          'Detailed pre-work documentation',
        ],
      },

      // Process & Timeline
      {
        id: 10,
        category: 'process',
        question: 'How long does tree removal typically take?',
        answer:
          'Timeline varies based on tree size, location, and complexity. Small trees (under 25ft) typically take 2-4 hours, medium trees (25-50ft) take 4-8 hours, and large trees (50ft+) may take 1-2 days.',
        additionalInfo: [
          'Weather conditions may affect timeline',
          'Permit requirements can add 3-7 days',
          'Multiple trees may qualify for bulk pricing',
          'Emergency services available 24/7',
        ],
      },
      {
        id: 11,
        category: 'process',
        question: 'Do I need permits for tree removal?',
        answer:
          'Permit requirements vary by municipality. We handle all permit applications and ensure compliance with local bylaws. Many areas require permits for trees over a certain size or for protected species.',
        additionalInfo: [
          'We handle all permit applications',
          'Permit fees included in quote',
          'Familiar with all local bylaws',
          'Can advise on protected species',
        ],
      },
      {
        id: 12,
        category: 'process',
        question: 'What is your scheduling availability?',
        answer:
          'We typically schedule non-emergency services within 1-3 weeks, depending on the season. Spring and fall are our busiest times. Emergency services are available 24/7.',
        additionalInfo: [
          'Flexible scheduling to meet your needs',
          'Weekend appointments available',
          'Seasonal variations in availability',
          'Priority scheduling for previous customers',
        ],
      },

      // Emergency Services
      {
        id: 13,
        category: 'emergency',
        question: 'Do you offer 24/7 emergency services?',
        answer:
          'Yes! We provide 24/7 emergency tree services for dangerous situations such as storm damage, fallen trees, or trees threatening structures. Our emergency response team is available year-round.',
        additionalInfo: [
          'Average response time: 2-4 hours',
          'Available 365 days a year',
          'Emergency equipment always ready',
          'Insurance claim assistance provided',
        ],
      },
      {
        id: 14,
        category: 'emergency',
        question: 'What constitutes a tree emergency?',
        answer:
          'Tree emergencies include fallen trees blocking roads or driveways, trees on structures, hanging branches threatening property, or unstable trees posing immediate danger to people or buildings.',
        additionalInfo: [
          'Storm-damaged trees',
          'Trees on power lines (call utility first)',
          'Blocking emergency access routes',
          'Immediate threat to safety',
        ],
      },
      {
        id: 15,
        category: 'emergency',
        question: 'How quickly can you respond to emergencies?',
        answer:
          'Our emergency response team typically arrives within 2-4 hours of your call, depending on weather conditions and location. We prioritize life-safety situations and work around the clock during storm events.',
        additionalInfo: [
          'Priority given to safety hazards',
          'Faster response during business hours',
          'Weather conditions may affect response time',
          'Multiple crews available during storms',
        ],
      },

      // General Questions
      {
        id: 16,
        category: 'services',
        question: 'When is the best time to trim trees?',
        answer:
          'The best time for tree pruning is typically late fall through early spring when trees are dormant. However, dead or dangerous branches should be removed immediately regardless of season.',
        additionalInfo: [
          'Species-specific timing recommendations',
          'Avoid pruning during active growth periods',
          'Emergency pruning done year-round',
          'Weather conditions considered',
        ],
      },
      {
        id: 17,
        category: 'services',
        question: 'How do I know if my tree is diseased or dying?',
        answer:
          'Signs include dead branches, fungal growth, unusual leaf drop, bark damage, or structural issues. Our certified arborists can provide professional tree health assessments to determine the best course of action.',
        additionalInfo: [
          'Free tree health consultations',
          'Early detection saves trees and money',
          'Treatment options when possible',
          'Removal recommendations when necessary',
        ],
      },
      {
        id: 18,
        category: 'pricing',
        question: 'Are there additional costs I should know about?',
        answer:
          'Our quotes include all standard work and cleanup. Additional costs may apply for permit fees, stump grinding (if not included), or special equipment needs. All potential additional costs are discussed upfront.',
        additionalInfo: [
          'Transparent pricing policy',
          'No hidden fees',
          'All potential costs discussed in advance',
          'Written estimates provided',
        ],
      },
    ])

    const filteredFAQs = computed(() => {
      let filtered = faqs.value

      // Filter by category
      if (activeCategory.value !== 'all') {
        filtered = filtered.filter((faq) => faq.category === activeCategory.value)
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
        )
      }

      return filtered
    })

    const setCategory = (category) => {
      activeCategory.value = category
    }

    const toggleFAQ = (id) => {
      const index = expandedFAQs.value.indexOf(id)
      if (index > -1) {
        expandedFAQs.value.splice(index, 1)
      } else {
        expandedFAQs.value.push(id)
      }
    }

    const clearSearch = () => {
      searchQuery.value = ''
      activeCategory.value = 'all'
    }

    return {
      searchQuery,
      activeCategory,
      expandedFAQs,
      faqs,
      filteredFAQs,
      setCategory,
      toggleFAQ,
      clearSearch,
    }
  },
}
</script>

<style scoped>
.faq-page {
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

/* FAQ Search */
.faq-search {
  padding: 2rem 0;
  background-color: var(--light-cream);
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid var(--border-light);
  border-radius: 25px;
  font-size: 1.1rem;
  background-color: white;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--secondary-green);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--text-light);
}

/* FAQ Categories */
.faq-categories {
  padding: 2rem 0;
  background-color: white;
  border-bottom: 2px solid var(--border-light);
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--primary-green);
  background-color: white;
  color: var(--primary-green);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.category-btn:hover,
.category-btn.active {
  background-color: var(--primary-green);
  color: white;
}

/* FAQ Content */
.faq-content {
  padding: 3rem 0;
  background-color: white;
}

.faq-list {
  max-width: 1000px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.faq-question {
  background-color: var(--light-cream);
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #e8e8e8;
}

.faq-question.expanded {
  background-color: var(--primary-green);
  color: white;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.4;
}

.expand-icon {
  font-size: 1.5rem;
  font-weight: bold;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-green);
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-question.expanded .expand-icon {
  background-color: white;
  color: var(--primary-green);
  transform: rotate(180deg);
}

.faq-answer {
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.expanded {
  max-height: 500px;
}

.answer-content {
  padding: 1.5rem;
  border-top: 1px solid var(--border-light);
}

.answer-content p {
  line-height: 1.6;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.additional-info {
  background-color: var(--light-cream);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.additional-info strong {
  color: var(--primary-green);
  display: block;
  margin-bottom: 0.5rem;
}

.additional-info ul {
  margin: 0;
  padding-left: 1.2rem;
}

.additional-info li {
  color: var(--text-light);
  line-height: 1.5;
  margin-bottom: 0.3rem;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  color: var(--primary-green);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.no-results p {
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-primary {
  background-color: var(--primary-green);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary:hover {
  background-color: var(--secondary-green);
  transform: translateY(-2px);
}

/* Contact CTA */
.contact-cta {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.cta-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: white;
  color: var(--primary-green);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .category-filters {
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .category-btn {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2.5rem 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .faq-section,
  .contact-cta {
    padding: 3rem 0;
  }

  .search-container {
    margin-bottom: 2rem;
  }

  .search-input {
    font-size: 1rem;
    padding: 0.8rem 2.5rem 0.8rem 1rem;
  }

  .category-filters {
    justify-content: center;
    gap: 0.6rem;
  }

  .category-btn {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    min-width: 100px;
  }

  .faq-question {
    padding: 1rem;
  }

  .faq-question h3 {
    font-size: 1rem;
    line-height: 1.3;
  }

  .answer-content {
    padding: 1rem;
  }

  .answer-content p {
    font-size: 0.9rem;
  }

  .contact-cta h2 {
    font-size: 1.8rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 2rem 0;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .faq-section,
  .contact-cta {
    padding: 2.5rem 0;
  }

  .search-input {
    font-size: 0.9rem;
    padding: 0.7rem 2rem 0.7rem 0.8rem;
  }

  .search-icon {
    right: 0.8rem;
    font-size: 1rem;
  }

  .category-filters {
    gap: 0.4rem;
  }

  .category-btn {
    font-size: 0.75rem;
    padding: 0.5rem 0.8rem;
    min-width: 80px;
  }

  .faq-question {
    padding: 0.8rem;
  }

  .faq-question h3 {
    font-size: 0.9rem;
  }

  .faq-toggle {
    font-size: 1.2rem;
  }

  .answer-content {
    padding: 0.8rem;
  }

  .answer-content p {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .no-results h3 {
    font-size: 1.3rem;
  }

  .contact-cta h2 {
    font-size: 1.6rem;
  }

  .contact-cta p {
    font-size: 1rem;
  }
}
</style> 