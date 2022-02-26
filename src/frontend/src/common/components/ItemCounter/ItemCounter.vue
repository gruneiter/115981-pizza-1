<template>
  <div class="counter counter--orange">
    <ItemCounterButton
      :type="`minus`"
      @change="$emit('changeCount', changeCount(count - 1))"
      :disabled="count <= minIngredients"
    />
    <ItemCounterInput :count="count" />
    <ItemCounterButton
      :type="`plus`"
      @change="$emit('changeCount', changeCount(count + 1))"
      :disabled="count >= maxIngredients"
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
