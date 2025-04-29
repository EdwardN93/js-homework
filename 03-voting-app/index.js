const API_KEY = `kT9nWX/DQJB8hw5UyjGGYg==wEbNP4vTGxttHScM`;
const btnVoteForMcLaren = document.querySelector("#mclaren");
const btnVoteForMercedes = document.querySelector("#mercedes");
const btnVoteForFerrari = document.querySelector("#ferrari");
const btnVoteForLamborghini = document.querySelector("#lamborghini");

const buttons = [
  btnVoteForFerrari,
  btnVoteForMercedes,
  btnVoteForMcLaren,
  btnVoteForLamborghini,
];

buttons.forEach((button) => {
  button.disabled = true;
});

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": API_KEY,
    "Content-type": "application/json",
  },
};

const getVotes = async (id) => {
  const url = `https://api.api-ninjas.com/v1/counter?id=${id}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    document.querySelector(`.${id}-vote`).textContent = data.value;
  } catch (error) {
    console.error(error);
  } finally {
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
};

const vote = async (event) => {
  const id = event.target.id;
  event.target.disabled = true;

  const url = `https://api.api-ninjas.com/v1/counter?id=${id}&hit=true`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    console.log(data);

    await getVotes(id);
  } catch (error) {
    console.error(error);
  } finally {
    event.target.disabled = false;
  }
};

btnVoteForMcLaren.addEventListener("click", vote);
btnVoteForMercedes.addEventListener("click", vote);
btnVoteForFerrari.addEventListener("click", vote);
btnVoteForLamborghini.addEventListener("click", vote);

getVotes("mclaren");
getVotes("mercedes");
getVotes("ferrari");
getVotes("lamborghini");
