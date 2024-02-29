<template>
  <div class="w-100" :class="{ 'overflow-x': entities.length > 0, 'p-sm-y': entities.length === 0 }">
    <sui-table v-if="entities.length > 0" :entities="entities" @delete="OnDelete" class="single line">
      <template #header-row>
        <sortable-table-header v-for="columnName in ProperColumnName" :key="columnName" 
          :currentColumnToSortBy="columnToSortBy" @change-sort="SortByTableHeader($event, columnName)"
          class="center aligned">
            {{ columnName }}
        </sortable-table-header>
        <th class='center aligned'>Detail</th>
        <th class='center aligned'>Edit</th>
        <th class='center aligned'>Delete</th>
      </template>
      <template #row="{ entity, index }">
        <td v-for="(propVal, propName) in EntityFilteredCols(entity)" :key="propName" 
          class="center aligned p-sm-x">
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
import { PrettifyColumnNames, FilterColumns, CheckIfDate } from '../../Utility/Functions/prettify_entity';
import SortableTableHeader from '../VueHelpers/SortableTableHeader.vue';
import { LaravelRecord } from '../../Models/AbstractDbRecord';
import SuiTable from '../Elements/SuiTable.vue';
import ModelError from './ModelError.vue';

export default defineComponent({
  //! Components
  components: {
    SuiTable, ModelError, SortableTableHeader
  },
  //! Props
  props: {
    entities: {
      type: Array as PropType<LaravelRecord[]>, //* Array of entities
      default: []
    },
    entityName: String,
    pluralEntity: String,
    saving: Boolean
  },
  computed: {
    ProperColumnName(): string[] | null {
      //* Have to check for array since computed props run even if async funcs fetching data not finished        
      if (this.entities.length > 0) { 
        //* Grabs first object in array as example
        const keys = this.$store.state.authentication.user?.role === 0
          ? Object.keys(this.entities[0]).filter(FilterColumns)
          : Object.keys(this.entities[0])

        return keys.map(PrettifyColumnNames) as string[];
      }
      return null;
    }
  },
  //! Data
  data() {
    return {
      columnToSortBy: ''
    }
  },
  //! Methods
  methods: {
    OnDelete(id: string | number, index: number): void {
      console.log(`Delete Button Pressed: - ID: ${id} - Index: ${index}`);
      this.$emit("delete", id, index);
    },
    EntityFilteredCols(entity: LaravelRecord) {
      const filteredCols = this.$store.state.authentication.user?.role === 0
        ? Object.fromEntries(Object.entries(entity).filter(FilterColumns))  
        : entity;

      //* Grabs utc version of date, turns it in to locale version
      if (this.$store.state.authentication.user?.role >= 1) { //* Admin or higher role receives all fields from DB
        filteredCols.created_at = CheckIfDate(filteredCols.created_at);
        filteredCols.updated_at = CheckIfDate(filteredCols.updated_at);
      }

      return filteredCols;
    },
    SortByTableHeader(sortOrder: number, columnName: string) {

      this.columnToSortBy = columnName;
      
      const originalColumnName = columnName.toLowerCase().replace(" ", "_");

      this.entities.sort((a, b) => {
        //? 'Any' deals with typescript trying to guess what prop you're grabbing from the object
        //? Normally we never want 'any' but here, it makes some sense we could display any object in this table as a series of columns
        let x = a[originalColumnName];
        x = (typeof x === 'string') ? x.toLowerCase() : x;
        let y = b[originalColumnName];
        y = (typeof y === 'string') ? y.toLowerCase() : y;
        if (x < y) return -1 * sortOrder; //* With a negative sorting factor, inverse returns so descending sort
        if (x > y) return 1 * sortOrder; 
        return 0;
      });
    }
  }
});
</script>

