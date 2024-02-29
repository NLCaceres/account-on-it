<template>
  <div :class="[mobile ? 'flexed-column' : 'flexed']">
    <div class='flexed-column'>
      <div class='align-self-start'>
        <h1 class="m-0-b"><slot>Basic Information</slot></h1>
        <div class="ui divider m-xs-t" :class="[mobile ? 'm-xs-b' : 'm-sm-b']" />
      </div>
      <slot name="main-info">
        <div v-for="(propVal, propName) in MainInfo" :key="propName" class="m-xs-t m-md-l">
          <h3 class="border-slim-b-white"> {{ propName }}: </h3>
          <h3 class="m-sm-l">{{ propVal }}</h3>
        </div>
      </slot>
    </div>
    <div class="flexed-column-wrap flexed-auto" :class="[mobile ? 'm-sm-t' : 'm-lg-t']">
      <slot name="side-info">
        <div v-for="(propVal, propName) in SideInfo" :key="propName" class="m-md-t m-lg-l">
          <h3 class="border-slim-b-white">{{ propName }}:</h3>
          <h3 class="m-sm-l">{{ propVal }}</h3>
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import { mapGetters } from 'vuex';
import { MOBILE_WIDTH } from '../../Store/GetterTypes';
import { APP_MODULE } from '../../Store/modules/AppState';
import { PrettifyColumnNames, FilterColumns, CheckIfDate } from '../../Utility/Functions/prettify_entity';

export default defineComponent({
  props: {
    entity: Object,
    entityName: String,
    mainInfo: {
      //* Pass keys here to properly use the v-for above with entity prop
      type: [Array, String, Object],
      default: null
    },
    sideInfo: {
      //* Same as mainInfo, Can use string to get keys if delimited by " " & convert to array
      //* Or just pass in a portion of the object to each that should be listed
      type: [Array, String, Object],
      default: null
    },
    mainInfoClass: {
      type: String,
      default: ""
    },
    sideInfoClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    MainInfo(): object {
      return this.mainInfo ? this.HandleInfoSplit(this.mainInfo) : {};
    },
    SideInfo(): object {
      return this.sideInfo ? this.HandleInfoSplit(this.sideInfo) : {};
    },
    ...mapGetters(APP_MODULE, {mobile: MOBILE_WIDTH})
  },
  methods: {
    HandleInfoSplit(keys: [] | object | string) {
      if (Array.isArray(keys)) {
        const uglyMainInfo = {}
        for (const key of keys) { //* List of keys
          (uglyMainInfo as any)[key] = this.entity[key]; //* Use the same keys on entity and set k-v pairs for uglyMainInfo
        }
        return this.FilteredEntity(uglyMainInfo);
      } 
      //? Arrays will also return true to below, so if it failed above, then we have a true obj {}
      else if (keys instanceof Object) { 
        console.log("Found an object");
        return this.FilteredEntity(keys);
      } 
      else { //* If it's a string
        const keyList = keys.split(" ");
        const uglyMainInfo = {};
        for (const key of keyList) {
          (uglyMainInfo as any)[key] = this.entity[key];        
        }
        return this.FilteredEntity(uglyMainInfo);
      }
    },
    FilteredEntity(uglyEntity: object): object {
      const columnEntries = Object.entries(uglyEntity);

      const prettyEntries = (this.$store.state.authentication.user?.role === 0
        ? columnEntries.filter(FilterColumns) 
        : columnEntries).map(PrettifyColumnNames); //* Apply map to final result 

      const finalCols = Object.fromEntries(prettyEntries as [string, any][]);
      
      //* Grabs utc version of date, turns it in to locale version
      if (this.$store.state.authentication.user?.role >= 1) { //* Admin or higher role receives all fields from DB
        finalCols["Created At"] = CheckIfDate(finalCols["Created At"]);
        finalCols["Updated At"] = CheckIfDate(finalCols["Updated At"]);
      }

      return finalCols;
    },
  }
});
</script>
<style lang="scss" scoped>
h3 {
  margin-top: 0em;
  margin-bottom: 0em;
  display: inline-flex
}
</style>

