<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="type" class="select" @change="setDelivery">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Дом</option>
        </select>
      </label>

      <Input
        name="tel"
        placeholder="+7 999-999-99-99"
        :label="'Контактный телефон:'"
        :labelBig="true"
        @change="setDelivery"
      />

      <div class="cart-form__address" v-show="+delivery.type !== 1">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <Input
            :name="'street'"
            :label="'Улица*'"
            :required="true"
            @change="setDelivery"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <Input
            :name="'house'"
            :label="'Дом*'"
            :required="true"
            @change="setDelivery"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <Input
            :name="'apartment'"
            :label="'Квартира'"
            @change="setDelivery"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../../../common/components/Input";

export default {
  name: "CartDelivery",
  components: { Input },
  computed: {
    delivery() {
      return this.$store.getters["Cart/getDelivery"];
    },
  },
  methods: {
    setDelivery(event) {
      const { name, value } = event.target;
      this.$store.commit("Cart/setDelivery", { name, value });
    },
  },
};
</script>

<style scoped></style>
