<template>
  <input type="search" v-model="text" class="search-form" placeholder="Search repository or user...">
</template>

<script>
export default {
  name: 'Searchform',
  components: {},
  data: function () {
    return {
      text: ''
    }
  }
}
</script>

<style scoped>
</style>

<style>

.search-form {
  padding: 5px 8px;
  width: 450px;
}
</style>
