<template>
  <table class="ui inverted selectable unstackable celled large table w-100">
    <thead>
      <tr class="app-light-accent">
        <slot name="header-row">
          <sortable-table-header @change-sort="SortByTableHeader($event, columnName)"
            v-for="columnName in ProperColumnName" :key="columnName"
            :currentColumnToSortBy="columnToSortBy" class="center aligned">
              {{ columnName }}
          </sortable-table-header>
        </slot>
      </tr>
    </thead>
    <tbody>
      <slot name="rows">
        <tr v-for="(entity, index) in entities" :key="entity[keyName]">
          <slot name="row" :entity="entity" :index="index">
            <td v-for="(propVal, propName) in entity"
              :key="propName" class="center aligned p-sm-x">
                <slot name='detail' :propVal="propVal" :propName="propName"> 
                  {{ CheckIfDate(propVal) }} 
                </slot>
            </td>
          </slot>
        </tr>
      </slot>
    </tbody>
  </table>
</template>
<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { CheckIfDate } from "../../Utility/Functions/prettify_entity";
import SortableTableHeader from '../VueHelpers/SortableTableHeader.vue';

export default defineComponent({
  //! Components
  components: {
    SortableTableHeader
  },
  //! Props
  props: {
    entities: {
      type: Array as PropType<object[]>,
      required: true,
      default: []
    },
    keyName: { 
      //* Keys the v-for loop! Uses the entity's ID property by default since it should be unique
      type: String,
      default: 'id',
    },
  },
  computed: {
    ProperColumnName(): string[] | null {   
      return (this.entities.length > 0) 
        //* Use first item in array as sample for column names
        ? Object.keys(this.entities[0]).map(this.PrettifyColumnNames)
        : null
    }
  },
  //! Data
  data() {
    return {
      columnToSortBy: ''
    };
  },
  //! Methods
  methods: {
    PrettifyColumnNames(columnName: string) {
      //* Swap underscore with space, trim leading and ending whitespace, and uppercase letters at word boundaries
      return columnName.replace("_", " ").trim().replace(/\b\w/g, a => a.toUpperCase()); 
    },
    SortByTableHeader(sortOrder: number, columnName: string) {
      this.columnToSortBy = columnName;
      
      const originalColumnName = columnName.toLowerCase().replace(" ", "_");

      (this.entities).sort((a, b) => {
        //? Any deals with typescript trying to guess what prop you're grabbing from the object
        //? Normally we never want any but here, it makes some sense we could display any object in this table as a series of columns
        let x = (a as any)[originalColumnName];
        x = (typeof x === 'string') ? x.toLowerCase() : x;
        let y = (b as any)[originalColumnName];
        y = (typeof y === 'string') ? y.toLowerCase() : y;
        if (x < y) return -1 * sortOrder; //* With a negative sorting factor, inverse returns so descending sort
        if (x > y) return 1 * sortOrder; 
        return 0;
      });
    },
    CheckIfDate
  }
});
</script>

<style lang="scss" scoped>
@import "../../../sass/variables/colors.scss";
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