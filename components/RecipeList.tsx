import styles from "@/styles/RecipeList.module.css";

export default function RecipeList({ recipes }: { recipes: any[] }) {
  return (
    <div className={styles.recipesContainer}>
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        recipes.map((meal) => (
          <div key={meal.idMeal} className={styles.recipeCard}>
            <a href={meal.strSource} target="_blank">
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </a>
          </div>
        ))
      )}
    </div>
  );
}