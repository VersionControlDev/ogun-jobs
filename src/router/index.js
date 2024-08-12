import '../../assets/css/style.css'
import { createRouter, createWebHistory } from 'vue-router'
// import LandingPage from '../components/LandingPage.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: HomeView
    },
    {
      path: '/find-jobs',
      name: 'find-jobs',
      component: () => import('../views/FindJobs.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/forgot-password', // Add this route for the Forgot Password page
      name: 'ForgotPassword',
      component: () => import('../views/ForgotPassword.vue')
    }
  ]

})

export default router
