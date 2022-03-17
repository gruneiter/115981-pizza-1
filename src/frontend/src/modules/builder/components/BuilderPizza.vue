<template>
  <AppDrop class="pizza" :class="pizzaClassName" @drop="drop">
    <div class="pizza__wrapper">
      <template v-for="item in fillingList">
        <div :key="item.name">
          <div
            v-for="n in item.count"
            :key="n"
            class="pizza__filling"
            :class="fillingClassName(n, item.type)"
          ></div>
        </div>
      </template>
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
  computed: {
    fillingList: function () {
      return this.$store.state.Builder.ingredients.filter((i) => i.count > 0);
    },
    pizzaClassName: function () {
      const dough = this.dough === "large" ? "big" : "small";
      return `pizza--foundation--${dough}-${this.sauce}`;
    },
    dough: function () {
      return this.$store.state.Builder.dough.selected.type;
    },
    sauce: function () {
      return this.$store.state.Builder.sauces.selected.type;
    },
  },
  methods: {
    drop(e) {
      const payload = {
        count: changeCount(e.count + 1),
        name: e.id,
      };
      this.$store.commit("Builder/changeIngredient", payload);
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
