<template>
    <div class="container my-5">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-10">
          <div class="row g-0 shadow-lg">
            <!-- Image Column -->
            <div class="col-md-6 d-none d-md-block">
              <img src="@/assets/olumo-rock.jpg" alt="Logo" class="img-fluid logo">
            </div>
            <!-- Form Column -->
            <div class="col-md-6">
              <div class="card h-100 border-0">
                <div class="card-header text-center bg-dark text-white">
                  <h3>Login</h3>
                </div>
                <div class="card-body p-4">
                  <form @submit.prevent="handleSubmit">
                    <div class="form-group mb-3">
                      <label for="email">Email Address</label>
                      <input
                        type="email"
                        class="form-control rounded-pill"
                        id="email"
                        v-model="email"
                        placeholder="Enter email"
                      />
                      <div v-if="errors.email" class="text-danger mt-2">{{ errors.email }}</div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        class="form-control rounded-pill"
                        id="password"
                        v-model="password"
                        placeholder="Enter password"
                      />
                      <div v-if="errors.password" class="text-danger mt-2">{{ errors.password }}</div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <router-link to="/forgot-password" class="text-muted">Forgot Password?</router-link>
                    </div>
                    <button type="submit" class="btn btn-dark w-100 rounded-pill" :disabled="isSubmitting">
                      {{ isSubmitting ? 'Logging in...' : 'Login' }}
                    </button>
                  </form>
                </div>
                <div class="card-footer text-center bg-light">
                  <router-link to="/register" class="text-dark">Don't have an account? Register</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const errors = ref({});
      const isSubmitting = ref(false);
  
      const validateForm = () => {
        errors.value = {};
        let isValid = true;
  
        if (!email.value) {
          errors.value.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
          errors.value.email = 'Email is invalid';
          isValid = false;
        }
  
        if (!password.value) {
          errors.value.password = 'Password is required';
          isValid = false;
        }
  
        return isValid;
      };
  
      const handleSubmit = () => {
        if (!validateForm()) return;
  
        isSubmitting.value = true;
  
        // Simulate successful login with a delay
        setTimeout(() => {
          alert('Login successful!');
          isSubmitting.value = false;
          // Normally, redirect here, e.g., router.push('/dashboard');
        }, 1000);
      };
  
      return {
        email,
        password,
        errors,
        isSubmitting,
        handleSubmit
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  
  .shadow-lg {
    border-radius: 20px;
    overflow: hidden;
  }
  
  .logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card {
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .card-header {
    border-bottom: none;
    padding: 1.5rem;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  input.form-control {
    border: 1px solid #ced4da;
    padding: 0.75rem;
    font-size: 1rem;
  }
  
  button {
    font-size: 1.1rem;
  }
  
  .card-footer {
    background-color: #f8f9fa;
    padding: 1rem;
  }
  
  .card-footer a {
    font-weight: 500;
  }
  
  .d-flex .text-muted {
    font-size: 0.9rem;
  }
  </style>
  