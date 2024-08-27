<template>
  <form class="ui form" @submit.prevent="$emit('submit')">
    <div v-for="(propVal, propName) in EntityFilteredCols" :key="propName" class="field">
      <label class="form-label" :for="entityName + '_' + propName">{{ ProperName(propName) }}</label>
      <div v-if="IdKeyCheck(propName)" class="ui fluid search selection dropdown"
           @change="EditEntity(propName, (<HTMLSelectElement>$event.target).value)">
        <input type="hidden" name="state">
        <i class="dropdown icon" />
        <div class="default text">Select One</div>
        <div class="menu">
          <div v-for="foreignKey in ForeignKeyCall" :key="foreignKey" class="item" :data-value="foreignKey">
            {{ foreignKey }}
          </div>
        </div>
      </div>

      <input v-else-if="!(newEntity && propName === 'ID')" :id="entityName + '_' + propName"
             type="text" :value="propVal" :disabled="propName === 'id' || propName === '_id'"
             @input="EditEntity(propName, (<HTMLInputElement>$event.target).value)">

      <transition-group name="slide" tag="div" class="ui celled list">
        <li v-for="validationErr in validationErrors[propName]" :key="validationErr" class="item form-validation-err">
          - {{ validationErr }}
        </li>
      </transition-group>
    </div>
    <div class="field">
      <button type="submit" class="ui inverted button app-green" :disabled="saving">
        Save Changes?
      </button>
      <button v-if="!newEntity" type="submit" class="ui inverted button app-red" :disabled="saving">
        Delete This?
      </button>
    </div>
  </form>
</template>

<script lang='ts'>
import { PropType, defineComponent } from "vue";
import {
  PrettifyColumnNames as ProperName, IdKeyCheck, FilterColumns, CheckIfDate
} from "../../Utility/Functions/prettify_entity";
import DbRecord from "@/Models/DbRecord";
//todo Foreign keys will be obj { foreignName: [], foreignName2: [] }

export default defineComponent({
  props: {
    entity: {
      type: Object as PropType<DbRecord>,
      required: true,
    },
    entityName: {
      type: String,
      required: true
    },
    saving: Boolean,
    newEntity: Boolean,
  },
  emits: ["edit", "submit"],
  data() {
    return {
      validationErrors: {} as Record<string, string[]>
    };
  },
  computed: {
    EntityFilteredCols() {
      if (this.$store.state.authentication.user?.role < 1) {
        return Object.fromEntries(Object.entries(this.entity).filter(FilterColumns));
      }
      else { // - Grab the UTC version of these date columns
        const created_at = typeof this.entity.created_at === "string" ?
          this.entity.created_at : this.entity.created_at?.toUTCString();
        const updated_at = typeof this.entity.updated_at === "string" ?
          this.entity.updated_at : this.entity.updated_at?.toUTCString();

        this.entity.created_at = CheckIfDate(created_at ?? ""); // TODO: Rename this Check SINCE the point is
        this.entity.updated_at = CheckIfDate(updated_at ?? ""); // - To get a locale-specific string for the date
        return this.entity;
      }
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
    EditEntity(propName: string | undefined = undefined, propVal: string | number | undefined = undefined): void {
      this.$emit("edit", propName, propVal);
    }
  }
});
</script>

<style lang="scss" scoped>
</style>