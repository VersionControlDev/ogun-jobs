<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import router from '../router';
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';

export default {
    components: {
        Navbar,
        Footer
    }
}
</script>

<style>

</style>