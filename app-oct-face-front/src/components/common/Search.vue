<template>
  <div>
    <input type="search" v-model="text" class="search-form" placeholder="Search repository or user...">
  </div>
</template>

<script>
export default {
  name: 'Search',
  components: {},
  data: function () {
    return {
      list: [
        {title: 'user1', to: '/user1/'},
        {title: 'user1repo1', to: '/user1/repo1/source'}
      ],
      chosen: '',
      autoCompleteStyle: {
        inputWrapper: 'search-wrapper',
        defaultInput: 'form-control',
        suggestions: 'z-1000',
        suggestItem: 'search-item'
      }
    }
  }
}
</script>

<style scoped>
</style>

<style>

.search-wrapper input {
  padding: 5px 8px;
  width: 450px;
}
</style>
