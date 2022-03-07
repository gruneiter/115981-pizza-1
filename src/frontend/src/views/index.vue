<template>
  <div>
    <AppLayout :price="price">
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
                  @doughChange="$emit('doughChange', $event)"
                />
              </div>
            </div>

            <div class="content__diameter">
              <div class="sheet">
                <h2 class="sheet__title">Выберите размер</h2>
                <BuilderDiameter
                  :list="sizes.list"
                  class="sheet__content"
                  @sizeChange="$emit('sizeChange', $event)"
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
                  @sauceChange="$emit('sauceChange', $event)"
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
                :value="pizzaName"
                @input="$emit('nameChange', $event)"
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
                <p>Итого: {{ price }} ₽</p>
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
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    dough: {
      type: Object,
      required: true,
    },
    sauces: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    hasIngredients: {
      type: Boolean,
      default: true,
    },
    pizzaName: {
      type: String,
      default: "",
    },
  },
  methods: {
    ingredientChange(count, name) {
      this.$emit("ingredientChange", count, name);
    },
  },
};
</script>
