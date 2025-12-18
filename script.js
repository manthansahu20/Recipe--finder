const resultDiv = document.getElementById("result");

function searchRecipe() {
  let query = document.getElementById("searchInput").value.trim();

  if (!query) {
    resultDiv.innerHTML = "<p>❗ Please enter recipe name</p>";
    return;
  }

  resultDiv.innerHTML = "<p>🔍 Searching recipes...</p>";

  const encodedQuery = encodeURIComponent(query);

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedQuery}`)
    .then(res => res.json())
    .then(data => {
      if (data.meals) {
        showMeals(data.meals);
      } else {
        // 🔁 Fallback: last word search
        const fallback = query.split(" ").pop();
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${fallback}`)
          .then(res => res.json())
          .then(data2 => {
            if (data2.meals) {
              showMeals(data2.meals);
            } else {
              resultDiv.innerHTML = `<p>❌ No recipe found for "${query}"</p>`;
            }
          });
      }
    })
    .catch(() => {
      resultDiv.innerHTML = "<p>⚠️ API error</p>";
    });
}

function showMeals(meals) {
  resultDiv.innerHTML = "";

  meals.forEach(meal => {
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
}
