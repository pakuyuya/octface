<template>
  <input type="search" class="search-form" placeholder="Search repository or user...">
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      list : []
    }
  }
}
</script>

<style scoped>
.search-form {
  padding : 5px 8px;
}
</style>
