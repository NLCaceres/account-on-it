<template>
  <div>
    <div v-for="(propVal, propName) in FilteredEntity" :key="propName">
      <h2 class="i-flex border-slim-b-white">{{ propName }}:</h2>
      <h2 class="m-sm-l i-flex">{{ propVal }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    entity: Object,
    entityName: String
  },
  computed: {
    FilteredEntity() {
      return Object.fromEntries(
        Object.entries(this.entity)
          .filter(entry => {
            if (this.$store.state.authentication.user.role === 1) return true;

            //* Checks if Created_at or Updated_at column so they can be filtered out
            const IsCreatedAndUpdated =
              entry[0] === "created_at" || entry[0] === "updated_at";
            //* Case insensitive global search for 'id' or '_id' (also current and claimed for tenants)
            const FoundAdminOnlyColumn = /id|claimed|current/gi.test(entry[0]);

            //* Filter out column if id found in string
            return !IsCreatedAndUpdated && !FoundAdminOnlyColumn;
          }) //* 'entry[0]' used here to grab only the key! We receive [key, val] pairs from entries func!
          .map(entry => {
            entry[0] =
              entry[0].toLowerCase() === "id" ||
              entry[0].toLowerCase() === "_id"
                ? "ID"
                : entry[0]
                    .replace("_", " ")
                    .trim()
                    .replace(/\b\w/g, a => a.toUpperCase());
            return entry;
          })
      );
    },
    Admin() {
      return this.$store.state.authentication.user.role === 1;
    }
  }
};
</script>

