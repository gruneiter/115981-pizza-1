<template>
  <AppLayout :price="price">
    <h1>Профиль</h1>
  </AppLayout>
</template>

<script>
import AppLayout from "../layouts/AppLayout";
export default {
  name: "Profile",
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
