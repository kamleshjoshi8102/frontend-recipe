import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

function SavedRecipes() {
  const userID = useGetUserID();

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipebackend-qwpw.onrender.com/recipes/savedRecipes/${userID}`
        );
        // console.log(response.data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h1>
        <center>Saved Recipes</center>
      </h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>
              <strong>Cooking Time: </strong>
              {recipe.cookingTime}(minutes)
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedRecipes;
