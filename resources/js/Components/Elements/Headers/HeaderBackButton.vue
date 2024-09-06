<template>
  <div :class="[reverse ? 'flexed-column-reverse' : 'flexed-column']">
    <div :class="[headerClasses]">
      <h1 class="m-0">
        <slot />
      </h1>
      <div class="ui divider m-xs-t m-sm-b" />
    </div>
    <back-button :steps-back="StepsBack"
                 :class="[{
                   'm-sm-y': reverse, 'nega-m-sm-l': reverse && mobile, 'nega-m-lg-l': reverse && tablet,
                   'nega-m-xl-l': reverse && midDesktop
                 }]"
                 :breadcrumb @go-back="GoBack" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { mapGetters } from "vuex";
import { APP_MODULE } from "@/Store/modules/AppState";
import { MID_DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH } from "@/Store/GetterTypes";

export default defineComponent({
  props: {
    stepsBack: {
      type: Number,
      default: -1
    },
    breadcrumb: Boolean,
    parentHandledBackButton: Boolean,
    reverse: Boolean,
    headerClasses: {
      type: [String, Array] as PropType<string | string[]>,
      default: ""
    }
  },
  emits: ["go-back"],
  computed: {
    ...mapGetters(APP_MODULE, { mobile: MOBILE_WIDTH, tablet: TABLET_WIDTH, midDesktop: MID_DESKTOP_WIDTH }),
    StepsBack(): number {
      return (this.parentHandledBackButton) ? 0 : this.stepsBack;
    },
  },
  methods: {
    GoBack() {
      if (this.parentHandledBackButton) {
        this.$emit("go-back");
        return;
      }
    }
  },
});
</script>

<style lang="scss" scoped>
@media screen and (min-width: 481px) and (max-width: 720px) {
  div.m-sm-y {
    margin-left: -0.5em !important;
  }
}
@media screen and (min-width: 721px) and (max-width: 769px) {
  div.m-sm-y {
    margin-left: -1em !important;
  }
}

</style>