import { createStore } from "zustand";

const detailMealStore = createStore(() => {
  return /** @type {import("@/repositories/meal-repositories").Meal | null} */ (
    null
  );
});

export default detailMealStore;
