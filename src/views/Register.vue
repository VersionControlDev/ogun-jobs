<template>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-header text-center bg-dark text-white">
              <h3>Register</h3>
            </div>
            <div class="card-body p-4">
              <div class="d-flex justify-content-center mb-4">
                <button 
                  class="btn btn-outline-dark me-2 toggle-button" 
                  :class="{ 'active': isEmployer }"
                  @click="isEmployer = true">Employer</button>
                <button 
                  class="btn btn-outline-dark toggle-button" 
                  :class="{ 'active': !isEmployer }"
                  @click="isEmployer = false">Applicant</button>
              </div>
              <form @submit.prevent="handleSubmit">
                <div v-if="isEmployer">
                  <div class="form-group mb-3">
                    <label for="companyName">Company Name</label>
                    <input
                      type="text"
                      class="form-control rounded-pill"
                      id="companyName"
                      v-model="companyName"
                      placeholder="Enter company name"
                    />
                    <div v-if="errors.companyName" class="text-danger mt-2">{{ errors.companyName }}</div>
                  </div>
                  <div class="form-group mb-3">
                    <label for="companyAddress">Company Address</label>
                    <input
                      type="text"
                      class="form-control rounded-pill"
                      id="companyAddress"
                      v-model="companyAddress"
                      placeholder="Enter company address"
                    />
                    <div v-if="errors.companyAddress" class="text-danger mt-2">{{ errors.companyAddress }}</div>
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="fullName">Full Name</label>
                  <input
                    type="text"
                    class="form-control rounded-pill"
                    id="fullName"
                    v-model="fullName"
                    placeholder="Enter full name"
                  />
                  <div v-if="errors.fullName" class="text-danger mt-2">{{ errors.fullName }}</div>
                </div>
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
                <div class="form-group mb-4">
                  <label for="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control rounded-pill"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    placeholder="Confirm password"
                  />
                  <div v-if="errors.confirmPassword" class="text-danger mt-2">{{ errors.confirmPassword }}</div>
                </div>
                <button type="submit" class="btn btn-dark w-100 rounded-pill" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Registering...' : 'Register' }}
                </button>
              </form>
            </div>
            <div class="card-footer text-center bg-light">
              <router-link to="/login" class="text-dark">Already have an account? Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Register',
    setup() {
      const isEmployer = ref(true);
      const companyName = ref('');
      const companyAddress = ref('');
      const fullName = ref('');
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const errors = ref({});
      const isSubmitting = ref(false);
  
      const validateForm = () => {
        errors.value = {};
        let isValid = true;
  
        if (isEmployer.value) {
          if (!companyName.value) {
            errors.value.companyName = 'Company name is required';
            isValid = false;
          }
          if (!companyAddress.value) {
            errors.value.companyAddress = 'Company address is required';
            isValid = false;
          }
        }
  
        if (!fullName.value) {
          errors.value.fullName = 'Full name is required';
          isValid = false;
        }
  
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
  
        if (password.value !== confirmPassword.value) {
          errors.value.confirmPassword = 'Passwords do not match';
          isValid = false;
        }
  
        return isValid;
      };
  
      const handleSubmit = () => {
        if (!validateForm()) return;
  
        isSubmitting.value = true;
  
        // Simulate registration process with a delay
        setTimeout(() => {
          alert('Registration successful!');
          isSubmitting.value = false;
          // Normally, redirect here, e.g., router.push('/login');
        }, 1000);
      };
  
      return {
        isEmployer,
        companyName,
        companyAddress,
        fullName,
        email,
        password,
        confirmPassword,
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
  
  .card {
    border-radius: 20px;
  }
  
  .card-header {
    border-bottom: none;
    padding: 1.5rem;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  .toggle-button {
    font-size: 1.2rem;
    padding: 0.5rem 2rem;
    border-radius: 20px;
  }
  
  button.active {
    background-color: #343a40;
    color: white;
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
  