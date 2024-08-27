<template>
  <div class="w-100" :class="{ 'overflow-x': entities.length > 0, 'p-sm-y': entities.length === 0 }">
    <sui-table v-if="entities.length > 0" :entities class="single line" @delete="OnDelete">
      <template #header-row>
        <sortable-table-header v-for="columnName in ProperColumnName" :key="columnName" class="center aligned"
                               :current-column-to-sort-by="columnToSortBy"
                               @change-sort="SortByTableHeader($event, columnName)">
          {{ columnName }}
        </sortable-table-header>
        <th class="center aligned">Detail</th>
        <th class="center aligned">Edit</th>
        <th class="center aligned">Delete</th>
      </template>
      <template #row="{ entity, index }">
        <td v-for="(propVal, propName) in EntityFilteredCols(entity)" :key="propName" class="center aligned p-sm-x">
          {{ propVal }}
        </td>
        <td class="center aligned p-md-x">
          <router-link class="ui inverted button app-green m-0-x"
                       :to="{ name: entityName + 'Detail', params: { id: entity.id } }">
            Check Details
          </router-link>
        </td>
        <td class="center aligned p-md-x">
          <router-link class="ui inverted button app-yellow m-0-x"
                       :to="{ name: entityName + 'Edit', params: { id: entity.id } }">
            Edit?
          </router-link>
        </td>
        <td class="center aligned p-md-x">
          <button type="button" class="ui inverted button app-red m-0-x"
                  @click.prevent="OnDelete(entity.id, index)">
            Delete?
          </button>
        </td>
      </template>
    </sui-table>

    <model-error v-else class="m-sm-t">
      You don't seem to have any {{ pluralEntity }}. Use the button above to add a few!
    </model-error>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { PrettifyColumnNames, FilterColumns, CheckIfDate } from "../../Utility/Functions/prettify_entity";
import SortableTableHeader from "../VueHelpers/SortableTableHeader.vue";
import DbRecord from "../../Models/DbRecord";
import SuiTable from "../Elements/SuiTable.vue";
import ModelError from "./ModelError.vue";

export default defineComponent({
  // !: Components
  components: {
    SuiTable, ModelError, SortableTableHeader
  },
  props: {
    entities: {
      type: Array as PropType<DbRecord[]>, // - Array of entities
      default() { return []; }
    },
    entityName: {
      type: String,
      required: true
    },
    pluralEntity: {
      type: String,
      required: true
    },
    saving: Boolean
  },
  emits: ["delete"],
  data() {
    return {
      columnToSortBy: ""
    };
  },
  computed: {
    ProperColumnName(): string[] {
      // - Have to check for array since computed props run even if async funcs fetching data not finished
      if (this.entities.length > 0) {
        // - Grabs first object in array as example
        const keys = this.$store.state.authentication.user?.role === 0
          ? Object.keys(this.entities[0]).filter(FilterColumns)
          : Object.keys(this.entities[0]);

        return keys.map(PrettifyColumnNames) as string[];
      }
      return [];
    },
  },
  methods: {
    OnDelete(id: string | number, index: number): void {
      console.log(`Delete Button Pressed: - ID: ${id} - Index: ${index}`);
      this.$emit("delete", id, index);
    },
    EntityFilteredCols(entity: DbRecord) {
      if (this.$store.state.authentication.user?.role < 1) {
        return Object.fromEntries(Object.entries(entity).filter(FilterColumns));
      }
      else { // - Grab the UTC version of these date columns
        const created_at = typeof entity.created_at === "string" ? entity.created_at : entity.created_at?.toUTCString();
        const updated_at = typeof entity.updated_at === "string" ? entity.updated_at : entity.updated_at?.toUTCString();
        entity.created_at = CheckIfDate(created_at ?? ""); // TODO: Rename this Check SINCE the point is
        entity.updated_at = CheckIfDate(updated_at ?? ""); // - To get a locale-specific string for the date
        return entity;
      }
    },
    SortByTableHeader(sortOrder: number, columnName: string) {
      this.columnToSortBy = columnName;

      const originalColumnName = columnName.toLowerCase().replace(" ", "_") as keyof DbRecord;

      this.entities.sort((a, b) => {
        let x = a[originalColumnName];
        x = (typeof x === "string") ? x.toLowerCase() : x;
        let y = b[originalColumnName];
        y = (typeof y === "string") ? y.toLowerCase() : y;
        // - MUST be sure BOTH X and Y != undefined so comparison works (doesn't throw)
        if (!x || (y && x < y)) return -1 * sortOrder; // - Using -1 inverts the sort to descending order
        if (!y || (x && x > y)) return 1 * sortOrder; // - BUT if X or Y == undefined, then treat it as a smaller num
        return 0;
      });
    }
  }
});
</script>

