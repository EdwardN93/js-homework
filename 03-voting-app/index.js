class CarVote {
  constructor(carId, apiKey) {
    this.carId = carId;
    this.apiKey = apiKey;
    this.button = document.querySelector(`#${carId.toLowerCase()}`);
    this.display = document.querySelector(`.${carId}-vote`);
    this.button.addEventListener("click", () => this.fetchVotes(true));
  }

  get options() {
    return {
      headers: {
        "X-Api-Key": this.apiKey,
        "Content-type": "application/json",
      },
    };
  }

  async fetchVotes(hit = false) {
    this.setLoading(true);
    const hitParam = hit ? "&hit=true" : "";
    const url = `https://api.api-ninjas.com/v1/counter?id=${this.carId}${hitParam}`;
    try {
      const response = await fetch(url, this.options);
      const data = await response.json();
      this.display.textContent = `${data.value} votes`;
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(isLoading) {
    this.button.disabled = isLoading;
    this.button.textContent = isLoading ? "Loading..." : `Vote ${this.carId}`;
  }
}

const cars = ["McLaren", "Mercedes", "Ferrari", "Lamborghini"];

cars.forEach((carId) => {
  new RenderHtml({ carId }).html();
});

const carVotes = cars.map((carId) => new CarVote(carId, API_KEY));
carVotes.forEach((cv) => cv.fetchVotes());
