<script>
import TopBar from '@components/top-bar'
import NavBar from '@components/nav-bar'
import RightBar from '@components/right-bar'
import Footer from '@components/footer'

export default {
  components: { TopBar, NavBar, RightBar, Footer },
  data() {
    return {
      isMenuOpened: false,
      user: this.$store ? this.$store.state.auth.currentUser : {} || {},
    }
  },
  created: () => {
    document.body.classList.remove('authentication-bg')
  },
  methods: {
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    },
    toggleRightSidebar() {
      document.body.classList.toggle('right-bar-enabled')
    },
  },
}
</script>

<template>
  <div>
    <header id="topnav">
      <TopBar :user="user" />
      <NavBar :is-menu-opened="isMenuOpened" />
    </header>

    <div class="wrapper">
      <div class="container-fluid">
        <slot />
      </div>
    </div>
    <Footer />
    <RightBar />
  </div>
</template>
