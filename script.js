const resultDiv = document.getElementById("result");

function searchRecipe() {
  let query = document.getElementById("searchInput").value.trim();

  if (!query) {
    resultDiv.innerHTML = "<p>❗ Please enter recipe name</p>";
    return;
  }

  resultDiv.innerHTML = "<p>🔍 Searching recipes...</p>";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        resultDiv.innerHTML = `<p>❌ No recipe found for "${query}"</p>`;
        return;
      }

      resultDiv.innerHTML = "";

      data.meals.forEach(meal => {
        resultDiv.innerHTML += `
          <div class="card">
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p><b>Category:</b> ${meal.strCategory}</p>
            <p><b>Area:</b> ${meal.strArea}</p>

            <details>
              <summary>View Recipe</summary>
              <p>${meal.strInstructions}</p>
            </details>
          </div>
        `;
      });
    })
    .catch(() => {
      resultDiv.innerHTML = "<p>⚠️ Something went wrong</p>";
    });
}
