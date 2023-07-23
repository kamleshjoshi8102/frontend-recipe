import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();

  // for authorization of user
  const [cookies, _] = useCookies(["access_token"]);

  // object which has all the object
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  // console.log("check");
  // console.log(recipe);
  // console.log(userID);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // we are just changing a specific part
    // of the object for every change in the form
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const addIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const removeIngredient = (idx) => {
    // Make a copy of the current recipe state to avoid directly mutating the state.
    const updatedRecipe = { ...recipe };

    // Remove the element at the specified index from the ingredients array.
    updatedRecipe.ingredients.splice(idx, 1);

    // Update the state with the modified recipe.
    setRecipe(updatedRecipe);
  };

  const onSubmit = async (event) => {
    // will not refresh the page on submit
    event.preventDefault();
    try {
      // making a post request
      await axios.post("https://recipebackend-qwpw.onrender.com/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe Created!!");

      //navigating to homepage now
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredients, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              name="ingredients"
              value={ingredients}
              // giving id and event of changing
              onChange={(event) => handleIngredientChange(event, idx)}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="cross"
              onClick={() => removeIngredient(idx)}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </div>
        ))}
        <br />
        <button type="button" onClick={() => addIngredient()}>
          Add Ingredient
        </button>
        <br />
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

{
  /*

    To dO:

        => need to add remove ingredients
*/
}
