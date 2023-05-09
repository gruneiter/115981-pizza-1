<template>
  <div class="diameter">
    <label
      v-for="size in sizes.list"
      :key="size.id"
      :class="`diameter__input diameter__input--${size.type}`"
    >
      <RadioButton
        name="diameter"
        :value="size.type"
        :isChecked="size.selected"
        @change="$store.commit('Builder/changeSize', $event.target.value)"
      />
      <span>{{ size.name }}</span>
    </label>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderDiameter",
  components: {
    RadioButton,
  },
  computed: {
    sizes() {
      return this.$store.state.Builder.sizes;
    },
  },
};
</script>
