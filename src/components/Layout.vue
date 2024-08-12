<template>
  <div>
    <Navbar />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "./Footer.vue";
import Navbar from "./Navbar.vue";
</script>

<style></style>
