<template>
  <AppDrag
    :class="`filling filling--${type}`"
    :data-type="type"
    :draggable="count < 3"
    :transfer="{ id, count }"
  >
    {{ name }}
  </AppDrag>
</template>

<script>
import AppDrag from "../../../../common/components/AppDrag";
export default {
  name: "BuilderIngredientsFilling",
  components: {
    AppDrag,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>
