<template>
  <div id="app">
    <AppLayout :price="priceTotal">
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
        :hasIngredients="hasIngredients"
        :pizzaName="pizzaName"
        :price="priceTotal"
      />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import pizza from "@/static/pizza.json";
import { types } from "@/common/constants";
import { propertyChange, createProperty } from "@/common/helpers";

export default {
  name: "App",
  components: {
    AppLayout,
  },
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
    hasIngredients() {
      return !!this.ingredients.find((i) => i.count > 0);
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
