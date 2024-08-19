<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toast-notification";

const applicationData = ref(null);
const resumeFile = ref(null);
const isEditing = ref(false);
const toast = useToast();

onMounted(() => {
  const savedApplication = localStorage.getItem("jobApplication");
  if (savedApplication) {
    applicationData.value = JSON.parse(savedApplication);
  }

  const savedResume = localStorage.getItem("resumeFile");
  if (savedResume) {
    resumeFile.value = JSON.parse(savedResume);
  }
});

const saveChanges = () => {
  localStorage.setItem("jobApplication", JSON.stringify(applicationData.value));
  if (resumeFile.value) {
    localStorage.setItem("resumeFile", JSON.stringify(resumeFile.value));
  }
  toast.success("Profile updated successfuly");

  isEditing.value = false;
};

const editProfile = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};
</script>

<template>
  <div class="container my-5 p-5 shadow rounded form_data">
    <h2 class="mb-4">Applicant Details</h2>
    <div v-if="applicationData && !isEditing">
      <p class="mb-2"><strong>Name:</strong> {{ applicationData.name }}</p>
      <p class="mb-2"><strong>Email:</strong> {{ applicationData.email }}</p>
      <p class="mb-2"><strong>Phone:</strong> {{ applicationData.phone }}</p>
      <p v-if="resumeFile" class="mb-2">
        <strong>Resume:</strong>
        <a :href="resumeFile.content" :download="resumeFile.name">{{
          resumeFile.name
        }}</a>
      </p>
      <button class="btn btn-outline-success mt-3" @click="editProfile">
        Edit Profile
      </button>
    </div>
    <div v-else-if="isEditing">
      <form @submit.prevent="saveChanges">
        <div class="mb-3">
          <label for="name" class="form-label"><strong>Name:</strong></label>
          <input
            type="text"
            id="name"
            v-model="applicationData.name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label"><strong>Email:</strong></label>
          <input
            type="email"
            id="email"
            v-model="applicationData.email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label"><strong>Phone:</strong></label>
          <input
            type="text"
            id="phone"
            v-model="applicationData.phone"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="resume" class="form-label"
            ><strong>Resume:</strong></label
          >
          <input
            type="file"
            id="resume"
            @change="(e) => (resumeFile.value = e.target.files[0])"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-outline-success mt-3">
          Save Changes
        </button>
        <button
          type="button"
          class="btn btn-secondary mt-3 ms-2"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </form>
    </div>
    <div v-else>
      <p class="text-muted">No Applicant details submitted yet.</p>
      <router-link to="/apply">Create it here</router-link>
    </div>
  </div>
</template>
