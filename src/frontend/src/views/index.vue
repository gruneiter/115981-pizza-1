<template>
  <div>
    <AppLayout :price="priceTotal">
      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <div class="content__dough">
              <div class="sheet">
                <h2 class="sheet__title">Выберите тесто</h2>
                <BuilderDough
                  :list="dough.list"
                  class="sheet__content"
                  @doughChange="dough.propertyChange($event)"
                />
              </div>
            </div>

            <div class="content__diameter">
              <div class="sheet">
                <h2 class="sheet__title">Выберите размер</h2>
                <BuilderDiameter
                  :list="sizes.list"
                  class="sheet__content"
                  @sizeChange="sizes.propertyChange($event)"
                />
              </div>
            </div>

            <div class="content__ingredients">
              <div class="sheet">
                <h2 class="sheet__title">Выберите ингредиенты</h2>
                <BuilderIngredients
                  :sauces="sauces.list"
                  :ingredients="ingredients"
                  class="sheet__content"
                  @sauceChange="sauces.propertyChange($event)"
                  @ingredientChange="ingredientChange"
                />
              </div>
            </div>
            <div class="content__pizza">
              <Input
                :label-hidden="true"
                :label="'Название пиццы'"
                :placeholder="'Введите название пиццы'"
                :name="'pizza_name'"
                :type="'text'"
                @input="nameChange"
              />
              <div class="content__constructor">
                <BuilderPizza
                  :dough="dough.selected.type"
                  :sauce="sauces.selected.type"
                  :ingredients="ingredients"
                  @ingredientChange="ingredientChange"
                />
              </div>

              <div class="content__result">
                <p>Итого: {{ priceTotal }} ₽</p>
                <Button
                  :content="'Готовьте!'"
                  :disabled="!(this.hasIngredients && this.pizzaName)"
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </AppLayout>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import { types } from "@/common/constants";
import { getType, Property } from "@/common/helpers";
import AppLayout from "../layouts/AppLayout";
import BuilderDough from "../modules/builder/components/BuilderDough";
import BuilderDiameter from "../modules/builder/components/BuilderDiameter";
import BuilderIngredients from "../modules/builder/components/BulderIngridients/BuilderIngredients";
import BuilderPizza from "../modules/builder/components/BuilderPizza";
import Input from "../common/components/Input";
import Button from "../common/components/Button";

export default {
  name: "IndexHome",
  components: {
    AppLayout,
    BuilderDough,
    BuilderDiameter,
    BuilderIngredients,
    BuilderPizza,
    Input,
    Button,
  },

  data: () => {
    const ingredients = pizza.ingredients;
    ingredients.forEach((i) => {
      i.count = i.count ? i.count : 0;
      i.type = types.ingredients[i.id];
    });
    const dough = new Property(pizza.dough, types.dough);
    const sauces = new Property(pizza.sauces, types.sauces);
    const sizes = new Property(pizza.sizes, types.sizes, 1);

    return {
      misc,
      pizza,
      user,
      types,
      dough,
      sauces,
      sizes,
      ingredients,
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
    getType,

    ingredientChange(count, name) {
      const item = this.ingredients.find((i) => i.id === name);
      if (item) item.count = count;
      this.hasIngredients = !!this.ingredients.find((i) => i.count > 0);
    },

    nameChange(event) {
      this.pizzaName = event.target.value;
    },
  },
};
</script>
