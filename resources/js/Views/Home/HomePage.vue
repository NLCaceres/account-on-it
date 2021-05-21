<template>
  <div class="flexed-column">

    <sui-carousel :img-set='imgSet'>
      <h1 class='absolute-center text-shadowed' :class="[{ 'f-xl':mobile, 'f-lg':tablet || midDesktop, 'f-md': largeDesktop }]">
        Welcome to Account On It!
      </h1>
      <h2 class="absolute-center text-shadowed" :class="[{'f-md': tablet || midDesktop, 'f-sm': largeDesktop }]">
        Your One Stop Shop <br/> For Apartment Managing & Renting
      </h2>
    </sui-carousel>

    <div class="m-xl-y" :class="[(mobile)?'m-0-x':'m-xxl-x', {}]">

      <h1 class="ui center aligned header">Plenty of Reasons to Join!</h1>

      <sui-card-set class="flexed-column inverted" fluid fully-centered :horizontal="tablet || generalDesktop"
        :card-set="infoSet" ratio="50/50" :cardHeight="CardSetHeight" close-cards borderless
        :pattern-logic="(mobile) ? () => false : (index) => (index+1) % 2 === 0" />

    </div>

    <div class="ui divider m-xs-t m-md-b" :class="{'m-xxl-x': !mobile}" />

    <div class="m-xl-y" :class="[(mobile)?'m-xs-x':'m-xxl-x', {}]">

      <h1 class="ui center aligned header">Looking for a place? Check these out!</h1>

      <sui-card-set class='m-md-x flexed-center inverted' fully-centered
        hoverable :card-set="AddressList" ratio="50/50" :cardHeight="500"
        :card-classes="{'flexed-auto-no-shrink m-lg-x':true, 'w-40 max-w-40': midDesktop, 'w-30 max-w-30': largeDesktop}">
          <!--//* Set width and max-width so cards are more consistently sized amongst themselves -->
          <!--//* Max-width preventing flex from stretching too much and width evening things out -->
          <template #title="{ infoItem }">
            {{ infoItem.street }} <!-- Address1 -->
          </template>
          <template #meta="{ infoItem }">
            {{ infoItem.additional_info }} <!-- # of beds, sqft, etc -->
          </template>
          <template #description="{ infoItem }">
            {{ (infoItem.city ? infoItem.city + ', ' : '') + infoItem.state }} <!-- City, State, Postal Code -->
          </template>
      </sui-card-set>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { APP_MODULE } from '../../Store/modules/AppState';
import { MOBILE_WIDTH, TABLET_WIDTH, GENERAL_DESKTOP_WIDTH, MID_DESKTOP_WIDTH, LARGE_DESKTOP_WIDTH } from '../../Store/GetterTypes';
import { RandomAddressList } from "../../Utility/Functions/random_address";
import InfoSet from "../../Utility/Constants/home_page_info_set.json";
import CarouselSet from "../../Utility/Constants/home_page_carousel_img_set.json"
import HouseImgs from "../../Utility/Constants/home_page_home_imgs.json";
import { PropertyWithImg } from '../../Models/PropertyClass';
import { mapGetters } from 'vuex';
import LazyLoadImg from '../../Components/VueHelpers/Images/LazyLoadImg.vue';

export default Vue.extend({
  components: { LazyLoadImg },
  data() {
    return {
      imgSet: CarouselSet,
      infoSet: InfoSet,
      addressList: RandomAddressList(),
    }
  },
  computed: {
    ...mapGetters(APP_MODULE, { mobile: MOBILE_WIDTH, tablet: TABLET_WIDTH, generalDesktop: GENERAL_DESKTOP_WIDTH, 
      midDesktop: MID_DESKTOP_WIDTH, largeDesktop: LARGE_DESKTOP_WIDTH }),
    CardSetHeight(): number { 
      return this.mobile ? 400 : 300;
    },
    AddressList(): PropertyWithImg[] {
      const addressesWithImgs = [];
      for (let i = 0; i < this.addressList.length; i++) {
        const address = this.addressList[i];
        const houseImg = HouseImgs[i];
        addressesWithImgs.push(new PropertyWithImg(address.street, address.city, address.state, 
          address.postal_code, address.additional_info, houseImg));
      }
      return addressesWithImgs;
    },
  }
})
</script>

<style lang="scss" scoped>

div.ui.card {
  height: 350px;
  > div.content { //* Important to include '>' or else it's not specifically DIRECT descendants
    > div {
      color: white;
    }
  }
}

.fixed-h-center { //* Tack on specific stylings to this class
  bottom: 40px;
  width: 45% !important;
  @media screen and (max-width: 480px) {
    bottom: 0;
    width: 100% !important;
  }
}

//! Carousel Slot
h1.absolute-center.text-shadowed {
  top: 30%;
}
h2.absolute-center.text-shadowed {
  top: 50%;
}
</style>