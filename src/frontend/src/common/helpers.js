import { maxIngredients, minIngredients } from "./constants";

export const changeCount = (count) => {
  let res;
  if (count > maxIngredients) res = maxIngredients;
  else if (count > minIngredients) res = count;
  else res = minIngredients;
  return res;
};

export const createProperty = (list, types, selected) => {
  const listWithTypes = list;
  listWithTypes.forEach((item) => (item.type = types[item.id]));
  const selectIndex =
    selected && selected < listWithTypes.length && selected > 0 ? selected : 0;
  listWithTypes[selectIndex].selected = true;
  return {
    list: listWithTypes,
    selected: listWithTypes[selectIndex],
    selectIndex,
  };
};

export const propertyChange = (obj, type) => {
  obj.list.forEach((item) => (item.selected = false));
  obj.selected = obj.list.find((item) => item.type === type);
  obj.selected.selected = true;
};
