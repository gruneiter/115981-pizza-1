<template>
  <AppDrop class="pizza" :class="pizzaClassName" @drop="drop">
    <div class="pizza__wrapper">
      <div
        v-for="item in fillingList"
        :key="item.id"
        class="pizza__filling"
        :class="fillingClassName(item.count, item.type)"
      ></div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "../../../common/components/AppDrop";
import { changeCount } from "../../../common/helpers";
export default {
  name: "BuilderPizza",
  components: {
    AppDrop,
  },
  props: {
    dough: {
      type: String,
      default: "light",
    },
    sauce: {
      type: String,
      default: "tomato",
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    fillingList: function () {
      return this.ingredients.filter((i) => i.count > 0);
    },
    pizzaClassName: function () {
      const dough = this.dough === "large" ? "big" : "small";
      return `pizza--foundation--${dough}-${this.sauce}`;
    },
  },
  methods: {
    drop(e) {
      const count = changeCount(e.count + 1);
      const { id } = e;
      this.$emit("ingredientChange", count, id);
    },
    fillingClassName(count, type) {
      const variants = {
        2: "second",
        3: "third",
      };
      let className = `pizza__filling--${type}`;
      if (count > 1) className += ` pizza__filling--${variants[count]}`;
      return className;
    },
  },
};
</script>
