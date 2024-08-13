import '../../assets/css/style.css'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
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
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/job-details',
      name: 'JobDetails',
      component: () => import('../views/JobDetails.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/elements',
      name: 'Elements',
      component: () => import('../views/Elements.vue')
    },
    {
      path: '/job-listings',
      name: 'JobListing',
      component: () => import('../views/JobListing.vue')
    },
  ]

})

export default router
