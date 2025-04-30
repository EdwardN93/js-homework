class RenderHtml {
  constructor(item) {
    this.item = item;
    this.toAppend = document.querySelector("#wrapper");
  }

  html() {
    const html = `<div id="${this.item.toLowerCase()}-wrapper">
                  <span class="${this.item}-vote"></span>
                  <button id="${this.item}">Vote ${this.item}</button>
                </div>`;
    this.toAppend.insertAdjacentHTML("beforeend", html);
  }
}
