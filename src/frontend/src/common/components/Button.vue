<template>
  <component :is="tag" :type="type" :class="className" :disabled="isDisabled">
    {{ content }}
  </component>
</template>

<script>
export default {
  name: "Button",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    appearance: {
      type: String,
      validator: (t) => ["border", "transparent"].filter((i) => i === t),
    },
    content: {
      type: String,
    },
    arrow: {
      type: Boolean,
      default: false,
      validator: (v) => typeof v === "boolean",
    },
    isDisabled: {
      type: Boolean,
      default: false,
      validator: (d) => typeof d === "boolean",
    },
  },
  computed: {
    className() {
      const classList = ["button"];
      if (this.appearance) classList.push(`button--${this.appearance}`);
      if (this.arrow) classList.push("button--arrow");
      return classList.join(" ");
    },
    type() {
      return this.tag === "button" ? "button" : false;
    },
  },
};
</script>
