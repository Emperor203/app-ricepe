import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:scale-105 transition-transform w-64">
    <Link to={`/recipes/${recipe.idMeal}`}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-white mt-2 text-center">{recipe.strMeal}</h3>
    </Link>
  </div>
);

export default RecipeCard;
