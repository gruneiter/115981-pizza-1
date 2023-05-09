<template>
  <label class="radio">
    <RadioButton
      :name="'sauce'"
      :value="value"
      :isChecked="isChecked"
      @change="$store.commit('Builder/changeSauce', $event.target.value)"
    />
    <span>{{ name }}</span>
  </label>
</template>

<script>
import RadioButton from "../../../../common/components/RadioButton";

export default {
  name: "BuilderIngredientsInput",
  components: {
    RadioButton,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
