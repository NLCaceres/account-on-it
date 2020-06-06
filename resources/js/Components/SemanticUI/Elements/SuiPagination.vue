<template>
  <div class="m-lg-l">
    <transition-group
      name="change-page"
      tag="ul"
      class="flexed no-padding app-pagination m-sm-t"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
    >
      <li v-if="currentPage !== 1" key="prev" class="app-page border-r rounded-l">
        <button class="ui icon left attached button page-button" @click="PrevPage">
          <i class="left chevron icon" />
        </button>
      </li>

      <li v-for="pageNum in NumOfPages" :key="pageNum" class="app-page">
        <button
          class="ui icon button page-button no-margin"
          :class="{ 'active': currentPage === pageNum, 'border-x': currentPage === pageNum, 
          'rounded-none': currentPage > 1 && currentPage < numOfPages || pageNum > 1 && pageNum < numOfPages,
          'rounded-l': currentPage === 1 && pageNum === 1,
          'rounded-r': currentPage === numOfPages && pageNum === numOfPages}"
          @click="ChangePage(pageNum)"
        >{{pageNum}}</button>
      </li>

      <li v-if="currentPage !== numOfPages" key="next" class="app-page border-l rounded-r">
        <button class="ui icon right attached button page-button" @click="NextPage">
          <i class="right chevron icon" />
        </button>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: Number,
    numOfPages: Number,
    entityTotal: Number,
    divideBy: Number,
    activePage: Boolean
  },
  computed: {
    NumOfPages() {
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
      this.$emit("update:currentPage", this.currentPage - 1);
    },
    ChangePage(page) {
      this.$emit("update:currentPage", page);
    },
    NextPage() {
      if (this.currentPage === 10) return;
      this.$emit("update:currentPage", this.currentPage + 1);
    },
    //? Manual vs Reactivity. Reactivity kills transitioning buttons
    beforeEnter(el) {
      $(".ui.icon.button.page-button").prop("disabled", true);
    },
    afterEnter(el) {
      $(".ui.icon.button.page-button").prop("disabled", false);
    }
  }
};
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