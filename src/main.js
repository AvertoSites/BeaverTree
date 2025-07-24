import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Add router error handling
router.onError((error) => {
  console.error('Router error:', error)
})

// Add global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err, info)
}

app.use(router)
app.mount('#app')
