import { ref, onMounted } from "vue";

export function useJobs() {
  const jobs = ref([]);
  const applications = ref([]);

  const loadJobs = () => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      jobs.value = JSON.parse(savedJobs);
    }
  };

  const saveJobs = () => {
    localStorage.setItem("jobs", JSON.stringify(jobs.value));
  };

  const loadApplications = () => {
    const savedApplications = localStorage.getItem("applications");
    if (savedApplications) {
      applications.value = JSON.parse(savedApplications);
    }
  };

  const saveApplications = () => {
    localStorage.setItem("applications", JSON.stringify(applications.value));
  };

  const addJob = (job) => {
    jobs.value.push(job);
    saveJobs();
  };

  const updateJob = (updatedJob) => {
    const index = jobs.value.findIndex((job) => job.id === updatedJob.id);
    if (index !== -1) {
      jobs.value[index] = updatedJob;
      saveJobs();
    }
  };

  const applyForJob = (jobId, applicant) => {
    const newApplication = {
      id: Date.now(),
      jobId: jobId,
      applicantId: applicant.id,
      email: applicant.email,
      appliedAt: new Date().toISOString(),
    };
    applications.value.push(newApplication);
    saveApplications();
  };

  const hasApplied = (jobId, applicantId) => {
    return applications.value.some(
      (app) => app.jobId === jobId && app.applicantId === applicantId
    );
  };

  onMounted(() => {
    loadJobs();
    loadApplications();
  });

  return {
    jobs,
    applications,
    addJob,
    updateJob,
    applyForJob,
    hasApplied,
  };
}


