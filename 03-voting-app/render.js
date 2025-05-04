class RenderHtml {
  constructor(item) {
    this.itemDisplay = item.carId; // brand name
    this.lowerCaseId = item.carId.toLowerCase(); // lower-case brand name for setting id
    this.toAppend = document.querySelector("#wrapper");
  }

  html() {
    const html = `  
     <div class="vote-card ${this.lowerCaseId}">
      <img src="images/${this.lowerCaseId}.jpg" alt="${
      this.itemDisplay
    }" class="car-img" />
      <div class="vote-content">
        <h2 class="car-name">${this.itemDisplay.toUpperCase()}</h2>
        <p class="vote-count ${this.itemDisplay}-vote">Loading...</p>
        <button id="${this.lowerCaseId}" class="vote-btn">Vote ${
      this.itemDisplay
    }</button>
      </div>
    </div>`;
    this.toAppend.insertAdjacentHTML("beforeend", html);
  }
}
