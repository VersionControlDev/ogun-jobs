<script setup>
import { ref, onMounted, computed } from "vue";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const jobs = ref([]);
const applications = ref([]);

onMounted(() => {
  loadJobs();
  loadApplications();
});

const loadJobs = () => {
  const savedJobs = localStorage.getItem("jobs");
  if (savedJobs) {
    jobs.value = JSON.parse(savedJobs);
  }
};

const loadApplications = () => {
  const savedApplications = localStorage.getItem("applications");
  if (savedApplications) {
    applications.value = JSON.parse(savedApplications);
  }
};

const appliedJobs = computed(() => {
  const userApplications = applications.value.filter(
    (app) => app.applicantId === loggedInUser.id
  );
  return userApplications.map((app) => {
    const job = jobs.value.find((j) => j.id === app.jobId);
    return {
      ...job,
      appliedAt: app.appliedAt,
    };
  });
});
</script>

<template>
  <div>
    <h3>Your Applied Jobs</h3>
    <div v-if="appliedJobs.length === 0" class="alert alert-info">
      You haven't applied to any jobs yet.
    </div>
    <div v-else>
      <div v-for="job in appliedJobs" :key="job.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ job.title }}</h5>
          <p class="card-text">{{ job.description }}</p>
          <p class="card-text">{{ job.location }}</p>
          <p class="card-text">{{ job.salary }}</p>
          <!-- <p class="card-text">{{ job.date }}</p> -->
          <p class="text-muted">
            Applied on: {{ new Date(job.appliedAt).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
