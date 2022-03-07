<template>
  <div id="app">
    <RouterView
      @doughChange="propertyChange(dough, $event)"
      @sizeChange="propertyChange(sizes, $event)"
      @sauceChange="propertyChange(sauces, $event)"
      @ingredientChange="ingredientChange"
      @nameChange="nameChange"
      :ingredients="ingredients"
      :dough="dough"
      :sauces="sauces"
      :sizes="sizes"
      :price="priceTotal"
      :hasIngredients="hasIngredients"
      :pizzaName="pizzaName"
    />
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import { types } from "@/common/constants";
import { propertyChange, createProperty } from "@/common/helpers";

export default {
  name: "App",
  data: () => {
    const ingredients = pizza.ingredients;
    ingredients.forEach((i) => {
      i.count = i.count ? i.count : 0;
      i.type = types.ingredients[i.id];
    });
    const dough = createProperty(pizza.dough, types.dough);
    const sauces = createProperty(pizza.sauces, types.sauces);
    const sizes = createProperty(pizza.sizes, types.sizes, 1);

    return {
      ingredients,
      dough,
      sauces,
      sizes,
      hasIngredients: false,
      pizzaName: "",
    };
  },
  computed: {
    priceTotal: function () {
      const ingredients = this.ingredients.filter((i) => i.count > 0);
      const dough = this.dough.selected.price;
      const sauce = this.sauces.selected.price;
      return (
        (ingredients.reduce(
          (partialSum, a) => partialSum + a.count * a.price,
          0
        ) +
          dough +
          sauce) *
        this.sizes.selected.multiplier
      );
    },
    order() {
      const { pizzaName, ingredients, priceTotal } = this;
      const doughSelected = this.dough.selected;
      const saucesSelected = this.sauces.selected;
      const sizesSelected = this.sizes.selected;
      const ingredientsSelected = ingredients
        .map((i) => {
          if (i.count > 0) {
            return {
              id: i.id,
              count: i.count,
            };
          }
        })
        .filter((i) => !!i);
      return {
        dough: doughSelected.id,
        sauce: saucesSelected.id,
        size: sizesSelected.id,
        ingredientsSelected,
        pizzaName,
        priceTotal,
      };
    },
  },
  methods: {
    propertyChange,

    ingredientChange(count, name) {
      const item = this.ingredients.find((i) => i.id === name);
      if (item) item.count = count;
      this.hasIngredients = !!this.ingredients.find((i) => i.count > 0);
      console.log(this.hasIngredients, this.pizzaName);
    },

    nameChange(event) {
      this.pizzaName = event.target.value;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
