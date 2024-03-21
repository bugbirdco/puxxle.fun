<template>
  <div class="w-100 vh-100 screen-w d-flex flex-column game">
    <nav class="navbar row row-cols-3 g-0 px-3">
      <div class="col"/>
      <a class="col text-center navbar-brand mx-0" href="/">
        <h2 class="mb-0">Pu<span class="text-green">x</span><span class="text-red">x</span>le</h2>
      </a>
      <div class="col text-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a v-if="!uAuth" class="nav-link disabled" href="#">
              Login
            </a>
            <a v-else-if="uAuth?.authed" class="nav-link" href="#" @click.prevent="uAuth?.dashboard()">
              Dashboard
            </a>
            <a v-else class="nav-link" href="#" @click.prevent="login">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex-grow-1 d-flex justify-content-center">
      <router-view/>
    </div>
    <div class="w-100 text-end p-2 small">v{{ version }} &copy; Bugbird Co. 2024</div>
  </div>
</template>

<script lang="ts" setup>
//== GENERAL IMPORTS ==//
import {version} from '../package.json'
import {onBeforeMount, ref} from "vue";

//== COMPONENT IMPORT ==//

//== TYPES & INTERFACES ==//

//== STORE IMPORT ==//
import {useAppStore} from "@/stores/app";
import type {UniversleAuth} from "@universle/sdk/src";

//== INJECT & PROPS & EMITS =//

//== STORE BINDING ==//
const appStore = useAppStore()

//== DATA & STATE ==//
const uAuth = ref<UniversleAuth>()

//== COMPUTED ==//

//== WATCHER ==//

//== PROVIDE ==//

//== LIFECYCLE HOOK ==//
onBeforeMount(() => {
  appStore.universle.auth().then(v => uAuth.value = v)

  window.visualViewport?.addEventListener('resize', () => {
    const container = document.querySelector('.game')
    container?.scrollTo({top: container.scrollHeight, behavior: 'smooth'})
  })
})

//== METHOD ==//
async function login() {
  if (!uAuth.value) return
  try {
    await uAuth.value?.login()
  } finally {
    uAuth.value = await uAuth.value?.check()
  }
}

//== EXPOSE ==//

</script>

<style lang="scss">
@import "./styles/colours";

:root {
  --bs-body-color: #{$text} !important;
  --bs-body-bg: #{$bg} !important;
  --bs-secondary: #{$grey} !important;
  --bs-success: #{$green} !important;
  --bs-warning: #{$yellow} !important;
  --bs-danger: #{$red} !important;
}

.btn-success {
  --bs-btn-bg: var(--bs-success) !important;
  --bs-btn-border-color: var(--bs-success) !important;
}

.text-green {
  color: $green
}

.text-yellow {
  color: $yellow
}

.text-red {
  color: $red
}

.screen-w {
  max-width: 100vw;
  overflow-x: hidden;
}

.game {
  font-family: "Karla", sans-serif;
  background-color: $bg;
  color: $text;
}

.navbar {
  color: $grey;
  background-color: $bg;
  border-bottom: 1px solid $grey;

  .navbar-brand, .nav-link {
    color: $text !important;
  }

  .navbar-brand {
    transition: all 0.1s ease;

    &:hover {
      transform: scale(1.05) rotate(.5deg);
    }
  }
}

.modal {
  .modal-content {
    color: $text;
    background-color: $bg;
    box-shadow: -1px 0 0 100vmax rgba(0, 0, 0, .6);
  }
}
</style>
