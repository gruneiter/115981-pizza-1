import pizza from "@/static/pizza.json";
import { types } from "@/common/constants";
import { createProperty, propertyChange } from "@/common/helpers";

function setState() {
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
}

export default {
  namespaced: true,
  state: setState(),
  getters: {
    hasIngredients(state) {
      return !!state.ingredients.find((i) => i.count > 0);
    },
    getPriceTotal(state) {
      const ingredients = state.ingredients.filter((i) => i.count > 0);
      const dough = state.dough.selected.price;
      const sauce = state.sauces.selected.price;
      return (
        (ingredients.reduce(
          (partialSum, a) => partialSum + a.count * a.price,
          0
        ) +
          dough +
          sauce) *
        state.sizes.selected.multiplier
      );
    },
    order(state, getters) {
      const { pizzaName, ingredients } = state;
      const priceTotal = getters["getPriceTotal"];
      const doughSelected = state.dough.selected;
      const saucesSelected = state.sauces.selected;
      const sizesSelected = state.sizes.selected;
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
  mutations: {
    changeDough: function (state, payload) {
      propertyChange(state.dough, payload);
    },
    changeSauce: function (state, payload) {
      propertyChange(state.sauces, payload);
    },
    changeSize: function (state, payload) {
      propertyChange(state.sizes, payload);
    },
    changeIngredient: function (state, payload) {
      const item = state.ingredients.find((i) => i.id === payload.name);
      if (item) item.count = payload.count;
    },
    changeName: function (state, payload) {
      state.pizzaName = payload;
    },
  },
};
