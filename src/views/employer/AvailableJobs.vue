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

const availableJobs = computed(() => {
  return jobs.value;
});

const applyForJob = (jobId) => {
  if (!hasApplied(jobId)) {
    const newApplication = {
      id: Date.now(),
      jobId: jobId,
      applicantId: loggedInUser.id,
      email: loggedInUser.email,
      appliedAt: new Date().toISOString(),
    };
    applications.value.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications.value));
  }
};

const hasApplied = (jobId) => {
  return applications.value.some(
    (app) => app.jobId === jobId && app.applicantId === loggedInUser.id
  );
};

const userApplications = computed(() => {
  return applications.value.filter(
    (app) => app.applicantId === loggedInUser.id
  );
});

const getJobTitle = (jobId) => {
  const job = jobs.value.find((j) => j.id === jobId);
  return job ? job.title : "Unknown Job";
  return job ? job.description : "Unknown description";
  return job ? job.location : "Unknown location";
  return job ? job.salary : "Unknown salary";
};
</script>

<template>
  <div>
    <h2>Applicant Dashboard</h2>

    <h3>Available Jobs</h3>
    <div v-for="job in availableJobs" :key="job.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ job.title }}</h5>
        <p class="card-text">{{ job.description }}</p>
        <p class="card-text">{{ job.location }}</p>
        <p class="card-text">{{ job.salary }}</p>
        <button
          class="btn"
          :class="hasApplied(job.id) ? 'btn-secondary' : 'btn-primary'"
          @click="applyForJob(job.id)"
          :disabled="hasApplied(job.id)"
        >
          {{ hasApplied(job.id) ? "Applied" : "Apply" }}
        </button>
      </div>
    </div>

    <h3 class="mt-4">Your Applications</h3>
    <ul class="list-group">
      <li
        v-for="application in userApplications"
        :key="application.id"
        class="list-group-item"
      >
        {{ getJobTitle(application.jobId) }} - Applied on
        {{ new Date(application.appliedAt).toLocaleDateString() }}
      </li>
    </ul>
  </div>
</template>
