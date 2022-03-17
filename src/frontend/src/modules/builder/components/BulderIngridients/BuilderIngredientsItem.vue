<template>
  <li class="ingredients__item">
    <BuilderIngredientsFilling
      :name="name"
      :type="type"
      :count="count"
      :id="id"
    />
    <ItemCounter
      class="ingredients__counter"
      :count="count"
      @changeCount="changeIngredient"
    />
  </li>
</template>

<script>
import ItemCounter from "../../../../common/components/ItemCounter/ItemCounter";
import BuilderIngredientsFilling from "./BuilderIngredientsFilling";
export default {
  name: "BuilderIngredientsItem",
  components: {
    ItemCounter,
    BuilderIngredientsFilling,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changeIngredient(e) {
      const payload = {
        count: e,
        name: this.id,
      };
      this.$store.commit("Builder/changeIngredient", payload);
    },
  },
};
</script>
