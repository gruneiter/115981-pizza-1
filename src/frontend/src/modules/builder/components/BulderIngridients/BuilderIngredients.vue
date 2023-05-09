<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>
      <BuilderIngredientsInput
        v-for="s in sauces.list"
        :key="s.id"
        class="ingredients__input"
        :isChecked="s.selected"
        :value="s.type"
        :name="s.name"
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
        />
      </ul>
    </div>
  </div>
</template>

<script>
import BuilderIngredientsItem from "./BuilderIngredientsItem";
import BuilderIngredientsInput from "./BuilderIngredientsInput";
export default {
  name: "BuilderIngredients",
  components: {
    BuilderIngredientsItem,
    BuilderIngredientsInput,
  },
  computed: {
    sauces: function () {
      return this.$store.state.Builder.sauces;
    },
    ingredients: function () {
      return this.$store.state.Builder.ingredients;
    },
  },
};
</script>
