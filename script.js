const resultDiv = document.getElementById("result");

function searchRecipe() {
  const query = document.getElementById("searchInput").value.trim();

  if (query === "") {
    resultDiv.innerHTML = "<p>Please enter a recipe name 🍳</p>";
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      if (!data.meals) {
        resultDiv.innerHTML = "<p>No recipe found 😢</p>";
        return;
      }

      const meal = data.meals[0];

      let ingredients = "";
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients += `<li>${meal[`strIngredient${i}`]}</li>`;
        }
      }

      resultDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>

        <h3>Ingredients</h3>
        <ul class="ingredients">${ingredients}</ul>

        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = "<p>Error loading recipe ❌</p>";
      console.error(error);
    });
}
