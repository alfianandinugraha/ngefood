class MealCard extends HTMLElement {
  static get observedAttributes() {
    return ["image-src", "name", "id", "category", "area", "tags"];
  }

  connectedCallback() {
    const imageSrc = this.getAttribute("image-src");
    const name = this.getAttribute("name");
    const category = this.getAttribute("category");
    const area = this.getAttribute("area");
    const tags = this.getAttribute("tags")?.replaceAll(",", ", ");
    const hasTags = tags !== "null" && tags !== "undefined" && !!tags;

    this.innerHTML = `
      <div class="border-solid rounded-md overflow-hidden shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] relative cursor-pointer hover:scale-105 transition-all">
        <img src="${imageSrc}" alt="${name}" class="h-40 lg:h-60 w-full object-cover" />
        <div class="p-5 bg-white">
          <div class="text-xl font-semibold mb-4">${name}</div>
          <div class="grid grid-cols-2 mb-4">
            <div class="flex items-center text-gray-500 fill-gray-500 text-sm gap-1">
              <box-icon name="category" size="1.2rem"></box-icon>
              <div>${category}</div>
            </div>
            <div class="flex items-center text-gray-500 fill-gray-500 text-sm gap-1">
              <box-icon name="flag" size="1.2rem"></box-icon>
              <div>${area}</div>
            </div>
          </div>
          <div class="flex items-start text-gray-500 fill-gray-500 text-sm gap-1 mb-5">
            <box-icon name="tag" size="1.2rem"></box-icon>
            ${hasTags ? `<div>${tags}</div>` : "<div><i>No Tags</i></div>"}
          </div>
        </div>
      </div>
    `;
  }
}

export default MealCard;
