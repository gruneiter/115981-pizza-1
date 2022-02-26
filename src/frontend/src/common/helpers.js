import { maxIngredients, minIngredients } from "./constants";

export const getType = (types, id) => types[id];

export const changeCount = (count) => {
  let res;
  if (count > maxIngredients) res = maxIngredients;
  else if (count > minIngredients) res = count;
  else res = minIngredients;
  return res;
};

export class Property {
  constructor(list, types, selected) {
    this.list = list;
    this.list.forEach((item) => (item.type = types[item.id]));
    this.selectIndex =
      selected && selected < this.list.length && selected > 0 ? selected : 0;
    this.selected = this.list[this.selectIndex];
    this.selected.selected = true;
  }
  propertyChange(type) {
    this.list.forEach((item) => (item.selected = false));
    this.selected = this.list.find((item) => item.type === type);
    this.selected.selected = true;
  }
}
