<template>
  <div class="row justify-center align-middle">
    <engineer-create />
  </div>
</template>

<script>
import engineerCreate from '../components/engineers/engineerCreate'
export default {
  name: 'PageIndex',
  components: {
      engineerCreate
  }
}
</script>
