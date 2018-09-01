<template>
  <div class="repos-localnav">
    <ul class="localnav">
      <li class="localnav-item">
        <router-link :to="{path: '/tree/' + owner + '/' + repos}">Source</router-link>
      </li>
      <li class="localnav-item">
        <router-link :to="{path: '/releases/' + owner + '/' + repos}">Releases</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ReposLocalNav',
  props: {
    owner: '',
    repos: ''
  }
}
</script>

<style lang="scss" scoped>
.repos-localnav {
  width: 180px;
}

.localnav {
  margin-left: 18px;
}

.localnav-item {
  a {
    padding-left: 10px;
    display: block;
    height: 30px;
    line-height: 30px;
    margin-top: 8px;
    margin-bottom: 8px;

    font-size: 16px;

    &:hover {
      background: $sub1Color;
      color: $primaryTextColor;
    }
  }
}

</style>
