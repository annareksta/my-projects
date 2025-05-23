"use client"; // Делаем клиентским, чтобы использовать useState и обработчики событий

import { useState } from "react";
import styles from "@/styles/RecipeSearch.module.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

// Описание структуры рецепта
type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strSource: string;
};

export default function RecipeSearch() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Указываем, что это массив Recipe
  const [searchTerm, setSearchTerm] = useState("");

  // Функция поиска по названию
  const searchRecipes = async () => {
    if (!searchTerm) return;
    try {
      const res = await fetch(`${API_URL}/search.php?s=${searchTerm}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Ошибка при загрузке рецептов:", error);
    }
  };

  // Функция поиска по первой букве
  const searchByLetter = async (letter: string) => {
    try {
      const res = await fetch(`${API_URL}/search.php?f=${letter}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Ошибка при поиске по букве:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>

      {/* Поле ввода + кнопка поиска */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <button onClick={searchRecipes} className={styles.button}>
          Search
        </button>
      </div>

      {/* Поиск по алфавиту */}
      <div className={styles.alphabet}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => searchByLetter(letter)}
            className={styles.letterButton}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Отображение результатов */}
      <div className={styles.results}>
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          recipes.map((meal: Recipe) => (
            <div key={meal.idMeal} className={styles.recipeCard}>
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                <h3>{meal.strMeal}</h3>
              </a>
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className={styles.recipeImage}
                />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}