import clientMeal from "@/utils/http/client-meal";

const mealRepository = {
  /**
   * @returns {Promise<{ meals: Meal[] }>}
   */
  getAll: async () => {
    const { data } = await clientMeal().get("/search.php?s=");
    return data;
  },
  /**
   * @returns {Promise<{ categories: MealCategory[] }>}
   */
  getCategories: async () => {
    const { data } = await clientMeal().get("/categories.php");
    return data;
  },
};

export default mealRepository;

/**
 * @typedef {object} Meal
 * @property {string} idMeal
 * @property {string} strMeal
 * @property {null} strDrinkAlternate
 * @property {string} strCategory
 * @property {string} strArea
 * @property {string} strInstructions
 * @property {string} strMealThumb
 * @property {string} strTags
 * @property {string} strYoutube
 * @property {string} strIngredient1
 * @property {string} strIngredient2
 * @property {string} strIngredient3
 * @property {string} strIngredient4
 * @property {string} strIngredient5
 * @property {string} strIngredient6
 * @property {string} strIngredient7
 * @property {string} strIngredient8
 * @property {string} strIngredient9
 * @property {string} strIngredient10
 * @property {string} strIngredient11
 * @property {string} strIngredient12
 * @property {string} strIngredient13
 * @property {string} strIngredient14
 * @property {string} strIngredient15
 * @property {string} strIngredient16
 * @property {string} strIngredient17
 * @property {string} strIngredient18
 * @property {string} strIngredient19
 * @property {string} strIngredient20
 * @property {string} strMeasure1
 * @property {string} strMeasure2
 * @property {string} strMeasure3
 * @property {string} strMeasure4
 * @property {string} strMeasure5
 * @property {string} strMeasure6
 * @property {string} strMeasure7
 * @property {string} strMeasure8
 * @property {string} strMeasure9
 * @property {string} strMeasure10
 * @property {string} strMeasure11
 * @property {string} strMeasure12
 * @property {string} strMeasure13
 * @property {string} strMeasure14
 * @property {string} strMeasure15
 * @property {string} strMeasure16
 * @property {string} strMeasure17
 * @property {string} strMeasure18
 * @property {string} strMeasure19
 * @property {string} strMeasure20
 * @property {string} strSource
 * @property {null} strImageSource
 * @property {null} strCreativeCommonsConfirmed
 * @property {null} dateModified
 */

/**
 * @typedef {object} MealCategory
 * @property {string} idCategory
 * @property {string} strCategory
 * @property {string} strCategoryThumb
 * @property {string} strCategoryDescription
 */
