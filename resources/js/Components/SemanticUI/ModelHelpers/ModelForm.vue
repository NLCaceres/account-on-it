<template>
  <form class="ui form" @submit.prevent="$emit('submit')">
    <div class="field" v-for="(propVal, propName) in EntityFilteredCols" :key="propName">
      <label class="form-label" :for="entityName + '_' + propName">{{ ProperName(propName) }}</label>
      <!-- <select
        v-if="ForeignKeyCheck(propName)"
        class="form-control"
        :name="entityName + '_' + propName"
        :id="entityName + '_' + propName"
      >
        <option v-for="owner in ForeignKeyCall()" :key="owner.id">
          {{
          owner.id
          }}
        </option>
      </select>-->
      <div
        v-if="ForeignKeyCheck(propName)"
        class="ui fluid search selection dropdown"
        @change="Edited(propName, $event.target.value)"
      >
        <input type="hidden" name="state" />
        <i class="dropdown icon" />
        <div class="default text">Select One</div>
        <div class="menu">
          <div
            v-for="foreignKey in ForeignKeyCall()"
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
          v-for="validationErr in validationErrs[propName]"
          :key="validationErr"
          class="item form-validation-err"
        >- {{validationErr}}</li>
      </transition-group>
    </div>
    <div class="field">
      <button class="ui inverted button app-green" type="submit" :disabled="saving">Save Changes?</button>
      <button
        v-if="!newEntity"
        class="ui inverted button app-red"
        type="submit"
        :disabled="saving"
      >Delete This?</button>
    </div>
  </form>
</template>
<script>
//todo Foreign keys will be obj { foreignName: [], foreignName2: [] }
export default {
  props: {
    entity: Object,
    entityName: String,
    saving: Boolean,
    newEntity: Boolean,
    validationErrs: Object
  },
  computed: {
    EntityFilteredCols() {
      return Object.fromEntries(
        Object.entries(this.entity).filter(
          entry => entry[0] !== "created_at" && entry[0] !== "updated_at"
        ) // ? 'entry[0]' used here to grab only the key! We receive arr pairs from entries func!
        // .map(entry => {
        //   entry[0] =
        //     entry[0].toLowerCase() === "id" ||
        //     entry[0].toLowerCase() === "_id"
        //       ? "ID"
        //       : entry[0]
        //           .replace("_", " ")
        //           .trim()
        //           .replace(/\b\w/g, a => a.toUpperCase());
        //   return entry;
        // })
      );
    }
  },
  methods: {
    ProperName(propName) {
      return propName.toLowerCase() === "id" || propName.toLowerCase() === "_id"
        ? "ID"
        : propName
            .replace("_", " ")
            .trim()
            .replace(/\b\w/g, a => a.toUpperCase());
    },
    ForeignKeyCheck(propName) {
      return /_id$/gm.test(propName);
    },
    ForeignKeyCall() {
      this.$emit("foreign");
    },
    EditEntity(propName = null, propVal = null) {
      this.$emit("edit", propName, propVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>