<template>
  <div class="search">
    <div class="control-wrapper">
      <ul>
        <li v-on:click="showFirst" class="{{isFirstPage ? 'disabled' : ''}}">&laquo;</li>
        <li v-on:click="showPrev" class="{{isFirstPage ? 'disabled' : ''}}">&lt;</li>
        <li v-on:click="showPage(page)" class="{{page === crtPage ? 'active' : ''}}" v-for="page in getShownPages" v-bind:key="page"></li>
        <li v-on:click="showNext" class="{{isNextPage ? 'active' : ''}}">&gt;</li>
        <li v-on:click="showNext" class="{{isNextPage ? 'active' : ''}}">&raquo;</li>
      </ul>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in items" v-bind:key="item.id"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: () => {
    return {
      items: [],
      count: 0,
      pagesize: 20,
      crtPage: 1,
      from: 1,
      page: 1,
      movePagewidth: 11,
    }
  },
  methods: {
    isFirstPage: function () {
      return page === 1
    },
    isEndPage: function () {
      return page === this.getEndIndex()
    },
    getEndIndex: function () {
      return ~~(count/pagesize)+1
    },
    getShownPages: function () {
      let crt = this.crtPage

      let width = this.movePagewidth
      let widthdec = width - 1

      let first = crt - ~~(widthdec/2)
      let end = crt + ~~(widthdec/2) + (widthdec & 1)
      
      if (end > this.getEndIndex) {
        first = end - this.movePagewidth - 1
      }
      if (first < 1) {
        first = 1
      }
      
      return Array.from(Array(width), (v, k) => k + first)
    },
    showPage: function (page) {
      // TODO:      
    }
  }
}
</script>

<style scoped>
</style>
