<template>
  <div class="dough">
    <label
      v-for="d in dough.list"
      :key="d.id"
      :class="`dough__input dough__input--${d.type}`"
    >
      <RadioButton
        :name="'dough'"
        :value="d.type"
        :isChecked="d.selected"
        @change="$store.commit('Builder/changeDough', $event.target.value)"
      />
      <b>{{ d.name }}</b>
      <span>{{ d.description }}</span>
    </label>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";

export default {
  name: "BuilderDough",
  components: {
    RadioButton,
  },
  computed: {
    dough: function () {
      return this.$store.state.Builder.dough;
    },
  },
};
</script>
