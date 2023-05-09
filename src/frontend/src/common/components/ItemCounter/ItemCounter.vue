<template>
  <div class="counter">
    <ItemCounterButton
      :type="`minus`"
      @change="$emit('changeCount', changeCount(count - 1, min, max))"
      :disabled="count <= min"
    />
    <ItemCounterInput :count="count" />
    <ItemCounterButton
      :type="`plus`"
      @change="$emit('changeCount', changeCount(count + 1, min, max))"
      :disabled="max !== null && count >= max"
      :color="color"
    />
  </div>
</template>

<script>
import ItemCounterButton from "./ItemCounterButton";
import ItemCounterInput from "./ItemCounterInput";
import { minIngredients, maxIngredients } from "../../constants";
import { changeCount } from "../../helpers";

export default {
  name: "ItemCounter",
  components: { ItemCounterButton, ItemCounterInput },
  props: {
    count: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: minIngredients,
    },
    max: {
      type: Number,
      default: maxIngredients,
    },
    color: {
      type: String,
      default: "default",
    },
  },
  data: () => {
    return {
      minIngredients,
      maxIngredients,
    };
  },
  methods: {
    changeCount,
  },
};
</script>
