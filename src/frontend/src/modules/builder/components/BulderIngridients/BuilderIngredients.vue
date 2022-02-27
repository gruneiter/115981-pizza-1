<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>
      <BuilderIngredientsInput
        v-for="s in sauces"
        :key="s.id"
        class="ingredients__input"
        :isChecked="s.selected"
        :value="s.type"
        :name="s.name"
        @sauceChange="$emit('sauceChange', $event)"
      />
    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">
        <BuilderIngredientsItem
          v-for="i in ingredients"
          :key="i.id"
          :id="i.id"
          :type="i.type"
          :name="i.name"
          :count="i.count"
          @ingredientChange="ingredientChange"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { getType } from "../../../../common/helpers";
import BuilderIngredientsItem from "./BuilderIngredientsItem";
import BuilderIngredientsInput from "./BuilderIngredientsInput";
export default {
  name: "BuilderIngredients",
  components: {
    BuilderIngredientsItem,
    BuilderIngredientsInput,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getType,
    ingredientChange(count, name) {
      this.$emit("ingredientChange", count, name);
    },
  },
};
</script>
