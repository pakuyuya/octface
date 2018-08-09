<template>
  <link rel="stylesheet" href="assets/reset.css"/>
  <div id="app">
    <div class="gnav-wrapper">
      <gnav/>
    </div>
    <div class="content-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Gnav from './Gnav';

export default {
  name: 'App',
  components : {Gnav}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.gnav-wrapper {
}

.content-wrapper {
}
</style>
