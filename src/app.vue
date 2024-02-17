<template>
  <div class="w-100 vh-100 d-flex flex-column bg-dark text-light">
    <div class="flex-grow-1 d-flex justify-content-center">
      <router-view/>
    </div>
    <div class="w-100 text-end p-2 small">&copy; Bugbird Co. 2024 | v{{ version }}</div>
  </div>
</template>

<script lang="ts" setup>
//== GENERAL IMPORTS ==//
import {version} from '../package.json'

//== COMPONENT IMPORT ==//

//== TYPES & INTERFACES ==//

//== STORE IMPORT ==//

//== INJECT & PROPS & EMITS =//

//== STORE BINDING ==//

//== DATA & STATE ==//

//== COMPUTED ==//

//== WATCHER ==//

//== PROVIDE ==//

//== LIFECYCLE HOOK ==//

//== METHOD ==//

//== EXPOSE ==//

</script>

<style lang="scss">

</style>
