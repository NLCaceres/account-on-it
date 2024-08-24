<template>
  <th @click="SortTableHeader">
    <slot />
    <i v-if="SortOrder === 1" class="sort up icon" />
    <i v-else-if="SortOrder === -1" class="sort down icon" />
    <i v-else class="sort icon" />
  </th>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    shouldSortByThis: Boolean
  },
  emits: ["change-sort"],
  data() {
    return {
      sortOrder: 0, // - 0 = None, 1 = ascending, -1 = descending
    };
  },
  computed: {
    SortOrder(): number {
      return (this.shouldSortByThis) ? this.sortOrder : 0;
    }
  },
  methods: {
    SortTableHeader(): number {
      this.sortOrder = this.sortOrder === 0 // - 0 = starting point -> After click, start in ascending mode
        ? 1 : this.sortOrder * -1;
      this.$emit("change-sort", this.sortOrder);
      return this.sortOrder;
    }
  }
});
</script>