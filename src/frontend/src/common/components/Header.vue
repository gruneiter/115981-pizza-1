<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </RouterLink>
    </div>
    <div class="header__cart">
      <RouterLink to="/cart">{{ price }} ₽</RouterLink>
    </div>
    <div class="header__user">
      <RouterLink to="/login" class="header__login">
        <span>Войти</span>
      </RouterLink>
    </div>
  </header>
</template>

<script>
import { priceFormat } from "../helpers";
export default {
  name: "Header",
  computed: {
    price: function () {
      return priceFormat(this.$store.getters["Cart/getPriceTotal"]);
    },
  },
};
</script>
