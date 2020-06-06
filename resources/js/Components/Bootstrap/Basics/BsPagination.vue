<template>
  <nav aria-label="Page Navigation">
    <ul class="pagination" :class="{'pagination-sm': sizing === -1}">
      <li class="page-item" v-if="currentPage !== 0">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        :class="{'active': currentPage === n}"
        :aria-current="currentPage === n ? 'page' : undefined"
        v-for="n in numOfPages"
        :key="n"
      >
        <span class="page-link" v-if="currentPage === n">
          {{n}}
          <span class="sr-only">(current)</span>
        </span>
        <a :href="`?p=${n}`" class="page-link" v-else>{{n}}</a>
      </li>

      <li class="page-item" v-if="currentPage !== (numOfPages - 1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
//todo Handle Active and Disabled states by swapping these anchor tags for span tags
//todo Handle if at first and last (if at first, no prev button; if at last, no next button)
export default {
  props: {
    size: Number,
    numOfPages: Number
  },
  data() {
    return {
      currentPage: 0
    };
  }
};
</script>