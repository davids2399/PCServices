<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    <p>This is index</p>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  created () {
    console.log(this.$store)
  }
}
</script>
