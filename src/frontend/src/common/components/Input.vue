<template>
  <label :class="`input${labelBig ? ' input--big-label' : ''}`">
    <span :class="`${labelHidden ? 'visually-hidden' : ''}`">{{ label }}</span>
    <input
      :type="type"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :required="required"
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
    labelBig: {
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
    value: {
      type: [String, Number],
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
