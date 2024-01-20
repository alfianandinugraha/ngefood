class Navbar extends HTMLElement {
  connectedCallback() {
    const menu = [
      {
        name: "Categories",
        icon: "category",
        href: "/#categories",
      },
      {
        name: "Meals",
        icon: "bowl-hot",
        href: "/#meals",
      },
    ];

    this.innerHTML = `
      <div class="flex items-center">
        <div class="text-xl md:text-3xl font-serif text-[#004225] mr-7">
          <b>Ngefood</b>
        </div>
        <div class="flex gap-5">
          ${menu
            .map((item) => {
              return `
                <div class="flex gap-1 items-center cursor-pointer">
                  <box-icon name="${item.icon}" size="1.2rem"></box-icon>
                  <a href="${item.href}">${item.name}</a>
                </div>
              `;
            })
            .join("")}
        </div>
        <div class="ml-auto flex items-center gap-4">
          <a href="https://www.linkedin.com/in/alfianandinugraha/" target="_blank">
            <box-icon name='linkedin-square' type="logo"></box-icon>
          </a>
          <a href="https://github.com/alfianandinugraha" target="_blank">
            <box-icon name='github' type="logo"></box-icon>
          </a>
        </div>
      </div>
    `;
  }
}

export default Navbar;
