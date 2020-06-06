<template>
  <div class="card bg-dark">
    <div class="table-responsive">
      <table class="table table-dark table-bordered table-hover m-0">
        <thead>
          <tr class="table-header-row bg-primary">
            <th class="font-weight-bold" scope="col" v-for="key in ProperKeys" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entity, index) in entities" :key="entity.id" class="table-body-row">
            <td
              v-for="(propVal, propName) in EntityFilteredCols(entity)"
              :key="propName"
              v-html="propVal"
            />
            <td>
              <router-link
                class="btn btn-success"
                :to="{ name: ShowRoute, params: { id: entity.id } }"
              >Check Details</router-link>
            </td>
            <td>
              <router-link
                class="btn btn-warning"
                :to="{ name: EditRoute, params: { id: entity.id } }"
              >Edit?</router-link>
            </td>
            <td>
              <button class="btn btn-danger" @click.prevent="OnDelete(entity.id, index)">Delete?</button>
              <!-- If using boostrap popover, must not sanitize and allow html rendering attr, then activate in updated() lifecycle func.-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    entities: Array,
    entityName: String
  },
  computed: {
    ShowRoute() {
      return this.entityName + "Detail";
    },
    EditRoute() {
      return this.entityName + "Edit"; //? Thought about arrow function to simplify, but 'this' changes! so bad idea
    },
    ProperKeys() {
      if (this.entities.length > 0) {
        //? Will run even if await has not returned landlords
        const entity = this.entities[0];
        const keys = Object.keys(entity)
          .filter(key => key !== "created_at" && key !== "updated_at")
          .map(key => {
            return key.toLowerCase() === "id" || key.toLowerCase() === "_id" //? Check if id column to output ID
              ? "ID"
              : key
                  .replace("_", " ")
                  .trim()
                  .replace(/\b\w/g, a => a.toUpperCase()); //? Otherwise get rid of _, trim whitespace, and uppercase word boundaries
          });

        return keys.concat(["Details", "Edit", "Delete"]);
      }
    }
  },
  methods: {
    EntityFilteredCols(entity) {
      const filteredCols = Object.fromEntries(
        Object.entries(entity).filter(
          entry => entry[0] !== "created_at" && entry[0] !== "updated_at"
        )
      );
      return filteredCols;
    },
    OnDelete(id, index) {
      this.$emit("delete", id, index);
    }
  }
};
</script>