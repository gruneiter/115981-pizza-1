<template>
  <label class="input">
    <span :class="`${labelHidden ? 'visually-hidden' : ''}`">{{ label }}</span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
  </label>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: {
      type: String,
      required: true,
      validator: (l) => l.length,
    },
    labelHidden: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      validator: (l) => l.length,
    },
    type: {
      type: String,
      default: "text",
      validator: (l) => l.length,
    },
  },
};
</script>
