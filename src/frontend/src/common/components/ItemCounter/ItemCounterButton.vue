<template>
  <button
    type="button"
    :class="`counter__button counter__button--${type}`"
    :disabled="isDisabled"
    @click="$emit('change')"
  >
    <span class="visually-hidden">{{ buttonName[type] }}</span>
  </button>
</template>

<script>
export default {
  name: "ItemCounterButton",
  props: {
    type: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    const buttonName = {
      minus: "Меньше",
      plus: "Больше",
    };
    return {
      buttonName,
    };
  },
};
</script>
