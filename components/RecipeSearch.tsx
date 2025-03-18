"use client"; // Делаем клиентским, чтобы использовать useState и обработчики событий

import { useState } from "react";
import styles from "@/styles/RecipeSearch.module.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export default function RecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Поле для ввода запроса

  // Функция поиска по названию
  const searchRecipes = async () => {
    if (!searchTerm) return; // Если пусто, ничего не делаем
    try {
      const res = await fetch(`${API_URL}/search.php?s=${searchTerm}`);
      const data = await res.json();
      setRecipes(data.meals || []); // Если ничего не нашли, ставим пустой массив
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
      <h1>Recipes</h1>

      {/* Поле ввода + кнопка поиска */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <button onClick={searchRecipes} className={styles.button}>Search</button>
      </div>

      {/* Поиск по алфавиту */}
      <div className={styles.alphabet}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button key={letter} onClick={() => searchByLetter(letter)} className={styles.letterButton}>
            {letter}
          </button>
        ))}
      </div>

      {/* Отображение результатов */}
      <div className={styles.results}>
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          recipes.map((meal) => (
            <div key={meal.idMeal} className={styles.recipeCard}>
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                <h3>{meal.strMeal}</h3>
              </a>
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.recipeImage} />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}