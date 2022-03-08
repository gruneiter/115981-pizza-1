<template>
  <component
    :is="layout"
    :price="price"
    :hasIngredients="hasIngredients"
    :pizzaName="pizzaName"
    @doughChange="$emit('doughChange', $event)"
    @sizeChange="$emit('sizeChange', $event)"
    @sauceChange="$emit('sauceChange', $event)"
    @ingredientChange="$emit('ingredientChange', $event)"
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
    price: {
      type: [Number, String],
      default: 0,
    },
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
