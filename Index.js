const SearchBox = document.querySelector(".Searchbox"); // Corrected class name
console.log(SearchBox, "SearchBox");

const SearchBtn = document.querySelector(".SearchBtn"); // Ensure button has class "SearchBtn" in HTML
console.log(SearchBtn, "SearchBtn");

const recipe_container = document.querySelector(".recipe-container");

const recipeDetailsContent = document.querySelector(".recipe-details-content"); // This is correct
console.log(recipeDetailsContent, "recipe-container");

const recipeDetails = document.querySelector(".recipe-details"); // Select the popup modal

const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipies = async (query) => {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  console.log(response.meals, "response");

  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("bg-white", "rounded-lg", "shadow-lg", "p-4");

    recipeDiv.innerHTML = `
      
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover rounded-md">
            <h3 class="text-xl font-semibold text-gray-700 mt-2">${meal.strMeal}</h3>
            <p class="text-xl  text-gray-700 mt-2">${meal.strArea}</p>
            
              <p class="text-xl text-gray-700 mt-2">${meal.strCategory}</p>
            <button class="view-recipe bg-red-500 text-white px-4 py-2 rounded mt-2" data-id="${meal.idMeal}">View Recipe</button>


    `;
    // Select the button inside the newly created recipeDiv
    const button = recipeDiv.querySelector(".view-recipe");

    // Add event listener to the button
    button.addEventListener("click", () => {
      console.log("view recipe pop");

      openRecipePopup(meal);
    });

    recipe_container.appendChild(recipeDiv);
  });
};
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredients = meal[`strIngredient${i}`];
    if (ingredients) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li class="text-gray-700 bg-gray-100 px-3 py-1 rounded-md">${measure} ${ingredients}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h3 class="text-xl font-semibold text-gray-700 mt-2">${meal.strMeal}</h3>
       <h3 class="text-xl font-semibold text-gray-700 mt-2" >Ingredents:</h3>
       <ul class="list-none space-y-2 mt-2">${fetchIngredients(meal)}</ul>
    `;

  // Show the popup
  recipeDetails.classList.remove("hidden");

  // 🔹 Disable background scrolling when popup is open
  document.body.style.overflow = "hidden";
};

// Function to close the popup
const closeRecipePopup = () => {
  recipeDetails.classList.add("hidden");

  // 🔹 Re-enable scrolling when popup is closed
  document.body.style.overflow = "auto";
};

// Attach event listener to close button
recipeCloseBtn.addEventListener("click", closeRecipePopup);

SearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const SearchInput = SearchBox.value.trim();
  fetchRecipies(SearchInput);
  console.log("button clicked");
});
