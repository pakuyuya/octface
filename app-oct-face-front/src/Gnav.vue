<template>
  <div class="gnav">
    <div class="search-wrapper gnav-item">
      <search/>
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'Gnav',
  components: { Search }
}
</script>

<style scoped>
.gnav {
  padding-top: 10px;
  height: 30px;
  padding-bottom: 8px;
  background: #101319;
}

.gnav-item {
  height: 28px;
  margin-left: 8px;
  margin-right: 10px;
}

.gnav-item:first {
  margin-left: 20px;
}

</style>
