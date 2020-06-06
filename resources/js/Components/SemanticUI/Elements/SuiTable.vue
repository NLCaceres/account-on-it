<template>
  <table class="ui inverted selectable unstackable celled large table w-100">
    <thead>
      <tr class="app-light-accent">
        <th
          v-for="columnName in ProperColumnName"
          :key="columnName"
          class="center aligned collapsing"
        >{{ columnName }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entity, index) in entities" :key="entity.id">
        <td
          v-for="(propVal, propName) in EntityFilteredCols(entity)"
          :key="propName"
          v-html="propVal"
          class="center aligned collapsing p-sm-x"
        />
        <td class="center aligned collapsing p-md-x">
          <router-link
            class="ui inverted button app-green"
            :to="{ name: ShowRoute, params: { id: entity.id } }"
          >Check Details</router-link>
        </td>
        <td class="center aligned collapsing p-md-x">
          <router-link
            class="ui inverted button app-yellow"
            :to="{ name: EditRoute, params: { id: entity.id } }"
          >Edit?</router-link>
        </td>
        <td class="center aligned collapsing p-md-x">
          <button
            class="ui inverted button app-red"
            @click.prevent="OnDelete(entity.id, index)"
          >Delete?</button>
          <!-- //? If using boostrap popover, must not sanitize and allow html rendering attr, then activate in updated() lifecycle func.-->
        </td>
      </tr>
    </tbody>
  </table>
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
    ProperColumnName() {
      if (this.entities.length > 0) {
        //? Will run even if await has not returned landlords
        const entity = this.entities[0];

        const keys = Object.keys(entity)
          .filter(columnName => {
            if (this.$store.state.authentication.user.role === 1) return true;

            //* Checks if Created_at or Updated_at column so they can be filtered out
            const IsCreatedAndUpdated =
              columnName === "created_at" || columnName === "updated_at";

            //* Case insensitive global search for 'id' or '_id' (also claimed or current for tenants)
            const FoundAdminOnlyColumn = /id|claimed|current/gi.test(
              columnName
            );

            //* Filter out column if id found in string
            return !IsCreatedAndUpdated && !FoundAdminOnlyColumn;
          }) //* 'entry[0]' used here to grab only the key! We receive [key, val] pairs from entries func!
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
        Object.entries(entity).filter(entry => {
          if (this.$store.state.authentication.user.role === 1) {
            return true;
          }
          //* Checks if Created_at or Updated_at column so they can be filtered out
          const IsCreatedAndUpdated =
            entry[0] === "created_at" || entry[0] === "updated_at";

          //* Case insensitive global search for 'id' or '_id' (also claimed or current for tenants)
          const FoundAdminOnlyColumn = /id|claimed|current/gi.test(entry[0]);

          //* Filter out column if id found in string
          return !IsCreatedAndUpdated && !FoundAdminOnlyColumn;
        }) //* 'entry[0]' used here to grab only the key! We receive [key, val] pairs from entries func!
      );
      return filteredCols;
    },
    OnDelete(id, index) {
      this.$emit("delete", id, index);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../sass/variables/colors.scss";
.ui.inverted.table th {
  border-color: rgba(255, 255, 255, 0.5) !important;
}

.ui.selectable.inverted.table tbody tr:nth-child(odd):hover {
  background: #888888 !important;
}
.ui.selectable.inverted.table tbody tr:nth-child(even) {
  //? CSS Hidden Rule - SPECIFICITY rules above all. The more selectors the more likely important will take precedent
  background: $dark-accent;
  &:hover {
    background: $light-accent !important;
  }
}
</style>