<template>
  <div class="ui cards" :class="{horizontal: horizontal, 'close-card-set': closeCards}">
    <slot>
      <sui-card v-for="(infoCard, index) in cardSet" :key="infoCard.title" :infoItem="infoCard" :borderless="borderless"
          :fluid='fluid' :horizontal="horizontal" :standalone="false" :ratio="ratio" :hoverable="hoverable"
          :height="cardHeight" :reversed="patternLogic(index) || Checkered(index)" :class="[CardClasses]"
          :fully-centered="fullyCentered" :centered-content="centeredContent" :centered-title="centeredTitle"
          :centered-meta="centeredMeta" :centered-description="centeredDescription" :centered-extra-content="centeredExtraContent"
          :style="[CardStyles]">

            <template #title="{ infoItem }">
              <!-- //* Override title area -->
              <slot name='title' :info-item="infoItem"></slot>
            </template>

            <template #meta="{ infoItem }">
              <!-- //* Override meta / subtitle area -->
              <slot name='meta' :info-item="infoItem"></slot>
            </template>

            <template #description="{ infoItem }">
              <slot name="description" :info-item="infoItem">
              <!-- //* Overrides description (default slot) slot in SuiCard component -->
              </slot>
            </template>

            <template #content="{ infoItem }">
              <!-- //* If total override needed for content area -->
              <slot name="content" :info-item="infoItem"></slot>
            </template>

            <template #footer="{ infoItem }">
              <!-- //* Overrides extra content class div in a SuiCard -->
              <slot name='footer' :info-item="infoItem"></slot>
            </template>
        </sui-card>
    </slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SuiCard from './SuiCard.vue';

export default Vue.extend({
  components: {
    'sui-card': SuiCard
  },
  props: {
    //! Centering Functionality
    fullyCentered: {
      type: Boolean,
      default: false
    },
    verticalCentered: {
      type: Boolean,
      default: false,
    },
    centeredContent: { 
      type: Boolean,
      default: false,
    },
    centeredTitle: {
      type: Boolean,
      default: false
    },
    centeredMeta: {
      type: Boolean,
      default: false
    },
    centeredExtraContent: { 
      type: Boolean,
      default: false,
    },
    centeredDescription: {
      type: Boolean,
      default: false
    },
    //! Basic Fomantic Options
    fluid: {
      type: Boolean,
      default: false
    },
    horizontal: { //* Actually used to style child cards
      type: Boolean,
      default: false
    },
    //* Implementing hover effect
    hoverable: {
      type: [Boolean, Object],
      default: false
    },
    //! Option to stagger/checker pattern it
    //* May combine them in to one simple prop
    checkered: {
      type: Boolean, 
      default: false
    },
    patternLogic: {
      type: Function,
      default: ((): boolean => false)
    },
    //* Card Items
    cardSet: {
      type: Array,
    },
    //! Special styling
    borderless: {
      type: Boolean,
      default: false
    },
    cardHeight: {
      type: Number,
      default: 200
    },
    //* Cards become marginless
    closeCards: {
      type: Boolean,
      default: false,
    },
    //* Ratio between content to image
    ratio: {
      type: String,
      default: '50/50'
    },
    //! In case extra styling needed for individual card itself
    CardClasses: { //* add Classes in from parent
      type: [Array, String, Object],
      default: ''
    },
    CardStyles: {
      type: [Array, String, Object],
      default: ''
    }
  },
  methods: {
    Checkered(index: number) {
      return (this.checkered)
      ? (index+1) % 2 === 0 //* Checks if odd or even and properly changes flex direction: LtR -> RtL
      : false; //* all unified flex direction:  LtR
    }
  },
  provide: function() {
    return {
      checkerPattern: this.checkered,
      cardSet: this.cardSet
    };
  }
})
</script>
<style lang="scss" scoped>
@media screen and (min-width: 481px) {
  div.ui.cards.close-card-set > div.card {
    &:first-child {
      margin-top: 1em;
    }
    margin-top: 0;
    margin-bottom: 0;
    &:last-child {
      margin-bottom: 1em;
    }
  }
}
</style>