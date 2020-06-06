<template>
  <div class="field">
    <button class="ui inverted button app-green" type="submit" :disabled="saving">Save Changes?</button>
    <button
      v-if="!newEntity"
      class="ui inverted button app-red"
      type="submit"
      :disabled="saving"
    >Delete This?</button>
  </div>
</template>
<script>
export default {
  props: {
    newEntity: Boolean,
    saving: Boolean
  }
};
</script>