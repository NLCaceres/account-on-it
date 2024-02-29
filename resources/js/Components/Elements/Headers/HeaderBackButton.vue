<template>
  <div :class="[ reverse ? 'flexed-column-reverse' : 'flexed-column' ]">
    <div :class='[headerClasses]'>
      <h1 class="m-0">
        <slot></slot>
      </h1>
      <div class="ui divider m-xs-t m-sm-b" />
    </div>
    <back-button :steps-back="StepsBack" @go-back="GoBack" :breadcrumb="breadcrumb" :class="[{ 'm-sm-y': reverse, 
      'nega-m-sm-l': reverse & mobile, 'nega-m-lg-l': reverse & tablet, 'nega-m-xl-l': reverse & midDesktop}]"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapGetters } from 'vuex';
import { MID_DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH } from '../../../Store/GetterTypes';
import { APP_MODULE } from '../../../Store/modules/AppState';

export default defineComponent({
  props: {
    stepsBack: {
      type: Number,
      default: -1
    },
    parentHandledBackButton: {
      type: Boolean,
      default: false,
    },
    reversed: {
      type: Boolean,
      default: false
    },
    breadcrumb: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    },
    headerClasses: {
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    StepsBack(): number {
      return (this.parentHandledBackButton) ? 0 : this.stepsBack;
    },
    ...mapGetters(APP_MODULE, { mobile: MOBILE_WIDTH, tablet: TABLET_WIDTH, midDesktop: MID_DESKTOP_WIDTH })
  },
  methods: {
    GoBack() {
      if (this.parentHandledBackButton) this.$emit(this.CustomEvents.GO_BACK); return; 
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