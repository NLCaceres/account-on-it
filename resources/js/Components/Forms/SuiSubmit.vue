<template>
  <div class="field">
    <button type="submit" class="ui inverted button app-green" :disabled="saving">
      Save Changes?
    </button>
    <button v-if="!newEntity" type="submit" class="ui inverted button app-red" :disabled="saving">
      Delete This?
    </button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    newEntity: Boolean,
    saving: Boolean
  }
});
</script>