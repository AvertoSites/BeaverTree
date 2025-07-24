<template>
  <div class="gallery-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Project Gallery</h1>
        <p>See our professional tree service work in action</p>
      </div>
    </section>

    <!-- Gallery Filters -->
    <section class="gallery-filters">
      <div class="container">
        <div class="filter-buttons">
          <button
            class="filter-btn"
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            All Projects
          </button>
          <button
            class="filter-btn"
            :class="{ active: activeFilter === 'removal' }"
            @click="setFilter('removal')"
          >
            Tree Removal
          </button>
          <button
            class="filter-btn"
            :class="{ active: activeFilter === 'trimming' }"
            @click="setFilter('trimming')"
          >
            Tree Trimming
          </button>
          <button
            class="filter-btn"
            :class="{ active: activeFilter === 'emergency' }"
            @click="setFilter('emergency')"
          >
            Emergency Work
          </button>
          <button
            class="filter-btn"
            :class="{ active: activeFilter === 'commercial' }"
            @click="setFilter('commercial')"
          >
            Commercial
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="gallery-grid-section">
      <div class="container">
        <div class="gallery-grid">
          <div
            v-for="item in filteredGallery"
            :key="item.id"
            class="gallery-item"
            :class="item.type"
            @click="openModal(item)"
          >
            <div class="gallery-image">
              <img :src="item.thumbnail" :alt="item.title" />
              <div class="overlay">
                <div class="overlay-content">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.category }}</p>
                  <div class="view-btn">
                    <span v-if="item.type === 'video'">▶ Watch Video</span>
                    <span v-else>🔍 View Details</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal for enlarged view -->
    <div v-if="selectedItem" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>

        <div v-if="selectedItem.type === 'video'" class="video-container">
          <iframe :src="selectedItem.videoUrl" frameborder="0" allowfullscreen></iframe>
        </div>

        <div v-else class="image-container">
          <img :src="selectedItem.fullImage" :alt="selectedItem.title" />
        </div>

        <div class="modal-info">
          <h3>{{ selectedItem.title }}</h3>
          <p class="modal-category">{{ selectedItem.category }}</p>
          <p class="modal-description">{{ selectedItem.description }}</p>
          <div class="modal-details">
            <span class="detail"><strong>Location:</strong> {{ selectedItem.location }}</span>
            <span class="detail"><strong>Duration:</strong> {{ selectedItem.duration }}</span>
            <span class="detail"><strong>Service:</strong> {{ selectedItem.service }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Before/After Section -->
    <section class="before-after">
      <div class="container">
        <h2>Before & After Transformations</h2>
        <div class="before-after-grid">
          <div class="comparison-item">
            <div class="comparison-images">
              <div class="before-image">
                <img
                  src="https://images.unsplash.com/photo-1441260038675-7329ab4cc264?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Before tree trimming"
                />
                <div class="image-label">Before</div>
              </div>
              <div class="after-image">
                <img
                  src="https://images.unsplash.com/photo-1574263867128-b1d55fc1bf73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="After tree trimming"
                />
                <div class="image-label">After</div>
              </div>
            </div>
            <h3>Overgrown Maple Tree Trimming</h3>
            <p>Professional crown reduction and shaping improved both safety and appearance</p>
          </div>

          <div class="comparison-item">
            <div class="comparison-images">
              <div class="before-image">
                <img
                  src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Before dangerous tree removal"
                />
                <div class="image-label">Before</div>
              </div>
              <div class="after-image">
                <img
                  src="https://images.unsplash.com/photo-1615799821640-4d5a7a7e47a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="After safe tree removal"
                />
                <div class="image-label">After</div>
              </div>
            </div>
            <h3>Hazardous Oak Tree Removal</h3>
            <p>Safe removal of diseased tree threatening the home, with complete cleanup</p>
          </div>

          <div class="comparison-item">
            <div class="comparison-images">
              <div class="before-image">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Before storm damage cleanup"
                />
                <div class="image-label">Before</div>
              </div>
              <div class="after-image">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="After storm damage cleanup"
                />
                <div class="image-label">After</div>
              </div>
            </div>
            <h3>Storm Damage Emergency Response</h3>
            <p>24-hour emergency response restored safety and cleared blocked driveway</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Testimonials with Photos -->
    <section class="testimonials-gallery">
      <div class="container">
        <h2>What Our Clients Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-image">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="John M."
              />
            </div>
            <div class="testimonial-content">
              <p>
                "The team did an amazing job removing a massive oak tree from our backyard.
                Professional, clean, and reasonably priced."
              </p>
              <h4>John M.</h4>
              <span>Etobicoke Homeowner</span>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-image">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616c04fe5b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Sarah L."
              />
            </div>
            <div class="testimonial-content">
              <p>
                "Excellent emergency response when a tree fell during the storm. They arrived within
                2 hours and had our driveway cleared quickly."
              </p>
              <h4>Sarah L.</h4>
              <span>North York Resident</span>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-image">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Mike R."
              />
            </div>
            <div class="testimonial-content">
              <p>
                "Regular trimming service for our commercial property. Always on time, professional,
                and leave the site spotless."
              </p>
              <h4>Mike R.</h4>
              <span>Property Manager</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="gallery-cta">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Transform Your Property?</h2>
          <p>See what professional tree care can do for your landscape</p>
          <div class="cta-buttons">
            <RouterLink to="/quote" class="btn-primary">Get Free Quote</RouterLink>
            <RouterLink to="/contact" class="btn-secondary">Discuss Your Project</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'GalleryView',
  setup() {
    const activeFilter = ref('all')
    const selectedItem = ref(null)

    // Gallery items data
    const galleryItems = ref([
      {
        id: 1,
        title: 'Large Oak Tree Removal',
        category: 'Tree Removal',
        filter: 'removal',
        type: 'image',
        thumbnail:
          'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fullImage:
          'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Safe removal of a 60-foot oak tree that was threatening the home foundation.',
        location: 'Scarborough, ON',
        duration: '1 Day',
        service: 'Complete Tree Removal',
      },
      {
        id: 2,
        title: 'Maple Tree Pruning',
        category: 'Tree Trimming',
        filter: 'trimming',
        type: 'image',
        thumbnail:
          'https://images.unsplash.com/photo-1574263867128-b1d55fc1bf73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fullImage:
          'https://images.unsplash.com/photo-1574263867128-b1d55fc1bf73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Precision pruning to improve tree health and enhance property aesthetics.',
        location: 'Toronto, ON',
        duration: 'Half Day',
        service: 'Crown Reduction & Shaping',
      },
      {
        id: 3,
        title: 'Storm Damage Cleanup',
        category: 'Emergency Service',
        filter: 'emergency',
        type: 'video',
        thumbnail:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: '24-hour emergency response to clear fallen trees after severe storm.',
        location: 'Mississauga, ON',
        duration: 'Emergency - 4 Hours',
        service: 'Emergency Tree Removal',
      },
      {
        id: 4,
        title: 'Commercial Property Maintenance',
        category: 'Commercial Service',
        filter: 'commercial',
        type: 'image',
        thumbnail:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fullImage:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Regular maintenance of trees on large commercial property.',
        location: 'Markham, ON',
        duration: '2 Days',
        service: 'Commercial Tree Care',
      },
      {
        id: 5,
        title: 'Pine Tree Removal Near Power Lines',
        category: 'Specialized Removal',
        filter: 'removal',
        type: 'image',
        thumbnail:
          'https://images.unsplash.com/photo-1587052815431-6b0b38e1e2d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fullImage:
          'https://images.unsplash.com/photo-1587052815431-6b0b38e1e2d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Careful removal of pine tree growing dangerously close to electrical lines.',
        location: 'Etobicoke, ON',
        duration: '1 Day',
        service: 'Hazardous Tree Removal',
      },
      {
        id: 6,
        title: 'Backyard Tree Trimming',
        category: 'Residential Trimming',
        filter: 'trimming',
        type: 'image',
        thumbnail:
          'https://images.unsplash.com/photo-1580268901334-6592be9b42f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        fullImage:
          'https://images.unsplash.com/photo-1580268901334-6592be9b42f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Seasonal trimming to maintain healthy growth and clear views.',
        location: 'North York, ON',
        duration: 'Half Day',
        service: 'Seasonal Tree Trimming',
      },
    ])

    const filteredGallery = computed(() => {
      if (activeFilter.value === 'all') {
        return galleryItems.value
      }
      return galleryItems.value.filter((item) => item.filter === activeFilter.value)
    })

    const setFilter = (filter) => {
      activeFilter.value = filter
    }

    const openModal = (item) => {
      selectedItem.value = item
    }

    const closeModal = () => {
      selectedItem.value = null
    }

    return {
      activeFilter,
      selectedItem,
      galleryItems,
      filteredGallery,
      setFilter,
      openModal,
      closeModal,
    }
  },
}
</script>

