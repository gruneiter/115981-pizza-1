<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="sheet__title">Выберите тесто</h2>
            <BuilderDough class="sheet__content" />
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="sheet__title">Выберите размер</h2>
            <BuilderDiameter class="sheet__content" />
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="sheet__title">Выберите ингредиенты</h2>
            <BuilderIngredients class="sheet__content" />
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
            @input="$store.commit('Builder/changeName', $event.target.value)"
          />
          <div class="content__constructor">
            <BuilderPizza />
          </div>

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <Button
              :content="'Готовьте!'"
              :disabled="!(this.hasIngredients && this.pizzaName)"
              @click="submit()"
            />
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDough from "../modules/builder/components/BuilderDough";
import BuilderDiameter from "../modules/builder/components/BuilderDiameter";
import BuilderIngredients from "../modules/builder/components/BulderIngridients/BuilderIngredients";
import BuilderPizza from "../modules/builder/components/BuilderPizza";
import Input from "../common/components/Input";
import Button from "../common/components/Button";

export default {
  name: "IndexHome",
  components: {
    BuilderDough,
    BuilderDiameter,
    BuilderIngredients,
    BuilderPizza,
    Input,
    Button,
  },
  computed: {
    pizzaName() {
      return this.$store.state.Builder.pizzaName;
    },
    price() {
      return this.$store.getters["Builder/getPriceTotal"];
    },
    hasIngredients() {
      return this.$store.getters["Builder/hasIngredients"];
    },
  },
  methods: {
    submit() {
      const isEdit = this.$store.getters["Builder/isEdit"];
      if (!isEdit) this.addToCart();
      else this.editProduct();
      this.$store.commit("Builder/resetState");
    },
    addToCart() {
      const order = this.$store.getters["Builder/pizza"];
      this.$store.commit("Cart/addToCart", order);
      this.$store.commit("Builder/resetState");
    },
    editProduct() {
      const order = this.$store.getters["Builder/pizza"];
      this.$store.commit("Cart/editProduct", order);
      this.$store.commit("Builder/setEdit", false);
      this.$router.push("/cart/");
    },
  },
};
</script>
