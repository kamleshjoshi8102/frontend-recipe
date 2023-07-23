import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

function Home() {
  const userID = useGetUserID();

  //to check which are saved or not  by user previously

  const [savedRecipes, setSavedRecipes] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  // we can't make useffect async as its child have async
  // so we call a function inside it
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // making a post request
        const response = await axios.get("https://recipebackend-qwpw.onrender.com/recipes");

        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          // sending data to backend from params
          `https://recipebackend-qwpw.onrender.com/recipes/savedRecipes/ids${userID}`
        );
        // saving data from the response which we are getting from backend
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
    // if we have access token
    if (cookies.access_token) fetchSavedRecipe();
  }, []);

  // in backend we have put request
  // which returns the updated list of saved recipe of a particular user
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipebackend-qwpw.onrender.com/recipes",
        {
          recipeID,
          userID,
        },
        {
          // authorization which we have implemented
          headers: { authorization: cookies.access_token },
        }
      );
      // when we save a recipe then it will not refresh the page instead it will update
      // the list of recipe
      setSavedRecipes(response.data.savedRecipes);
      // console.log(savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(savedRecipes);
  // returns if the recipe is saved in array previously or not
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  // console.log(savedRecipes)
  return (
    <div>
      <h1>
        <center>RecipeHub</center>
      </h1>
      <ul>
        {
          // console.log(recipes)
          /*
            ingredients
            instructions
            name
            userOwner
          */
        }
        {recipes?.map((recipe) => (
          <li key={recipe?._id}>
            <div>
              <h2 style={{ textAlign: "center" }}>{recipe.name}</h2>
              <img
                src={recipe?.imageUrl}
                className="recipe__img"
                alt={recipe?.name}
              />
              <br />
              {/*we need to get id to backend  */}

              <button
                className={
                  isRecipeSaved(recipe?._id)
                    ? "button-arounder-saved"
                    : "button-arounder"
                }
                onClick={() => saveRecipe(recipe?._id)}
                disabled={isRecipeSaved(recipe?._id)}
              >
                {isRecipeSaved(recipe?._id) ? "Saved" : "Save"}
              </button>
            </div>
            <br />
            <div className="instructions">
              <p>
                <strong>Instructions: </strong>
                {recipe?.instructions}
              </p>
            </div>
            <div className="ingredients">
              <p>
                <strong>Ingredients: </strong>
                {recipe?.ingredients}
              </p>
            </div>
            <p>
              <strong>Cooking Time: </strong>
              {recipe?.cookingTime}(minutes)
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
