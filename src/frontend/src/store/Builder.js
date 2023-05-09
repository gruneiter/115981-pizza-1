import pizza from "@/static/pizza.json";
import { types } from "@/common/constants";
import { createProperty, propertyChange } from "@/common/helpers";

function setState() {
  const ingredients = pizza.ingredients;
  ingredients.forEach((i) => {
    i.count = 0;
    i.type = types.ingredients[i.id];
  });
  const dough = createProperty(pizza.dough, types.dough, 0);
  const sauces = createProperty(pizza.sauces, types.sauces, 0);
  const sizes = createProperty(pizza.sizes, types.sizes, 1);
  return {
    ingredients,
    dough,
    sauces,
    sizes,
    pizzaName: "",
    editing: false,
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
    pizza(state, getters) {
      const { pizzaName, ingredients } = state;
      const price = getters["getPriceTotal"];
      const doughSelected = state.dough.selected;
      const saucesSelected = state.sauces.selected;
      const sizesSelected = state.sizes.selected;
      const ingredientsSelected = ingredients
        .map((i) => {
          if (i.count > 0) {
            return {
              id: i.id,
              count: i.count,
              name: i.name,
            };
          }
        })
        .filter((i) => !!i);
      return {
        dough: doughSelected,
        sauce: saucesSelected,
        size: sizesSelected,
        ingredientsSelected,
        name: pizzaName,
        price,
        count: 1,
      };
    },
    isEdit(state) {
      return state.editing;
    },
  },
  mutations: {
    resetState(state) {
      Object.assign(state, setState());
    },
    changeDough(state, payload) {
      propertyChange(state.dough, payload);
    },
    changeSauce(state, payload) {
      propertyChange(state.sauces, payload);
    },
    changeSize(state, payload) {
      propertyChange(state.sizes, payload);
    },
    changeIngredient(state, payload) {
      const item = state.ingredients.find((i) => i.id === payload.name);
      if (item) item.count = payload.count;
    },
    changeName(state, payload) {
      state.pizzaName = payload;
    },
    setEdit(state, status) {
      state.editing = status;
    },
  },
};
