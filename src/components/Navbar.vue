<template>
  <header>
    <!-- Header Start -->
    <div class="header-area header-transparrent">
      <div class="headder-top header-sticky">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-3 col-md-2">
              <!-- Logo -->
              <div class="logo">
                <router-link to="/">
                  <img
                    style="width: 20%"
                    src="/assets/img/logo/EzpXe5xWYAAkpqo.jpg"
                    alt=""
                  />
                </router-link>
              </div>
            </div>
            <div class="col-lg-9 col-md-9">
              <div class="menu-wrapper">
                <!-- Main-menu -->
                <div class="main-menu">
                  <nav class="d-none d-lg-block">
                    <ul id="navigation">
                      <li><router-link to="/">Home</router-link></li>
                      <li>
                        <router-link to="/find-jobs">Find a Jobs </router-link>
                      </li>
                      <li><router-link to="/about">About</router-link></li>
                      <li>
                        <a href="#">Page</a>
                        <ul class="submenu">
                          <li><router-link to="/blog">Blog</router-link></li>
                          <li>
                            <router-link to="/single-blog"
                              >Blog Details</router-link
                            >
                          </li>
                          <li>
                            <router-link to="/elements">Elements</router-link>
                          </li>
                          <li>
                            <router-link to="/job-details"
                              >Job Details</router-link
                            >
                          </li>
                        </ul>
                      </li>
                      <router-link to="/contact">Contact</router-link>
                    </ul>
                  </nav>
                </div>
                <!-- Header-btn -->
                <div class="header-btn d-none f-right d-lg-block">
                  <router-link to="/register" class="btn head-btn1"
                    >Register</router-link
                  >
                  <router-link to="/login" class="btn head-btn2"
                    >Login</router-link
                  >
                </div>
              </div>
            </div>
            <!-- Mobile Menu -->
            <div class="col-12">
              <div class="mobile_menu d-block d-lg-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header End -->
  </header>
</template>

<script setup>

</script>

<style></style>
