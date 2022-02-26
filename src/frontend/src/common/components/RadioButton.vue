<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    :checked="isChecked"
    class="visually-hidden"
    @change="$emit('change', $event)"
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
      validator: (c) => typeof c === "boolean",
    },
  },
};
</script>
