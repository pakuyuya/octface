<template>
  <div class="gnav">
    <div class="logo">
      octface
    </div>
    <div class="search-wrapper gnav-item">
      <searchform/>
    </div>
  </div>
</template>

<script>
import Searchform from '@/components/common/Searchform'

export default {
  name: 'Gnav',
  components: { Searchform }
}
</script>

<style scoped>
.gnav {
  display: -webkit-flex;
  display: flex;
  padding-top: 10px;
  height: 30px;
  padding-bottom: 8px;
  background: #101319;
}

.logo {
  padding-left: 20px;
  padding-top: 4px;
  font-size: 16px;
  color: #f0f0e8;
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
