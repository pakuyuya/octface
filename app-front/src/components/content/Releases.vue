<template>
  <div class="releases">
    <div class="repos-nav">
      <ReposLocalNav :owner="$route.params.owner" :repos="$route.params.repos"/>
    </div>
    <div class="repos-content">
      <div class="headers">
        <div class="repos">
          {{ owner }} / {{ repos }}
        </div>
      </div>
      <pagination :isFirstPage="isFirstPage()" :isEndPage="isEndPage()"
                  :count="count" :page="page" :movePagewidth="movePagewidth" :pagesize="pagesize" :showCounter="false"
                  v-on:showPage="requestShowPage"/>

      <div class="release-wrapper">
        <div class="release" v-for="release in releases" v-bind:key="release.id">
          <h3 class="version">{{ release.name }}</h3>
          <div class="link">
            Downloads: <a :href="release.urlzip" download>zip</a> / <a :href="release.urltgz" download>tgz</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReposLocalNav from '@/components/common/ReposLocalNav'
import Pagination from '@/components/common/Pagination'
import apiSV from '@/service/apiSV'
import contentSV from '@/service/contentSV'

export default {
  name: 'Releases',
  components: {ReposLocalNav, Pagination},
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
    this.requestShowPage()
  },
  beforeRouteUpdate: function (to, from, next) {
    this.applyUrledSetting(to)
    this.requestShowPage()
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
    requestShowPage: function (page) {
      page = page || 1

      setTimeout(() => {
        let owner = this.owner || ''
        let repos = this.repos || ''

        let urlpath = `/repos/${owner}/${repos}/tags`
        let params = {
          page: page
        }

        apiSV.get(urlpath, params)
          .then((r) => {
            this.$nextTick(() => {
              let d = r.data
              this.releases = this.adjustReleases(d)
              this.count = d.length
              this.page = page
            })
          })
      }, 0)
    },
    adjustReleases: function (releases) {
      return releases.map(release => Object.assign(release, {
        urlzip: contentSV.resolveUrl(`/download/${this.owner}/${this.repos}/zip/${release.name}`),
        urltgz: contentSV.resolveUrl(`/download/${this.owner}/${this.repos}/tar.gz/${release.name}`)
      }))
    }
  }
}

</script>

<style lang="scss" scoped>
.releases {
  display: -webkit-flex;
  display: flex;
}
.repos-content {
  margin-left: 10px;
}

.release {
  display: -webkit-flex;
  display: flex;
  height: 28px;
  line-height:28px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.version {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
