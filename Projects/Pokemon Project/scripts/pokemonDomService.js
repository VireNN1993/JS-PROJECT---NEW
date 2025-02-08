import { getPokemons } from "./pokemonService.js";

const cardsContainer = document.getElementById("cards");
const searchBox = document.getElementById("searchBox");
let allPokemons = [];

// שליפה של פוקימונים שאהבת מה-local storage
const getLikedPokemons = () => {
  const liked = localStorage.getItem("likedPokemons");
  return liked ? JSON.parse(liked) : [];
};

// שמירת פוקימונים שאהבת
const saveLikedPokemons = (likedPokemons) => {
  localStorage.setItem("likedPokemons", JSON.stringify(likedPokemons));
};

// יצירת קלף פוקימון
const generateCard = (pokemon) => {
  const likedPokemons = getLikedPokemons();
  const card = document.createElement("div");
  card.className = "card m-2 col-sm-12 col-md-3";

  const cardImg = document.createElement("img");
  cardImg.src = pokemon.sprites.front_default;
  cardImg.className = "card-img-top img mt-2 border rounded shadow";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title text-center";
  cardTitle.innerText = pokemon.name;

  const types = document.createElement("p");
  types.className = "card-text text-center";
  types.innerText = `Type: ${pokemon.types.map((t) => t.type.name).join(", ")}`;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  const likeButton = document.createElement("i");
  likeButton.className = "fa fa-heart";
  likeButton.classList.add(
    likedPokemons.includes(pokemon.name) ? "text-danger" : "text-dark"
  );

  likeButton.addEventListener("click", () => {
    const likedPokemons = getLikedPokemons();
    if (likeButton.classList.contains("text-dark")) {
      likedPokemons.push(pokemon.name);
      likeButton.classList.remove("text-dark");
      likeButton.classList.add("text-danger");
    } else {
      const index = likedPokemons.indexOf(pokemon.name);
      if (index > -1) likedPokemons.splice(index, 1);
      likeButton.classList.remove("text-danger");
      likeButton.classList.add("text-dark");
    }
    saveLikedPokemons(likedPokemons);
  });

  cardFooter.appendChild(likeButton);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(types);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  cardsContainer.appendChild(card);
};

// יצירת הקלפים
export const createCards = async () => {
  allPokemons = await getPokemons();
  displayPokemons(allPokemons);
};

// סינון חיפוש
const filterPokemons = (query) => {
  const filtered = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
  displayPokemons(filtered);
};

// הצגת פוקימונים בדף
const displayPokemons = (pokemons) => {
  cardsContainer.innerHTML = "";
  pokemons.forEach((pokemon) => generateCard(pokemon));
};

// חיפוש פוקימונים תוך כדי הקלדה
searchBox.addEventListener("input", (e) => {
  filterPokemons(e.target.value);
});
