<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="order.length === 0">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet" v-if="order.length > 0">
          <CartProduct
            v-for="(product, key) in order"
            :key="key"
            :product="product"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditionalListItem
              v-for="a in additional"
              :key="a.id"
              :product="a"
              class="sheet"
            />
          </ul>
        </div>
        <CartDelivery />
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <routerLink to="/" class="button button--border button--arrow">
          Хочу еще одну
        </routerLink>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ priceTotal }} ₽</b>
      </div>

      <div class="footer__submit">
        <Button :content="'Оформить заказ'" @click="getOrder" />
      </div>
    </section>
    <cartPopup
      :isPopupOpen="isPopupOpen"
      @closePopup="closePopupHandler"
    />
  </form>
</template>

<script>
import CartProduct from "../modules/cart/components/CartProduct";
import CartAdditionalListItem from "../modules/cart/components/CartAdditionalListItem";
import CartDelivery from "../modules/cart/components/CartDelivery";
import CartPopup from "@/modules/cart/components/CartPopup";
import Button from "../common/components/Button";
import { priceFormat } from "@/common/helpers";

export default {
  name: "Cart",
  components: {
    CartDelivery,
    CartAdditionalListItem,
    CartProduct,
    CartPopup,
    Button,
  },
  data() {
    return {
      isPopupOpen: false,
    };
  },
  methods: {
    getOrder() {
      console.log(this.$store.getters["Cart/getOrder"]);
      this.isPopupOpen = true;
    },
    closePopupHandler() {
      this.isPopupOpen = false;
    },
  },
  computed: {
    order() {
      return this.$store.getters["Cart/getOrder"].pizza;
    },
    additional() {
      return this.$store.state.Cart.additional;
    },
    priceTotal() {
      return priceFormat(this.$store.getters["Cart/getPriceTotal"]);
    },
  },
};
</script>