<style scoped>
.gallery-page {
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

/* Gallery Filters */
.gallery-filters {
  padding: 2rem 0;
  background-color: var(--light-cream);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--primary-green);
  background-color: white;
  color: var(--primary-green);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background-color: var(--primary-green);
  color: white;
}

/* Gallery Grid */
.gallery-grid-section {
  padding: 3rem 0;
  background-color: white;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-image {
  position: relative;
  width: 100%;
  height: 250px;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  padding: 1.5rem;
  width: 100%;
}

.overlay-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.overlay-content p {
  opacity: 0.8;
  margin-bottom: 1rem;
}

.view-btn {
  background-color: var(--accent-orange);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: bold;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  z-index: 1001;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px 12px 0 0;
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 12px 12px 0 0;
}

.modal-info {
  padding: 2rem;
}

.modal-info h3 {
  font-size: 1.5rem;
  color: var(--primary-green);
  margin-bottom: 0.5rem;
}

.modal-category {
  color: var(--accent-orange);
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--text-light);
}

.modal-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail {
  color: var(--text-light);
}

/* Before/After Section */
.before-after {
  padding: 4rem 0;
  background-color: var(--light-cream);
}

.before-after h2 {
  text-align: center;
  font-size: 2.2rem;
  color: var(--primary-green);
  margin-bottom: 3rem;
}

