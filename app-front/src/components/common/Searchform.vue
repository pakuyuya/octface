<template>
  <div class="search-form">
    <input type="search" v-model="text" v-on:keydown.enter="goSearch" class="search-text" placeholder="Search repository or user...">
    <button type="button" v-on:click="goSearch" class="search-button">search</button>
  </div>
</template>

<script>
export default {
  name: 'Searchform',
  components: {},
  data: function () {
    return {
      text: ``
    }
  },
  methods: {
    goSearch: function () {
      let url = convertGithubUrl(this.text)

      if (!url) {
        url = `/search/1?q=${encodeURI(this.text)}`
      }

      this.$router.push(url)
    }
  }
}

function convertGithubUrl (text) {
  let p = new RegExp('^https://github.com/([^/]+)/([^/]+)/?$')
  if (p.test(text)) {
    return text.replace(p, '/repos/$1/$2/contents/')
  }

  p = new RegExp('^https://github.com/([^/]+)/([^/]+)/releases/?$')
  if (p.test(text)) {
    return text.replace(p, '/repos/$1/$2/releases/')
  }

  return undefined
}
</script>

<style scoped lang="scss">
.search-form {
  vertical-align: middle;
}

.search-text {
  padding: 5px 8px;
  height: 24px;
  width: 450px;
  border: none;
}

.search-button {
  padding: 5px 8px;
  height: 24px;
  cursor: pointer;
  background: #eee;
  border: none;
  font-size: 10px;

  transition-duration: 0.3s;
  &:hover {
  font-size: 9px;
    color: #fff;
    background-color: #666;
  }
}

</style>
