<template>
  <div class="search">
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
    <div class="list">
      <div class="list-item" v-for="item in items" v-bind:key="item.id">
        <div class="list-link">
          <router-link :to="{path: `/repos/${item.owner.login}/${item.name}/contents/`}">{{item.full_name}}</router-link>
        </div>
        <div class="list-description">
          <span>{{ item.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiSV from '@/service/apiSV'

export default {
  name: 'Search',
  data: () => ({
    items: [],
    count: 0,
    pagesize: 30,
    from: 1,
    page: 1,
    movePagewidth: 11
  }),
  beforeMount: function () {
    this.showPage()
  },
  beforeRouteUpdate: function (to, from, next) {
    this.showPage()
  },
  methods: {
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
      let q = this.$route.query.q || ''
      if (!q) {
        return
      }

      let urlpath = '/search/repositories'
      let params = {
        q: q,
        page: page
      }

      apiSV.get(urlpath, params)
        .then((r) => {
          this.$nextTick(() => {
            let d = r.data
            this.items = d.items
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
</script>

<style scoped lang="scss">
.control-wrapper {
  display: -webkit-flex;
  display: flex;
  height: 32px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.control-wrapper-item {
  height: 30px;
  line-height: 30px;
}
.pagenation {
  display: -webkit-flex;
  display: flex;
}

.pagenation-item {
  display: inline-box;
  width: 30px;
  margin-left: 4px;
  margin-right: 4px;
  vertical-align: middle;
  text-align: center;

  &:hover {
    background: $sub1Color;
    color: $primaryTextColor;

    cursor: pointer;
  }

  &.disabled {
    color: $disabledTextColor;

    &:hover {
      background: transparent;
      color: $disabledTextColor ;

      cursor: default;
    }
  }

  &.page {
    &.active {
      background: $sub1Color;
      color: $primaryTextColor;
    }
  }
}

.indicator {
  margin-left: 20px;
  color: $sub1Color;
}

.list {
  margin-top: 8px;
}

.list-item {
  display: -webkit-flex;
  display: flex;
  line-height:38px;
  font-size: 16px;
}

.list-item:not(:first-child) {
  height: 38px;
  border-top: solid 1px $sub2Color;
}

.list-link {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list-description {
  color: $sub1Color;
  margin-left: 18px;
  max-width: 580px;
  height: 38px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
