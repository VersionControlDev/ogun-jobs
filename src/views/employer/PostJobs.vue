<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const showJobForm = ref(false);
const jobForm = ref({
  title: "",
  description: "",
  location: "",
  salary: "",
  job_type: "",
  date: "",
});
const jobs = ref([]);
const applications = ref([]);
const selectedJob = ref(null);
const editingJob = ref(null);

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

const saveJob = () => {
  if (editingJob.value) {
    // Update existing job
    const index = jobs.value.findIndex((job) => job.id === editingJob.value.id);
    if (index !== -1) {
      jobs.value[index] = { ...editingJob.value, ...jobForm.value };
      toast.success("Job updated successfully");
    }
  } else {
    // Create new job
    const job = {
      id: Date.now(),
      employerId: loggedInUser.id,
      ...jobForm.value,
    };
    jobs.value.push(job);
    toast.success("New job posted successfully");
  }
  localStorage.setItem("jobs", JSON.stringify(jobs.value));
  resetForm();
};

const editJob = (job) => {
  editingJob.value = job;
  jobForm.value = { ...job };
  showJobForm.value = true;
};

const deleteJob = (jobId) => {
  if (confirm("Are you sure you want to delete this job?")) {
    jobs.value = jobs.value.filter((job) => job.id !== jobId);
    localStorage.setItem("jobs", JSON.stringify(jobs.value));
    // Also delete associated applications
    applications.value = applications.value.filter(
      (app) => app.jobId !== jobId
    );
    localStorage.setItem("applications", JSON.stringify(applications.value));
    toast.success("Job deleted successfully");
  }
};

const cancelEdit = () => {
  resetForm();
};

const resetForm = () => {
  showJobForm.value = false;
  editingJob.value = null;
  jobForm.value = {
    title: "",
    description: "",
    location: "",
    salary: "",
    date: "",
  };
};

const postedJobs = computed(() => {
  return jobs.value.filter((job) => job.employerId === loggedInUser.id);
});

const getApplicantCount = (jobId) => {
  return applications.value.filter((app) => app.jobId === jobId).length;
};

const viewApplicants = (jobId) => {
  selectedJob.value = jobs.value.find((job) => job.id === jobId);
};

const selectedJobApplicants = computed(() => {
  if (!selectedJob.value) return [];
  return applications.value.filter((app) => app.jobId === selectedJob.value.id);
});
</script>

<template>
  <div>
    <h2>Employer Dashboard</h2>
    <button
      class="btn btn-primary mb-3"
      @click="
        showJobForm = true;
        editingJob = null;
      "
    >
      Post New Job
    </button>

    <div v-if="showJobForm" class="card mb-3 shadow rounded">
      <div class="card-body">
        <h5 class="card-title">
          {{ editingJob ? "Edit Job" : "Post New Job" }}
        </h5>
        <form @submit.prevent="saveJob">
          <div class="mb-3">
            <label for="title" class="form-label">Job Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="jobForm.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Job Description</label>
            <textarea
              class="form-control"
              id="description"
              v-model="jobForm.description"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Job Location</label>
            <select class="form-control" v-model="jobForm.location">
              <option value="Lagos">Lagos</option>
              <option value="Ogun">Ogun</option>
              <option value="Osun">Osun</option>
              <option value="Osun">Anywhere</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Job Salary</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="jobForm.salary"
              required
            />
          </div>
          <div>
            <label for="title" class="form-label">Job Type</label>
            <select class="form-control mb-3" v-model="jobForm.job_type">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Part Time">Remote</option>
              <option value="Part Time">Freelance</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Job Date</label>
            <input
              type="date"
              class="form-control"
              id="title"
              v-model="jobForm.date"
              required
            />
          </div>
          <button type="submit" class="btn btn-success">
            {{ editingJob ? "Update Job" : "Post Job" }}
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="cancelEdit"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>

    <h3>Your Posted Jobs</h3>
    <div v-for="job in postedJobs" :key="job.id" class="single-job-items mb-30">
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
      <div class="p-2">
        <button class="btn btn-info me-2" @click="viewApplicants(job.id)">
          View Applicants ({{ getApplicantCount(job.id) }})
        </button>
        <button class="btn btn-warning me-2" @click="editJob(job)">Edit</button>
        <button class="btn btn-danger" @click="deleteJob(job.id)">
          Delete
        </button>
      </div>
    </div>

    <div v-if="selectedJobApplicants.length > 0" class="mt-4">
      <h3>Applicants for {{ selectedJob?.title }}</h3>
      <ul class="list-group">
        <li
          v-for="applicant in selectedJobApplicants"
          :key="applicant.id"
          class="list-group-item"
        >
          {{ applicant.email }} - Applied on
          {{ new Date(applicant.appliedAt).toLocaleDateString() }}
        </li>
      </ul>
    </div>
  </div>
</template>
