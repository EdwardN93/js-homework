class RenderHtml {
  constructor(item) {
    this.item = item;
    this.toAppend = document.querySelector("#wrapper");
  }

  html() {
    const html = `<div id="${this.item.carId.toLowerCase()}-wrapper">
                  <span class="${this.item.carId}-vote"></span>
                  <button id="${this.item.carId}">Vote ${
      this.item.carId
    }</button>
                </div>`;
    this.toAppend.insertAdjacentHTML("beforeend", html);
    console.log(this.item);
  }
}
