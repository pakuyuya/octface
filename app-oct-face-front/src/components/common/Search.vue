<template>
  <div>
    <vue-simple-suggest
      class="search-form"
      placeholder="Search repository or user..."
      v-model="chosen"
      :list="list"
      :styles="autoCompleteStyle"
      :destyled=true
      :filter-by-query="true">
      <div slot="suggestion-item" slot-scope="{ suggestion, query }">
        <div><router-link :to="suggestion">{{ suggestion }}</router-link></div>
      </div>
    </vue-simple-suggest>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import apiSV from '@/service/apiSV'

export default {
  name: 'Search',
  components: {VueSimpleSuggest},
  data: function () {
    return {
      list: ['a', 'b'],
      chosen: '',
      autoCompleteStyle: {
        inputWrapper: 'search-wrapper',
        defaultInput: 'form-control',
        suggestions: 'z-1000',
        suggestItem: 'search-item'
      }
    }
  }
}
</script>

<style scoped>
</style>

<style>

.search-wrapper input {
  padding: 5px 8px;
  width: 450px;
}
.suggestions {
  /* It's improtant to have a cpecific pivot point for transition:*/
  opacity: 1;
  background-color: #fff;
  width: 470px;
  position: absolute;
}

.z-1000 {
  z-index: 1000;
}

.search-item {
  padding: 5px 8px;
  margin: 3px 0px;
}
.search-item.hover {
  background: #ddd;
  cursor: pointer;
}
</style>