.before-after-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.comparison-item {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.comparison-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 200px;
}

.before-image,
.after-image {
  position: relative;
}

.before-image img,
.after-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.comparison-item h3 {
  color: var(--primary-green);
  padding: 1rem 1rem 0.5rem;
}

.comparison-item p {
  padding: 0 1rem 1rem;
  color: var(--text-light);
  line-height: 1.5;
}

/* Testimonials Gallery */
.testimonials-gallery {
  padding: 4rem 0;
  background-color: white;
}

.testimonials-gallery h2 {
  text-align: center;
  font-size: 2.2rem;
  color: var(--primary-green);
  margin-bottom: 3rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background-color: var(--light-cream);
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.testimonial-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--text-light);
  font-style: italic;
}

.testimonial-content h4 {
  color: var(--primary-green);
  margin-bottom: 0.2rem;
}

.testimonial-content span {
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Gallery CTA */
.gallery-cta {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 3rem 0;
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

/* Use global button styles - no local overrides needed */

/* Responsive Design */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .before-after-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2.5rem 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .gallery-section,
  .before-after,
  .testimonials-gallery,
  .gallery-cta {
    padding: 3rem 0;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .filter-buttons {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
  }

  .filter-btn {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }

  .before-after-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .comparison-images {
    height: 200px;
    gap: 0.5rem;
  }

  .before-image,
  .after-image {
    border-radius: 8px;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .testimonial-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .testimonial-image {
    align-self: center;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    margin: 0;
    max-width: 100%;
    max-height: 95vh;
    border-radius: 8px;
  }

  .modal-info {
    padding: 1.5rem;
  }

  .modal-details {
    font-size: 0.9rem;
  }

  .close-btn {
    font-size: 1.8rem;
    top: 0.5rem;
    right: 0.5rem;
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

  .gallery-section,
  .before-after,
  .testimonials-gallery,
  .gallery-cta {
    padding: 2.5rem 0;
  }

  .gallery-section h2,
  .before-after h2,
  .testimonials-gallery h2,
  .gallery-cta h2 {
    font-size: 1.8rem;
  }

  .filter-buttons {
    gap: 0.5rem;
  }

  .filter-btn {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    min-width: 80px;
  }

  .gallery-image {
    height: 200px;
  }

  .overlay-content {
    padding: 1rem;
  }

  .overlay-content h3 {
    font-size: 1rem;
  }

  .comparison-images {
    height: 150px;
  }

  .image-label {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }

  .testimonial-card {
    padding: 1.2rem;
  }

  .testimonial-image img {
    width: 60px;
    height: 60px;
  }

  .testimonial-content p {
    font-size: 0.9rem;
  }

  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-info {
    padding: 1rem;
  }

  .modal-info h2 {
    font-size: 1.3rem;
  }

  .video-container {
    border-radius: 8px 8px 0 0;
  }

  .image-container img {
    border-radius: 8px 8px 0 0;
  }
}
</style> 