<template>
  <div class="app-layout app-layout--main">
    <Header :price="price" />
    <slot />
  </div>
</template>

<script>
import Header from "../common/components/Header";
export default {
  name: "AppLayoutMain",
  components: {
    Header,
  },
  props: {
    price: {
      type: [Number, String],
      default: 0,
    },
  },
};
</script>
