<template>
  <div class="diameter">
    <label
      v-for="size in list"
      :key="size.id"
      :class="`diameter__input diameter__input--${size.type}`"
    >
      <RadioButton
        :name="'diameter'"
        :value="size.type"
        :checked="size.selected"
        @change="$emit('sizeChange', $event.target.value)"
      />
      <span>{{ size.name }}</span>
    </label>
  </div>
</template>

<script>
import { getType } from "../../../common/helpers";
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderDiameter",
  components: {
    RadioButton,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getType,
  },
};
</script>
