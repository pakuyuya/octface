<template>
  <div id="app">
    <div class="gnav-wrapper">
      <gnav/>
    </div>
    <div class="content-wrapper">
      <router-view/>
    </div>
    <div class="icon-loading" v-show="loading">
      <img src="./assets/icon_loader_f_ww_01_s1.gif">
    </div>
  </div>
</template>

<script>
import Gnav from './Gnav'
import Loading from './jsgui/loading'

export default {
  name: 'App',
  components: {Gnav},
  data: () => ({
    loading: false
  }),
  mounted: function () {
    Loading.addStartEventGlobal(() => { this.startLoading() })
    Loading.addStopEventGlobal(() => { this.stopLoading() })
  },
  methods: {
    startLoading: function () {
      this.loading = true
    },
    stopLoading: function () {
      this.loading = false
    }
  }
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
  margin-top: 25px;
  margin-left: 25px;
}
.icon-loading {
  position: absolute;
  width: 25px;
  height: 25px;
  left: calc(50% - 12px);
  top: 350px;
}
</style>
