<template>
  <AppLayout :price="price">
    <h1>Заказы</h1>
  </AppLayout>
</template>

<script>
import AppLayout from "../layouts/AppLayout";
export default {
  name: "Orders",
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
