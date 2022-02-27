<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrop",
  props: {
    draggable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onDrop({ dataTransfer }) {
      if (!dataTransfer) return;
      const payload = dataTransfer.getData("payload");
      if (payload) {
        const transfer = JSON.parse(dataTransfer.getData("payload"));
        this.$emit("drop", transfer);
      }
    },
  },
};
</script>
