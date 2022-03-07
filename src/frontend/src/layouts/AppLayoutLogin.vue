<template>
  <div class="app-layout app-layout--login">
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppLayoutLogin",
  props: {
    price: {
      type: [Number, String],
      default: 0,
    },
  },
};
</script>
