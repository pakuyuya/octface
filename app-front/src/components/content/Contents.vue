<template>
  <div class="source-tree">
    <div class="repos-nav">
      <ReposLocalNav :owner="$route.params.owner" :repos="$route.params.repos"/>
    </div>
    <div class="repos-content">
      <div class="headers">
        <div class="headers-row header-row-repos">
          <div class="headers-item repos">
            {{ owner }} / {{ repos }}
          </div>
        </div>
        <div class="headers-row">
          <div class="headers-item branch">
            branch: <span class="branch-name">{{ ref }}</span>
          </div>
          <div class="download headers-item action">
            <a :href="urlzip" download>(download zip)</a>
          </div>
        </div>
        <div class="middle-hr"></div>
        <div class="headers-item path">
          / {{ path }}
        </div>
      </div>
      <div class="fileview">
        <div class="message" v-if="message">{{ message }}</div>
        <div class="files" v-if="contentType === 'dir'">
          <div class="files-wrapper">
            <ul>
              <li class="files-item" v-if="parentPath !== undefined">
                <router-link :to="{path: `/repos/${owner}/${repos}/contents/${parentPath}`}">←</router-link>
              </li>
              <li class="files-item" v-for="file in files" v-bind:key="file.node_id">
                <span class="files-item-icon">{{ file.icon }}</span>
                <router-link v-if="file.type === 'dir'"  :to="{path: `/repos/${owner}/${repos}/contents/${file.path}`}">{{file.name}}</router-link>
                <router-link v-if="file.type === 'file'" :to="{path: `/repos/${owner}/${repos}/contents/${file.path}`}">{{file.name}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="file" v-if="contentType === 'file'">
          <div class="contentview-backword">
            <router-link :to="{path: `/repos/${owner}/${repos}/contents/${parentPath}`}">←</router-link>
          </div>
          <div class="contentview-wrapper">
            <div class="contentview-header">size: {{ file.size }} bytes</div>
            <div class="contentview">{{ file.contentText }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReposLocalNav from '@/components/common/ReposLocalNav'
import apiSV from '@/service/apiSV'
import contentSV from '@/service/contentSV'

export default {
  name: 'SourceTree',
  components: {ReposLocalNav},
  data: () => ({
    contentType: 'none',
    file: {},
    files: [],
    owner: '',
    repos: '',
    path: '',
    pathParts: [],
    parentPath: undefined,
    ref: '',
    message: ''
  }),
  computed: {
    urlzip: function () {
      return contentSV.resolveUrl(`/download/${this.owner}/${this.repos}/zip/${this.ref}`)
    }
  },
  beforeMount: function () {
    this.applyUrledSetting(this.$route)
    this.showContent()
  },
  beforeRouteUpdate: function (to, from, next) {
    this.applyUrledSetting(to)
    this.showContent()
    next()
  },
  methods: {
    showContent: function () {
      let urlpath = `/repos/${this.owner}/${this.repos}/contents/${this.path}`
      let params = {
        ref: this.ref
      }

      apiSV.get(urlpath, params)
        .then((r) => {
          // response like
          // https://developer.github.com/v3/repos/contents/#response-if-content-is-a-file
          // or
          // https://developer.github.com/v3/repos/contents/#response-if-content-is-a-directory
          this.$nextTick(() => {
            let data = r.data
            if (data.message) {
              // error
              this.message = data.message
              this.contentType = 'none'
              this.file = {}
              this.files = []
              return
            }

            this.message = ''
            if (data.type === 'file') {
              this.contentType = 'file'
              this.file = data
              this.files = []

              // decode BASE64
              if (this.file.encoding === 'base64') {
                this.file.contentText = atob(this.file.content).trim()
              }
            } else {
              this.contentType = 'dir'
              this.file = {}
              this.files = this.adjustFiles(data)
            }

            this.updateDrawProps()
          })
        })
    },
    applyUrledSetting: function (route) {
      this.owner = route.params.owner
      this.repos = route.params.repos
      this.path = route.params.path || ''
      this.ref = route.query.ref || 'master'
    },
    updateDrawProps: function () {
      // parentPath
      if (this.path.lastIndexOf('/') >= 0) {
        this.parentPath = this.path.substring(0, this.path.lastIndexOf('/'))
      } else if (this.path !== '') {
        this.parentPath = ''
      } else {
        this.parentPath = undefined
      }

      // pathParts
      let pathParts = this.path.split('/')
      this.pathParts = pathParts.map((v, i) => ({ name: v, path: pathParts.slice(0, i).join('/') }))
    },
    adjustFiles: function (files) {
      return files.map((file) => (Object.assign(file, {
        icon: file.type === 'dir' ? '🗀' : '🗎'
      })))
    },
    downloadZip: function () {
      const url = contentSV.resolveUrl(`/download/${this.owner}/${this.repos}/archive/${this.ref}`)
      const a = document.createElement('a')
      a.setAttribute('download', '')
      a.setAttribute('href', url)

      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.middle-hr {
  height: 0px;
  margin: 10px 0px;
  border-top: 1px solid $sub2Color;
  max-width: 580px;
}

.source-tree {
  display: -webkit-flex;
  display: flex;
}
.repos-content {
  margin-left: 10px;
  width: calc(100% - 10px);
}
.headers {
}

.headers-row {
  display: -webkit-flex;
  display: flex;
  height: 20px;
  line-height: 20px;
  margin-top:8px;
  margin-bottom:8px;
}

.headers-item {
  margin-left: 3px;
  margin-right: 3px;
  height: 20px;
  line-height: 20px;
}

.header-row-repos {
  margin-right: 10px;
}
.repos {
  height: 20px;
  line-height: 20px;
  font-size: 22px;
}

.branch {
  font-size: 16px;
}

.branch-name {
  color : $sub1Color;
  padding: 3px;
  border-radius: 5px;
}

.download {
  font-size: 12px;
}

.path {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}

.fileview {
  margin-top: 20px;
}

.files-item {
  height: 28px;
  line-height:28px;
  font-size: 14px;
}

.files-item-icon {
  display: inline-block;
  height: 28px;
  width: 20px;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  margin-top: 4px;
  margin-bottom: 4px;

  color: $textColor;
}

.contentview-wrapper {
  border: 1px solid $sub2Color;
  border-radius: 3px;
}

.contentview-backword {
  margin-top: 10px;
  margin-bottom: 10px;
}

.contentview-header {
  border-radius: 3px 3px 0px 0px;
  background: $citationColor;
  color: $disabledTextColor;
  padding: 10px 8px;
  font-size: 12px;
  border-bottom: 1px solid $sub2Color;
}

.contentview {
  color: $citationTextColor;
  padding: 5px 8px;
  white-space: pre;

  font-size: 14px;
  line-height: 28px;
  min-width: 800px;

  font-family: "Consolas, 'Courier New', monospace";
}

</style>
