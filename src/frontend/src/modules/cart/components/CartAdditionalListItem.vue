<template>
  <li class="additional-list__item">
    <p class="additional-list__description">
      <img :src="image" width="39" height="60" :alt="product.name" />
      <span>{{ product.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        :count="product.count"
        :max="null"
        class="additional-list__counter"
        :color="'orange'"
        @changeCount="additionalCount"
      />

      <div class="additional-list__price">
        <b>× {{ product.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter/ItemCounter";

export default {
  name: "BuilderAdditionalListItem",
  components: { ItemCounter },
  modules: {
    ItemCounter,
  },
  methods: {
    additionalCount(count) {
      const { product } = this;
      this.$store.commit("Cart/changeAdditional", { product, count });
    },
  },
  data() {
    const { image } = this.product;
    return {
      image: require(`@/assets${image.slice(image.indexOf("/img"))}`),
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
