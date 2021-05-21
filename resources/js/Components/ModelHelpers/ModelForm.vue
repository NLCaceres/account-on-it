<template>
  <form class="ui form" @submit.prevent="$emit('submit')">
    <div class="field" v-for="(propVal, propName) in EntityFilteredCols" :key="propName">
      <label class="form-label" :for="entityName + '_' + propName">{{ ProperName(propName) }}</label>
      <div
        v-if="IdKeyCheck(propName)"
        class="ui fluid search selection dropdown"
        @change="Edited(propName, $event.target.value)"
      >
        <input type="hidden" name="state" />
        <i class="dropdown icon" />
        <div class="default text">Select One</div>
        <div class="menu">
          <div
            v-for="foreignKey in ForeignKeyCall"
            class="item"
            :key="foreignKey"
            :data-value="foreignKey"
          >{{foreignKey}}</div>
        </div>
      </div>

      <input
        v-else-if="!(newEntity && propName === 'ID')"
        type="text"
        :id="entityName + '_' + propName"
        :value="propVal"
        :disabled="propName === 'id' || propName === '_id'"
        @input="EditEntity(propName, $event.target.value)"
      />
      <transition-group name="slide" tag="div" class="ui celled list">
        <li
          v-for="validationErr in validationErrors[propName]"
          :key="validationErr"
          class="item form-validation-err"
        >- {{validationErr}}</li>
      </transition-group>

    </div>
    <div class="field">
      <button type="submit" class="ui inverted button app-green" :disabled="saving">Save Changes?</button>
      <button type="submit" v-if="!newEntity" class="ui inverted button app-red"
        :disabled="saving">Delete This?</button>
    </div>
  </form>
</template>
<script lang='ts'>
import Vue from 'vue';
import { PrettifyColumnNames as ProperName, IdKeyCheck, FilterColumns, CheckIfDate } from "../../Utility/Functions/prettify_entity";
//todo Foreign keys will be obj { foreignName: [], foreignName2: [] }

interface ValidationError {
  [key: string]: []
}

export default Vue.extend({
  props: {
    entity: Object,
    entityName: String,
    saving: Boolean,
    newEntity: Boolean,
  },
  data() {
    return {
      validationErrors: {} as ValidationError
    }
  },
  computed: {
    EntityFilteredCols(): object {
      const filteredCols = this.$store.state.authentication.user?.role === 0
        ? Object.fromEntries(Object.entries(this.entity).filter(FilterColumns))  
        : this.entity;

      //* Grabs utc version of date, turns it in to locale version
      if (this.$store.state.authentication.user?.role >= 1) { //* Admin or higher role receives all fields from DB
        filteredCols.created_at = CheckIfDate(filteredCols.created_at);
        filteredCols.updated_at = CheckIfDate(filteredCols.updated_at);
      }

      return filteredCols;
    },
    ForeignKeyCall(): [] {
      //this.$emit("foreign");
      //* Pass in API to call
      return [];
    },
  },
  created() {
    this.InitValidationErrors();
  },
  methods: {
    InitValidationErrors(): void {
      for (const entityKey in this.entity) {
        if (entityKey === "constructor") continue;
        this.validationErrors[entityKey] = [];
      }      
    },
    ProperName,
    IdKeyCheck,
    EditEntity(propName: string | null = null, propVal: any | null = null): void {
      this.$emit("edit", propName, propVal);
    }
  }
});
</script>

<style lang="scss" scoped>
</style>