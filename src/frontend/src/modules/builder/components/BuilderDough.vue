<template>
  <div class="dough">
    <label
      v-for="d in list"
      :key="d.id"
      :class="`dough__input dough__input--${d.type}`"
    >
      <RadioButton
        :name="'dough'"
        :value="d.type"
        :isChecked="d.selected"
        @change="$emit('doughChange', $event.target.value)"
      />
      <b>{{ d.name }}</b>
      <span>{{ d.description }}</span>
    </label>
  </div>
</template>

<script>
import { getType } from "../../../common/helpers";
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderDough",
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
