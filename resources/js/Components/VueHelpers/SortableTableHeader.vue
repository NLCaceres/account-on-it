<template>
  <th @click="SortTableHeader"> 
    <slot></slot>
    <i v-if="SortOrder === 1" class="sort up icon"></i>
    <i v-else-if="SortOrder === -1" class="sort down icon"></i>
    <i v-else class="sort icon"></i>

  </th>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    currentColumnToSortBy: {
      type: String,
      default: 'default',
      required: true
    } 
  },
  computed: {
    SortOrder(): number | undefined {
      if (this.currentColumnToSortBy !== this.headerTitle) {
        return 0;
      } else {
        return this.sortOrder;
      }
    }
  },
  data() {
    return {
      sortOrder: 0, //* 0 = None, 1 = ascending, -1 = descending
      headerTitle: ''
    }
  },
  mounted() { 
    if (this.$slots.default) this.headerTitle = this.$slots.default[0].text?.trim() ?? '';
  },
  methods: {
    SortTableHeader(): number { 
      this.sortOrder = this.sortOrder === 0 //* 0 = starting point -> After click, start in ascending mode
        ? 1 : this.sortOrder * -1;
      this.$emit(this.CustomEvents.CHANGE_SORT, this.sortOrder);
      return this.sortOrder;
    }
  }
});
</script>