import additional from "@/static/misc.json";

function setState() {
  additional.forEach((item) => (item.count = 0));
  return {
    additional,
    order: [],
    delivery: {
      type: 1,
      tel: "",
      street: "",
      house: "",
      apartment: "",
    },
  };
}

export default {
  namespaced: true,
  state: setState(),
  getters: {
    getOrder(state) {
      const order = {};
      order.pizza = state.order;
      order.additional = state.additional.filter((item) => item.count > 0);
      return order;
    },
    getDelivery: (state) => state.delivery,
    getPriceTotal(state) {
      let total = 0;
      state.order.forEach((item) => {
        total += item.price * item.count;
      });
      state.additional.forEach((item) => {
        total += item.price * item.count;
      });
      return total;
    },
  },
  mutations: {
    addToCart(state, payload) {
      state.order.push(payload);
    },
    changeCount(state, { product, count }) {
      const index = state.order.indexOf(product);
      if (index >= 0) state.order[index].count = count;
    },
    editProduct(state, product) {
      const { order } = state;
      const item = order.find((item) => item.editing);
      Object.keys(item).forEach((key) => {
        if (key !== "count") item[key] = product[key] || item[key];
      });
      delete item.editing;
    },
    setEditStatus(state, product) {
      const index = state.order.indexOf(product);
      if (index >= 0) state.order[index].editing = true;
    },
    removeFromCart(state, product) {
      const index = state.order.indexOf(product);
      if (index >= 0) state.order.splice(index, 1);
    },
    changeAdditional(state, { product, count }) {
      const index = state.additional.indexOf(product);
      if (index >= 0) state.additional[index].count = count;
    },
    setDelivery(state, { name, value }) {
      state.delivery[name] = value;
    },
  },
};
