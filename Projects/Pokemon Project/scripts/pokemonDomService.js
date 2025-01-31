import { getPokemons } from "./pokemonService.js";

const cardsContainer = document.getElementById("cards");

// Helper function to get liked Pokémon from Local Storage
const getLikedPokemons = () => {
  const liked = localStorage.getItem("likedPokemons");
  return liked ? JSON.parse(liked) : [];
};

// Helper function to save liked Pokémon to Local Storage
const saveLikedPokemons = (likedPokemons) => {
  localStorage.setItem("likedPokemons", JSON.stringify(likedPokemons));
};

// Function to generate a card for each Pokémon
const generateCard = (pokemon) => {
  const likedPokemons = getLikedPokemons();

  const card = document.createElement("div");
  card.className = "card m-2 col-sm-12 col-md-3";

  // Pokémon image
  const cardImg = document.createElement("img");
  cardImg.src = pokemon.sprites.front_default; // Image of the Pokémon
  cardImg.className = "card-img-top img mt-2 border rounded shadow";

  // Card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Pokémon name
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title text-center";
  cardTitle.innerText = pokemon.name;

  // Pokémon types
  const types = document.createElement("p");
  types.className = "card-text text-center";
  types.innerText = `Type: ${pokemon.types.map((t) => t.type.name).join(", ")}`;

  // Add like button
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  const likeButton = document.createElement("i");
  likeButton.className = "fa fa-heart"; // Font Awesome heart icon
  likeButton.classList.add(
    likedPokemons.includes(pokemon.name) ? "text-danger" : "text-dark"
  );

  likeButton.addEventListener("click", () => {
    const likedPokemons = getLikedPokemons();
    if (likeButton.classList.contains("text-dark")) {
      // Add to liked Pokémon
      likedPokemons.push(pokemon.name);
      likeButton.classList.remove("text-dark");
      likeButton.classList.add("text-danger");
    } else {
      // Remove from liked Pokémon
      const index = likedPokemons.indexOf(pokemon.name);
      if (index > -1) {
        likedPokemons.splice(index, 1);
      }
      likeButton.classList.remove("text-danger");
      likeButton.classList.add("text-dark");
    }
    saveLikedPokemons(likedPokemons);
  });

  cardFooter.appendChild(likeButton);

  // Append elements to card
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(types);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  cardsContainer.appendChild(card);
};

// Function to create all cards
export const createCards = async () => {
  const pokemons = await getPokemons(); // Fetch Pokémon data
  cardsContainer.innerHTML = ""; // Clear previous content
  pokemons.forEach((pokemon) => generateCard(pokemon));
};
