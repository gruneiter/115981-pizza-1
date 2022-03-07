<template>
  <AppLayout :price="price">
    <h1>Корзина</h1>
  </AppLayout>
</template>

<script>
import AppLayout from "../layouts/AppLayout";
export default {
  name: "Cart",
  components: {
    AppLayout,
  },
  props: {
    price: {
      type: Number,
      default: 0,
    },
  },
};
</script>
