<template>
  <div class="m-lg-l relative-pos">
    <transition-group
      name="change-page"
      tag="ul"
      class="flexed p-0 app-pagination m-sm-t"
      :style="{'--total': 5 }"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
    >
      <li v-if="currentPage !== 1" key="prev" class="app-page border-r rounded-l" :style="{'--i': 0}">
        <button type="button" class="ui icon left attached button page-button" @click="PrevPage">
          <i class="left chevron icon" />
        </button>
      </li>

      <li v-for="(pageNum, index) in NumOfPages" :key="pageNum" class="app-page" :style="{'--i': index + 1}">
        <button type="button"
          class="ui icon button page-button m-0"
          :class="{ 'active': currentPage === pageNum, 'border-x': currentPage === pageNum, 
          'rounded-none': currentPage > 1 && currentPage < numOfPages || pageNum > 1 && pageNum < numOfPages,
          'rounded-l': currentPage === 1 && pageNum === 1,
          'rounded-r': currentPage === numOfPages && pageNum === numOfPages}"
          @click="ChangePage(pageNum)"
        >{{pageNum}}</button>
      </li>

      <li v-if="currentPage !== numOfPages" key="next" class="app-page border-l rounded-r" :style="{'--i': 4}">
        <button type="button" class="ui icon right attached button page-button" @click="NextPage">
          <i class="right chevron icon" />
        </button>
      </li>
    </transition-group>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  props: {
    currentPage: Number,
    numOfPages: Number,
    entityTotal: Number,
    divideBy: Number,
    activePage: Boolean
  },
  computed: {
    NumOfPages(): number | number[] {
      if (this.numOfPages) {
        if (this.currentPage === 1) {
          return [this.currentPage, this.currentPage + 1];
        } else if (this.currentPage === this.numOfPages) {
          return [this.currentPage - 1, this.currentPage];
        } else {
          return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
        }
      }
      return this.entityTotal / this.divideBy;
    }
  },
  methods: {
    PrevPage() {
      if (this.currentPage === 1) return;
      this.$emit(this.CustomEvents.UPDATE_PAGE, this.currentPage - 1);
    },
    ChangePage(page: number) {
      //* First half of conditional helps prevents double clicks, once all enabled 
      //* Prevents the parent component from firing a vue-router replace to the same url
      if (this.currentPage !== page && this.$route.fullPath !== `${this.$route.path}?page=${String(page)}`) {
        this.$emit(this.CustomEvents.UPDATE_PAGE, page);
      }
    },
    NextPage() {
      if (this.currentPage === this.numOfPages) return;
      this.$emit(this.CustomEvents.UPDATE_PAGE, this.currentPage + 1);
    },
    //? Javascript Vue Transition Hooks - Helps tie together disabling buttons in list items
    beforeEnter(el: HTMLLIElement) { 
      (el.children[0] as HTMLButtonElement).disabled = true; //* Disable new list item button
      $(".ui.icon.button.page-button").prop("disabled", true); //* Disable siblings
    },
    afterEnter(el: HTMLLIElement) {
      (el.children[0] as HTMLButtonElement).disabled = false; //* Enable new list item button
      $(".ui.icon.button.page-button").prop("disabled", false); //* Re-enable siblings
    }
  }
});
</script>
<style lang="scss" scoped>
.app-pagination {
  list-style-type: none;
}
.app-page {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  width: 2.5em;
  height: 2.5em;
  background-color: transparent;
  text-decoration: none;
}
.page-button {
  width: 100%;
  height: 100%;
}
.active {
  background-color: #bbbbbb;
}
</style>