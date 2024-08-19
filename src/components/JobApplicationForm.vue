<script setup>
import { ref, onMounted } from "vue";

const formData = ref({
  name: "",
  email: "",
  phone: "",
  resume: null,
});

const isSubmitting = ref(false);
const showToast = ref(false);

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.resume = file;
  }
};

const submitApplication = () => {
  isSubmitting.value = true;
  // Save form data to local storage
  localStorage.setItem("jobApplication", JSON.stringify(formData.value));

  // Convert file to base64 for storage
  const reader = new FileReader();
  reader.onload = (e) => {
    const resumeData = {
      name: formData.value.resume.name,
      type: formData.value.resume.type,
      content: e.target.result,
    };
    localStorage.setItem("resumeFile", JSON.stringify(resumeData));
  };
  reader.readAsDataURL(formData.value.resume);

  // Simulate a network request with timeout
  setTimeout(() => {
    isSubmitting.value = false;
    showToast.value = true;

    formData.value = {
      name: "",
      email: "",
      phone: "",
      resume: null,
    };
    document.getElementById("resume").value = "";
    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }, 2000);
};

// onMounted(() => {
//   // Autofill form data if available in local storage
//   const savedApplication = localStorage.getItem("jobApplication");
//   if (savedApplication) {
//     const parsedData = JSON.parse(savedApplication);
//     formData.value = { ...formData.value, ...parsedData };
//   }
// });
</script>

<template>
  <img src="../../assets/img/hero/landingHero1.png" alt="" />
  <div class="container job-application-form my-5">
    <div class="row justify-content-center">
      <div class="col-md-6 form-container">
        <h2 class="mb-4 text-center">Job Application</h2>
        <form @submit.prevent="submitApplication">
          <div class="row">
            <div class="mb-3 col-12 col-md-6">
              <label for="name" class="form-label">Full Name:</label>
              <input
                v-model="formData.name"
                type="text"
                id="name"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3 col-12 col-md-6">
              <label for="email" class="form-label">Email:</label>
              <input
                v-model="formData.email"
                type="email"
                id="email"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="mb-3 col-12 col-md-6">
              <label for="phone" class="form-label">Phone:</label>
              <input
                v-model="formData.phone"
                type="tel"
                id="phone"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3 col-12 col-md-6">
              <label for="resume" class="form-label">Resume:</label>
              <input
                @change="handleResumeUpload"
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="text-center">
            <!-- Center the button -->
            <button
              type="submit"
              class="btn btn-outline-success w-50"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span v-if="!isSubmitting">Submit</span>
              <span v-if="isSubmitting">Submitting...</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="toast-container position-fixed bottom-0 end-0 p-3"
    >
      <div
        class="toast align-items-center text-bg-success border-0 show"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">
            Your application has been submitted successfully!
          </div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            @click="showToast = false"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  background: linear-gradient(to right, #2d995f, #56ab2f);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.form-label {
  color: #fff;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.8);
}

.btn-outline-success {
  border-color: #fff;
  color: #fff;
}

.btn-outline-success:hover {
  background-color: #fff;
  color: #2c8a42;
}

h2 {
  color: #fff;
}
</style>
