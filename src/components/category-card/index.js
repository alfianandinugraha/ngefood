class CategoryCard extends HTMLElement {
  connectedCallback() {
    const imageSrc = this.getAttribute("imageSrc");
    const name = this.getAttribute("name");

    this.innerHTML = `
      <div class="rounded-md overflow-hidden relative h-20 bg-white hover:bg-[#004225] hover:scale-105 transition-all">
        <img src="${imageSrc}" alt="${name}" class="h-20 w-full object-cover" />
        <div class="absolute z-10 top-0 left-0 bottom-0 right-0 from-[#004225] bg-gradient-to-t to-transparent"></div>
        <div class="absolute z-20 left-4 bottom-3">
          <div class="text-base md:text-lg text-white">${name}</div>
        </div>
      </div>
    `;
  }
}

export default CategoryCard;
