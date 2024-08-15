<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const jobs = ref([]);
const applications = ref([]);
const router = useRouter();
const toast = useToast();

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
  if (!loggedInUser) {
    toast.warning("Please log in to apply for this job. Redirecting...");
    setTimeout(() => {
      router.push("/login");
    }, 4000);
  } else if (!hasApplied(jobId)) {
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
  if (!loggedInUser) return false;
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
};
</script>

<template>
  <div>
    <div
      v-for="job in availableJobs"
      :key="job.id"
      class="single-job-items mb-30 shadow rounded"
    >
      <div class="job-items">
        <div class="company-img">
          <a href=""><img src="/assets/img/icon/job-list4.png" alt="" /></a>
        </div>
        <div class="job-tittle">
          <h5 class="card-title">{{ job.title }}</h5>
          <p class="">{{ job.description }}</p>
          <p class="card-text">
            <i class="fas fa-map-marker-alt"> &nbsp;</i>{{ job.location }}
          </p>
          <div class="d-flex justify-content-between">
            <p class="card-text">₦{{ job.salary.toLocaleString() }}</p>
            <p class="card-text">{{ job.job_type }}</p>
            <p class="card-text">{{ job.date }}</p>
          </div>
        </div>
      </div>
      <div class="">
        <button
          class="btn"
          :class="hasApplied(job.id) ? 'btn-secondary' : 'btn-primary'"
          @click="applyForJob(job.id)"
          :disabled="hasApplied(job.id) && loggedInUser"
        >
          {{ hasApplied(job.id) && loggedInUser ? "Applied" : "Apply" }}
        </button>
      </div>
    </div>

    <h3 class="mt-4" v-if="loggedInUser">Your Applications</h3>
    <ul class="list-group" v-if="loggedInUser">
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
