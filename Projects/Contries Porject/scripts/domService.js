import { countries, reset, search } from "./countriesService.js";

const cardsContainer = document.getElementById("cards");

// Helper function to get liked countries from Local Storage
const getLikedCountries = () => {
  const liked = localStorage.getItem("likedCountries");
  return liked ? JSON.parse(liked) : [];
};

// Helper function to save liked countries to Local Storage
const saveLikedCountries = (likedCountries) => {
  localStorage.setItem("likedCountries", JSON.stringify(likedCountries));
};

document.getElementById("search-input").addEventListener("input", (event) => {
  reset();
  cardsContainer.innerHTML = "";

  if (!event.target.value || event.target.value === "") {
    createCards();
  } else {
    search(event.target.value);
    createCards();
  }
});

const generateCard = (country) => {
  const likedCountries = getLikedCountries();

  // create a card & style it
  const card = document.createElement("div");
  card.className = "card m-2 col-sm-12 col-md-3";

  // create an image, style it and set the source
  const cardImg = document.createElement("img");
  cardImg.src = country.flags.png;
  cardImg.className = "card-img-top img mt-2 border rounded shadow";

  // create a card body, style it
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // create a card title, style it and set the text
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = country.name.common;

  // create a paragraph for population, style it and set the text
  const population = document.createElement("p");
  population.className = "card-text";
  population.innerText = `Population: ${country.population}`;

  // create a paragraph for region, style it and set the text
  const region = document.createElement("p");
  region.className = "card-text";
  region.innerText = `Region: ${country.region}`;

  // create a card footer, style it
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  // create a heart icon, style it
  let heartIcon = document.createElement("i");
  heartIcon.className = "fa fa-heart";
  heartIcon.classList.add(
    likedCountries.includes(country.name.common) ? "text-danger" : "text-dark"
  );

  heartIcon.addEventListener("click", () => {
    const likedCountries = getLikedCountries();
    if (heartIcon.classList.contains("text-dark")) {
      // Add to liked countries
      likedCountries.push(country.name.common);
      heartIcon.classList.remove("text-dark");
      heartIcon.classList.add("text-danger");
    } else {
      // Remove from liked countries
      const index = likedCountries.indexOf(country.name.common);
      if (index > -1) {
        likedCountries.splice(index, 1);
      }
      heartIcon.classList.remove("text-danger");
      heartIcon.classList.add("text-dark");
    }
    saveLikedCountries(likedCountries);
  });

  // add the heart icon to the card footer
  cardFooter.appendChild(heartIcon);

  // add the card title, population and region to the card body
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(population);
  cardBody.appendChild(region);

  // add the image, card body and card footer to the card
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  // append the card to the cards container
  cardsContainer.appendChild(card);
};

// create cards for all countries in the array
const createCards = () => {
  for (const country of countries) {
    generateCard(country);
  }
};

export { createCards };
