<template>
  <div class="pagination-wrapper">
    <ul class="pagination pagination-wrapper-item">
      <li v-on:click="showFirst" class="pagination-item cursor" v-bind:class="{ disabled: isFirstPage }">&laquo;</li>
      <li v-on:click="showPrev" class="pagination-item cursor" v-bind:class="{ disabled: isFirstPage }">&lt;</li>
      <li v-on:click="showPage(p)" class="pagination-item page" v-bind:class="{ active: p === page }" v-for="p in getShownPages()" v-bind:key="p">{{ p }}</li>
      <li v-on:click="showNext" class="pagination-item cursor" v-bind:class="{ disabled: isEndPage }">&gt;</li>
      <li v-on:click="showEnd" class="pagination-item cursor" v-bind:class="{ disabled: isEndPage }">&raquo;</li>
    </ul>
    <div class="indicator pagination-wrapper-item" v-if="showCounter">
      found {{ count }} entries.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  components: {},
  props: ['count', 'pagesize', 'from', 'page', 'movePagewidth', 'isFirstPage', 'isEndPage', 'showCounter'],
  methods: {
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
    getEndIndex: function () {
      return ~~(this.count / this.pagesize) + 1
    },
    showFirst: function () {
      this.showPage(1)
    },
    showPrev: function () {
      this.showPage(Math.max(this.page - 1, 1))
    },
    showPage: function (page) {
      this.$emit('showPage', page)
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
.pagination-wrapper {
  display: -webkit-flex;
  display: flex;
  height: 32px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.pagination-wrapper-item {
  height: 30px;
  line-height: 30px;
}

.pagination {
  display: -webkit-flex;
  display: flex;
}

.pagination-item {
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
</style>
