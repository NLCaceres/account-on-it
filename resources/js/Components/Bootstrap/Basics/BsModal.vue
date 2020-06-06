<template>
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="{'modal-dialog-centered': centered}" role="document">
      <div class="modal-content modal-sm" :class="{'modal-sm': size === -1}">
        <div class="modal-header">
          <h3 class="modal-title font-weight-bold" id="deleteModalLabel">Are You Sure?</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('confirm')"
            data-dismiss="modal"
          >Delete</button>
          <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    centered: Boolean,
    size: Number
  }
};
</script>