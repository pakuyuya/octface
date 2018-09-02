<template>
  <div class="source-tree">
    <div class="repos-nav">
      <ReposLocalNav :owner="$route.params.owner" :repos="$route.params.repos"/>
    </div>
    <div class="repos-content">
      <div class="headers">
        <div class="repos">
          {{ owner }} / {{ repos }}
        </div>
        <div class="branch">
          branch: {{ ref }}
        </div>
        <div class="path">
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
              <li class="files-item" v-for="file in files" v-bind:key="file.name">
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
            <div class="contentview">
              {{ file.contentText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReposLocalNav from '@/components/common/ReposLocalNav'
import apiSV from '@/service/apiSV'

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
  beforeMount: function () {
    this.loadUrledSetting(this.$route)
    this.showContent()
  },
  beforeRouteUpdate: function (to, from, next) {
    this.loadUrledSetting(to)
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
                this.file.contentText = atob(this.file.content)
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
    loadUrledSetting: function (route) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.source-tree {
  display: -webkit-flex;
  display: flex;
}
.repos-content {
  margin-left: 10px;
}

.repos {
  height: 20px;
  line-height: 20px;
  font-size: 22px;
}

.branch {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
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

.contentview-backword {
  margin-top: 10px;
  margin-bottom: 10px;
}

.contentview {
  border-left: 5px solid $sub1Color;
  background: $citationColor;
  color: $citationTextColor;
  padding: 20px 15px;
  font-size: 14px;
  line-height: 28px;
  min-width: 800px;

  font-family: "Consolas, 'Courier New', monospace";
}

</style>
