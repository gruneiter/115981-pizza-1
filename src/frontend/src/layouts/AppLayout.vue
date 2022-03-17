<template>
  <component
    :is="layout"
    :hasIngredients="hasIngredients"
    :pizzaName="pizzaName"
    @nameChange="$emit('nameChange', $event)"
  >
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutMain";

export default {
  name: "AppLayout",
  props: {
    hasIngredients: {
      type: Boolean,
      default: true,
    },
    pizzaName: {
      type: String,
      default: "",
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`./${layout}.vue`);
    },
  },
};
</script>

<style scoped></style>
