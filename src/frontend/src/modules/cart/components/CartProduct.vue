<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="product.name"
      />
      <div class="product__text">
        <h2>{{ product.name }}</h2>
        <ul>
          <li>{{ product.size.name }}, {{ product.dough.name }}</li>
          <li>Соус: {{ product.sauce.name.toLowerCase() }}</li>
          <li>
            Начинка:
            <template v-for="(i, key) in product.ingredientsSelected">
              {{
                `${i.name.toLowerCase()}${
                  product.ingredientsSelected.length - 1 > key ? ", " : ""
                }`
              }}
            </template>
          </li>
        </ul>
      </div>
    </div>

    <ItemCounter
      :count="product.count"
      :min="0"
      :max="null"
      @changeCount="pizzaCount"
      :color="'orange'"
    />

    <div class="cart-list__price">
      <b>{{ priceFormat(product.price * product.count) }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="toEdit">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter/ItemCounter";
import { priceFormat } from "../../../common/helpers";

export default {
  name: "CartProduct",
  components: { ItemCounter },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pizzaCount(count) {
      const product = this.product;
      if (count > 0) this.$store.commit("Cart/changeCount", { product, count });
      else this.$store.commit("Cart/removeFromCart", product);
    },
    toEdit() {
      const product = this.product;
      this.$store.commit("Cart/setEditStatus", product);
      this.$store.commit("Builder/setEdit", true);
      this.$store.commit("Builder/changeDough", product.dough.type);
      this.$store.commit("Builder/changeSauce", product.sauce.type);
      this.$store.commit("Builder/changeSize", product.size.type);
      product.ingredientsSelected.forEach((i) => {
        const item = { name: i.id, count: i.count };
        this.$store.commit("Builder/changeIngredient", item);
      });
      this.$store.commit("Builder/changeName", product.name);
      this.$router.push("/");
    },
    priceFormat,
  },
};
</script>

<style scoped></style>
