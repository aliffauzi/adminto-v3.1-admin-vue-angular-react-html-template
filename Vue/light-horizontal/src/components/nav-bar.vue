<script>
import { authComputed } from '@state/helpers'

export default {
  components: {},
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    isMenuOpened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...authComputed,
  },
  methods: {
    onMenuClick(event) {
      event.preventDefault()
      const nextEl = event.target.nextSibling
      if (nextEl && !nextEl.classList.contains('open')) {
        const parentEl = event.target.parentNode
        if (parentEl) {
          parentEl.classList.remove('open')
        }

        nextEl.classList.add('open')
      } else if (nextEl) {
        nextEl.classList.remove('open')
      }
      return false
    },
  },
}
</script>

<template>
  <!-- Topbar Start -->
  <div class="topbar-menu">
    <div class="container-fluid">
      <b-collapse
        id="navigation"
        v-model="isMenuOpened"
      >
        <!-- Navigation Menu-->
        <ul class="navigation-menu">

          <li class="has-submenu active">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="mdi mdi-view-dashboard"></i>Dashboard</a>
          </li>

          <li class="has-submenu">
            <a
              href="#"
              @click="onMenuClick"
            >
              <i class="mdi mdi-share-variant"></i>Menu Levels <div class="arrow-down"></div>
            </a>
            <ul class="submenu">
              <li>
                <router-link
                  tag="a"
                  to="/l"
                >Level 1.1</router-link>
              </li>
              <li class="has-submenu">
                <a
                  href="#"
                  @click="onMenuClick"
                >Level 1.2 <div class="arrow-down"></div></a>
                <ul class="submenu">
                  <li>
                    <router-link
                      tag="a"
                      to="/l2"
                    >Level 2.1</router-link>
                  </li>
                  <li>
                    <router-link
                      tag="a"
                      to="/l22"
                    >Level 2.2</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <!-- End navigation menu -->

        <div class="clearfix"></div>
      </b-collapse>
      <!-- end #navigation -->
    </div>
    <!-- end container -->
  </div>
  <!-- end navbar-custom -->
</template>

<style lang="scss">
</style>
