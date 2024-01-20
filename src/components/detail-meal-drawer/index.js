import $ from "cash-dom";
import { pickBy } from "lodash";

class DetailMealDrawer extends HTMLElement {
  static get observedAttributes() {
    // JSON stringified meal data
    return ["json"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div
        id="detail-drawer"
        class="fixed bottom-0 h-full z-50 hidden w-full overflow-y-auto px-5 lg:px-0"
      >
        <div
          id="detail-meal"
          class="h-fit bg-white mx-auto rounded-t-md shadow-lg relative mt-10 xl:w-3/4"
        >
          <div class="p-10">
            <div 
              id="close-detail"
              class="rounded-full w-12 h-12 flex items-center justify-center leading-none bg-white cursor-pointer hover:fill-gray-400 transition-all hover:transition-all absolute top-12 right-12 lg:top-6 lg:right-6 shadow-md lg:shadow-none"
            >
              <box-icon
                name="x"
              ></box-icon>
            </div>
            <div class="flex gap-5 lg:gap-10 flex-col lg:flex-row">
              <img
                id="detail-meal-image"
                src=""
                class="h-56 w-full lg:h-80 lg:w-80 object-cover flex-shrink-0 rounded-md"
              />
              <div class="w-full">
                <div class="text-3xl mb-3 font-serif">
                  <b id="detail-meal-name">
                    <!-- Meal name -->
                  </b>
                </div>
                <div class="flex gap-4 mb-4">
                  <div
                    class="flex items-center text-gray-500 fill-gray-500 text-sm gap-1"
                  >
                    <box-icon name="category" size="1.2rem"></box-icon>
                    <div id="detail-meal-category">
                      <!-- Meal category -->
                    </div>
                  </div>
                  <div
                    class="flex items-center text-gray-500 fill-gray-500 text-sm gap-1"
                  >
                    <box-icon name="flag" size="1.2rem"></box-icon>
                    <div id="detail-meal-country">
                      <!-- Meal country -->
                    </div>
                  </div>
                  <div
                    class="flex items-center text-gray-500 fill-gray-500 text-sm gap-1"
                  >
                    <box-icon name="tag" size="1.2rem"></box-icon>
                    <div id="detail-meal-tags">
                      <!-- Meal tags -->
                    </div>
                  </div>
                </div>
                <div class="flex gap-5 flex-col lg:flex-row">
                  <div class="w-2/6 flex-shrink-0">
                    <div class="text-xl mb-3">
                      <b>Ingredient</b>
                    </div>
                    <ul class="list-disc pl-5" id="detail-meal-ingredients">
                      <!-- Meal ingredients -->
                    </ul>
                  </div>
                  <div>
                    <div class="text-xl mb-3">
                      <b>Instructions</b>
                    </div>
                    <ol class="list-decimal pl-5" id="detail-meal-instructions">
                      <!-- Meal instructions -->
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="text-xl mb-3 mt-5">
                <b>Watch Tutorial</b>
              </div>
            </div>
            <iframe
              class="rounded-md"
              src=""
              id="detail-meal-video"
              height="500"
              width="100%"
            ></iframe>
          </div>
        </div>
      </div>
    `;
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;

    /**
     * @type {import("@/repositories/meal-repositories").Meal}
     */
    const data = JSON.parse(newValue || "{}");

    $("#detail-meal-name", this).text(data.strMeal);
    $("#detail-meal-category", this).text(data.strCategory);
    $("#detail-meal-country", this).text(data.strArea);
    $("#detail-meal-image", this).attr("src", data.strMealThumb);

    /**
     * @type {{ ingredient: string; measure: string; }[]}
     */
    const ingredients = Object.keys(
      // Pick only keys that start with strIngredient or strMeasure
      pickBy(data, (value, key) => {
        return key.startsWith("strIngredient") || key.startsWith("strMeasure");
      }),
    )
      // Transform keys into array of objects
      .reduce((acc, curr) => {
        const regex = new RegExp(/str(\D+)(\d+)/gm).exec(curr);
        const key = regex[1].toLowerCase();
        const index = parseInt(regex[2]);

        acc[index] = {
          ...(acc[index] || {}),
          [key]: data[curr].trim(),
        };

        return acc;
      }, [])
      // Remove empty items
      .filter((item) => item.ingredient && item.measure);

    $("#detail-meal-ingredients", this).replaceWith(
      this.ingredientsListEl(ingredients),
    );

    /**
     * @type {string[]}
     */
    const instructions = data.strInstructions
      .split("\n")
      .filter((item) => !item.startsWith("STEP"))
      .map((item) => item.replace("\r", ""))
      .filter(Boolean);

    $("#detail-meal-instructions", this).replaceWith(
      this.instructionsListEl(instructions),
    );

    $("#detail-meal-video", this).attr(
      "src",
      `https://www.youtube.com/embed/${data.strYoutube.split("=")[1]}`,
    );

    const tags = data.strTags?.replaceAll(",", ", ");
    const hasTags = tags !== "null" && tags !== "undefined" && !!tags;

    $("#detail-meal-tags", this).html(hasTags ? tags : "<i>No Tags</i>");
  }

  /**
   * @param {{ ingredient: string; measure: string; }[]} ingredients
   */
  ingredientsListEl(ingredients) {
    const el = $(document.createElement("ul"));
    el.attr("class", "list-disc pl-5");

    ingredients.forEach((item) => {
      const li = $(document.createElement("li"));
      li.text(`${item.measure} of ${item.ingredient}`);

      el.append(li);
    });

    return el;
  }

  /**
   * @param {string[]} instructions
   */
  instructionsListEl(instructions) {
    const el = $(document.createElement("ol"));
    el.attr("class", "list-decimal pl-5");
    el.attr("id", "detail-meal-instructions");

    instructions.forEach((item) => {
      const li = $(document.createElement("li"));
      li.text(item);

      el.append(li);
    });

    return el;
  }
}

export default DetailMealDrawer;
