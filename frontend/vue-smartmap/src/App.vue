<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
  <header>
    <div class="wrapper">
      <div id="nav">
        <nav class="container navbar fixed-top navbar-expand-lg navbar-light">
          <div class="logo">
            <a href="#">
              <img src="@/assets/UtopiaLogo.png" alt="Logo" width="50" height="50">
            </a>
          </div>
         
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav mr-auto">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/login">Login</RouterLink>
              <RouterLink v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</RouterLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>

  <div>
    <RouterView @authenticated="setAuthenticated" />
  </div>

  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "home" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>

<style>
@import '@/assets/base.css';
@import '@/styles/Variables.css';
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

#app {
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  background-color: var(--primary-blue);
  font-family: 'Raleway', sans-serif;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  background-color: white;
}

#navbarSupportedContent {
  display: flex;
  justify-content: flex-end;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  background-color: gray;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: block;
    display: flex;
    place-items: center;
  }

  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
