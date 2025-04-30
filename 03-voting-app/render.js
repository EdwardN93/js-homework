class RenderHtml {
  constructor(item) {
    this.itemDisplay = item.carId; // "McLaren"
    this.itemDisplayId = item.carId.toLowerCase(); // "mclaren"
    console.log(this.itemDisplayId);
    this.toAppend = document.querySelector("#wrapper");
  }

  html() {
    const html = `  
     <div class="vote-card ${this.itemDisplay}">
      <img src="images/${this.itemDisplay}.jpg" alt="${
      this.itemDisplay
    }" class="car-img" />
      <div class="vote-content">
        <h3 class="car-name">${this.itemDisplay.toUpperCase()}</h3>
        <p class="vote-count ${this.itemDisplay}-vote">Loading...</p>
        <button id="${this.itemDisplayId}" class="vote-btn">Vote ${
      this.itemDisplay
    }</button>
      </div>
    </div>`;
    this.toAppend.insertAdjacentHTML("beforeend", html);
  }
}
