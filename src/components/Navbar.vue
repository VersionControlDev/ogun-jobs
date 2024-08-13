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
                      <li><router-link to="/about">About</router-link></li>
                      <li>
                        <router-link to="/find-jobs">Find a Jobs </router-link>
                      </li>
                      <li>
                        <router-link>Page</router-link>
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
                      <li><router-link to="/contact">Contact</router-link></li>
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
              <div class="mobile_menu d-block d-lg-none">
                <div class="slicknav_menu">
                  <button
                    @click="toggleMenu"
                    aria-haspopup="true"
                    role="button"
                    tabindex="0"
                    class="slicknav_btn"
                    :class="{ slicknav_collapsed: !isMenuOpen }"
                  >
                    <span class="slicknav_menutxt">MENU</span>
                    <span class="slicknav_icon">
                      <span class="slicknav_icon-bar"></span>
                      <span class="slicknav_icon-bar"></span>
                      <span class="slicknav_icon-bar"></span>
                    </span>
                  </button>
                  <ul
                    class="slicknav_nav"
                    :class="{ slicknav_hidden: !isMenuOpen }"
                    aria-hidden="true"
                    role="menu"
                  >
                    <li>
                      <router-link
                        to="/"
                        @click="closeMenu"
                        role="menuitem"
                        tabindex="-1"
                        >Home</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/about"
                        @click="closeMenu"
                        role="menuitem"
                        tabindex="-1"
                        >About</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/find-jobs"
                        @click="closeMenu"
                        role="menuitem"
                        tabindex="-1"
                        >Find a Job</router-link
                      >
                    </li>
                    <li class="slicknav_collapsed slicknav_parent">
                      <router-link
                        to="/"
                        @click="toggleSubmenu"
                        role="menuitem"
                        aria-haspopup="true"
                        tabindex="-1"
                        class="slicknav_item slicknav_row"
                      >
                        <router-link tabindex="-1">Page</router-link>
                        <span class="slicknav_arrow">{{
                          isSubmenuOpen ? "-" : "+"
                        }}</span>
                      </router-link>
                      <ul
                        class="submenu"
                        :class="{ slicknav_hidden: !isSubmenuOpen }"
                        role="menu"
                        aria-hidden="true"
                      >
                        <li>
                          <router-link
                            to="/blog"
                            @click="closeMenu"
                            role="menuitem"
                            tabindex="-1"
                            >Blog</router-link
                          >
                        </li>
                        <li>
                          <router-link
                            to="/blog-details"
                            @click="closeMenu"
                            role="menuitem"
                            tabindex="-1"
                            >Blog Details</router-link
                          >
                        </li>
                        <li>
                          <router-link
                            to="/elements"
                            @click="closeMenu"
                            role="menuitem"
                            tabindex="-1"
                            >Elements</router-link
                          >
                        </li>
                        <li>
                          <router-link
                            to="/job-details"
                            @click="closeMenu"
                            role="menuitem"
                            tabindex="-1"
                            >Job Details</router-link
                          >
                        </li>
                      </ul>
                    </li>
                    <li>
                      <router-link
                        to="/contact"
                        @click="closeMenu"
                        role="menuitem"
                        tabindex="-1"
                        >Contact</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header End -->
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
const isSubmenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const toggleSubmenu = () => {
  isSubmenuOpen.value = !isSubmenuOpen.value;
};
</script>

<style scoped>
.slicknav_menu {
  position: relative;
}

.slicknav_btn {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
}

.slicknav_nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.slicknav_hidden {
  display: none;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.slicknav_arrow {
  margin-left: 5px;
}
</style>