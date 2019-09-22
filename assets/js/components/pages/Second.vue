<template>
  <div class="hello">
     <div v-html="getNumber"></div>

  </div>
</template>

<script>
  export default {
    name: 'Second',
    computed: {
      getNumber() {
        return this.$store.getters.NUMBER;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
