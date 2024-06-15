<template>
  <div class="ui cards" :class="{horizontal: horizontal, 'close-card-set': closeCards}">
    <slot>
      <sui-card v-for="(infoCard, index) in cardSet" :key="infoCard.title" :infoItem="infoCard" :borderless="borderless"
        :fluid='fluid' :horizontal="horizontal" :standalone="false" :ratio="ratio" :hoverable="hoverable"
        :height="cardHeight" :reversed="patternLogic ? patternLogic(index) : Checkered(index)" :class="CardClasses" :style="CardStyles"
        :fully-centered="fullyCentered" :centered-content="centeredContent" :centered-title="centeredTitle" :vertical-centered="verticalCentered"
        :centered-meta="centeredMeta" :centered-description="centeredDescription" :centered-extra-content="centeredExtraContent">

          <template #title="infoItem">
            <!-- - Override title area -->
            <slot name='title' v-bind="infoItem"></slot>
          </template>

          <template #meta="infoItem">
            <!-- - Override meta / subtitle area -->
            <slot name='meta' v-bind="infoItem"></slot>
          </template>

          <template #description="infoItem">
            <!-- - Overrides description (default slot) slot in SuiCard component -->
            <slot name="description" v-bind="infoItem"></slot>
          </template>

          <template #content="infoItem">
            <!-- - If total override needed for content area -->
            <slot name="content" v-bind="infoItem"></slot>
          </template>

          <!-- ?: The v-if on a named-template containing another named-slot didn't work in Vue2 BUT Vue3's dynamic slots seems to have allowed it -->
          <!-- ?: As a bonus, it eliminates the need to check for a footer-slot in SuiCard -->
          <template #footer="infoItem" v-if="$slots.footer">
            <!-- - Overrides extra content class div in a SuiCard -->
            <slot name='footer' v-bind="infoItem"></slot>
          </template>
      </sui-card>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue"
import SuiCard from './SuiCard.vue';
import type CardItem from "@/Utility/Models/CardItem";

export default defineComponent({
  components: {
    'sui-card': SuiCard
  },
  props: {
    // !: Centering Functionality
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
    // !: Basic Fomantic Options
    fluid: {
      type: Boolean,
      default: false
    },
    horizontal: { // - Actually used to style child cards
      type: Boolean,
      default: false
    },
    // - Implementing hover effect
    hoverable: {
      type: Boolean,
      default: false
    },
    // !: Option to stagger/checker pattern it
    // - May combine them in to one simple prop
    checkered: {
      type: Boolean,
      default: false
    },
    // ?: If not using the `required` prop, it seems all props are possibly undefined (optional) by default
    patternLogic: Function as PropType<(cardIndex: number) => boolean>,
    // - Card Items
    cardSet: {
      type: Array as PropType<CardItem[]>,
      default: []
    },
    // !: Special styling
    borderless: {
      type: Boolean,
      default: false
    },
    cardHeight: {
      type: Number,
      default: 200
    },
    // - Cards become marginless
    closeCards: {
      type: Boolean,
      default: false,
    },
    // - Ratio between content to image
    ratio: {
      type: String,
      default: '50/50'
    },
    // !: In case extra styling needed for individual card itself
    CardClasses: { // ?: Classes can be added in one of 3 styles: 1. "foo bar"  2.{ foo: isActive, bar: isNotActive }  3. ["foo", "bar"]
      type: [Array, String, Object], // ?: All three styles will be merged into any existing classes properly
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
        ? (index+1) % 2 === 0 // - Checks if odd or even and properly changes flex direction: LtR -> RtL
        : false; // - all unified flex direction:  LtR
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