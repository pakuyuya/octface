<template>
  <div class="releases">
    r
    <div class="control-wrapper">
      <ul class="pagenation control-wrapper-item">
        <li v-on:click="showFirst" class="pagenation-item cursor" v-bind:class="{ disabled: isFirstPage() }">&laquo;</li>
        <li v-on:click="showPrev" class="pagenation-item cursor" v-bind:class="{ disabled: isFirstPage() }">&lt;</li>
        <li v-on:click="showPage(p)" class="pagenation-item page" v-bind:class="{ active: p === page }" v-for="p in getShownPages()" v-bind:key="p">{{ p }}</li>
        <li v-on:click="showNext" class="pagenation-item cursor" v-bind:class="{ disabled: isEndPage() }">&gt;</li>
        <li v-on:click="showEnd" class="pagenation-item cursor" v-bind:class="{ disabled: isEndPage() }">&raquo;</li>
      </ul>
      <div class="indicator control-wrapper-item" v-if="count > 1">
        found {{ count }} entries.
      </div>
    </div>
    <div class="release" v-for="release in releases" v-bind:key="release.id">
      <h3 class="version">{{ release.tag_name }}</h3>
      <div class="link">
        <a :href="release.urlzip" download>zip</a>
        <a :href="release.urltgz" download>tgz</a>
      </div>
    </div>
  </div>
</template>

<script>
import apiSV from '@/service/apiSV'

export default {
  name: 'Releases',
  data: () => ({
    releases: [],
    count: 0,
    pagesize: 30,
    from: 1,
    page: 1,
    movePagewidth: 11,
    owner: '',
    repos: ''
  }),
  beforeMount: function () {
    this.applyUrledSetting(this.$route)
    this.showPage()
  },
  beforeRouteUpdate: function (to, from, next) {
    this.applyUrledSetting(to)
    this.showPage()
  },
  methods: {
    applyUrledSetting: function (route) {
      this.owner = route.params.owner
      this.repos = route.params.repos
    },
    isFirstPage: function () {
      return this.page === 1
    },
    isEndPage: function () {
      return this.page === this.getEndIndex()
    },
    getEndIndex: function () {
      return ~~(this.count / this.pagesize) + 1
    },
    getShownPages: function () {
      let crt = this.page

      let width = this.movePagewidth
      let widthdec = width - 1

      let first = crt - ~~(widthdec / 2)
      let end = crt + ~~(widthdec / 2) + (widthdec & 1)

      if (end > this.getEndIndex()) {
        end = this.getEndIndex()
        first = end - this.movePagewidth - 1
      }
      if (first < 1) {
        first = 1
        end = Math.min(this.getEndIndex(), this.movePagewidth)
      }
      width = end - first + 1
      return Array.from(Array(width), (v, k) => k + first)
    },
    showFirst: function () {
      this.showPage(1)
    },
    showPrev: function () {
      this.showPage(Math.max(this.page - 1, 1))
    },
    showPage: function (page) {
      page = page || 1
      let owner = this.owner || ''
      let repos = this.repos || ''

      let urlpath = `/repos/${owner}/${repos}/releases`
      let params = {
        page: page
      }

      apiSV.get(urlpath, params)
        .then((r) => {
          this.$nextTick(() => {
            let d = r.data
            this.releases = adjustReleases(d.releases)
            this.count = d.total_count
            this.page = page
          })
        })
    },
    showNext: function () {
      this.showPage(Math.min(this.page + 1, this.getEndIndex()))
    },
    showEnd: function () {
      this.showPage(this.getEndIndex())
    }
  }
}

var adjustReleases = function (releases) {
  return releases.map(release => Object.assign(release, {
    urlzip: apiSV.resolveUrl(`/content/download/${this.owner}/${this.repos}/zip/${release.tag_name}`),
    urltgz: apiSV.resolveUrl(`/content/download/${this.owner}/${this.repos}/tar.gz/${release.tag_name}`)
  }))
}
</script>

<style scoped>
</style>
