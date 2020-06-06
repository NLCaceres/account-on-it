<template>
  <div class="w-100 overflow-x">
    <sui-table
      v-if="entities.length > 0"
      :entities="entities"
      :entity-name="entityName"
      @delete="OnDelete"
    />
    <model-error
      v-else
      class="m-sm-t"
    >You don't seem to have any {{pluralEntity}}. Use the button above to add a few!</model-error>
  </div>
</template>
<script>
export default {
  props: {
    entities: Array,
    entityName: String,
    pluralEntity: String,
    saving: Boolean
  },
  methods: {
    OnDelete(id, index) {
      this.$emit("delete", id, index);
    }
  }
};
</script>

<style lang="scss">
//! BEM Convention */
/* Example Modifier - Uses '--' to notate a modifier and what it does
.table-body-row--orange {
  background-color: orange;
}
*/
/* Example Child Element - Uses '__' to notate a child element and it's base styling
.table-body-row__table-data {
  background-color: blue;
}
*/

//! OOCSS may be better option despite complexity thanks to Sass */
//* Reasoning */
/* 1st rule - Separate structure from skin - DRY
   Structure - less noticeable props - height, margins, border-radius 
   Skin - Immediately apparent props - color, font, shadows, gradients */
/* 2nd rule - Separate content from container - Increase reusability by avoiding child selectors
   Instead of table .list .list-header -> .list-header will do just fine! and can be repurposed outside of this specific table
   Instead of #sidebar -> .sidebar works just as well and becomes reusable! */
/* With these concepts in mind, leveraging SCSS makes OOCSS even more simple
   1. Use '%' - 'placeholder selector' to create skins & structures you can @extend (Prevents risky @extend's that step on each other)
   2. Use '&' to create suffixes within classes that help specify needs of particular html elem
   Ex: 
%button {
  min-width: 100px;
  padding: 1em;
  border-radius: 1em;
}
%twitter-bg {
  background-color: #55acee;
  color: #fff;
}

   Now you can choose to place @extend %button either in the '&' or applying it to all of .btn!
.btn {
  &--twitter {
    @extend %button;
    @extend %twitter-background;
  }
}
.btn {
  @extend %button;
  &--twitter {
    @extend %twitter-background;
  }
}
*/
</style> 

