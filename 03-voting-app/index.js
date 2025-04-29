const API_KEY = `kT9nWX/DQJB8hw5UyjGGYg==wEbNP4vTGxttHScM`;

class CarVote {
  constructor(carId, apiKey) {
    this.carId = carId;
    this.apiKey = apiKey;
    this.button = document.querySelector(`#${carId}`);
    this.display = document.querySelector(`.${carId}-vote`);
    this.button.addEventListener("click", () => this.vote());
  }

  get options() {
    return {
      method: "GET",
      headers: {
        "X-Api-Key": this.apiKey,
        "Content-type": "application/json",
      },
    };
  }

  async fetchVotes() {
    const url = `https://api.api-ninjas.com/v1/counter?id=${this.carId}`;
    console.log(this.carId);
    try {
      const response = await fetch(url, this.options);
      const data = await response.json();
      console.log(data);
      this.display.textContent = data.value;
    } catch (err) {
      console.error(err);
    }
  }

  async vote() {
    this.button.disabled = true;
    const url = `https://api.api-ninjas.com/v1/counter?id=${this.carId}&hit=true`;
    try {
      const response = await fetch(url, this.options);
      const data = await response.json();
      console.log(`Voted for ${this.carId}:`, data);
      await this.fetchVotes();
    } catch (err) {
      console.error(err);
    } finally {
      this.button.disabled = false;
    }
  }
}

const mcLarenVote = new CarVote("mclaren", API_KEY);
const mercedesVote = new CarVote("mercedes", API_KEY);
const ferrariVote = new CarVote("ferrari", API_KEY);
const lamborghiniVote = new CarVote("lamborghini", API_KEY);

mcLarenVote.fetchVotes();
mercedesVote.fetchVotes();
ferrariVote.fetchVotes();
lamborghiniVote.fetchVotes();
