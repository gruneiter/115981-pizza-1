<template>
  <input type="text" name="counter" class="counter__input" :value="count" />
</template>

<script>
export default {
  name: "ItemCounterInput",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>
