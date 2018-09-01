<template>
  <div class="source-tree">
    {{owner}} / {{repos}}
    <div class="repos-nav">
      <ReposLocalNav :owner="$route.params.owner" :repos="$route.params.repos"/>
    </div>
    <div class="repos-content">
    </div>
  </div>
</template>

<script>
import ReposLocalNav from '@/components/common/ReposLocalNav'

export default {
  name: 'SourceTree',
  components: {ReposLocalNav},
  data: () => ({
    owner: '',
    repos: ''
  })
}
</script>

<style scoped>
.source-tree {
  display: -webkit-flex;
  display: flex;
}
</style>
