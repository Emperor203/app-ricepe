import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe, fetchRecipes } from '../utils';
import Loading from '../components/Loading';
import { AiFillPushpin } from 'react-icons/ai';
import RecipeCard from '../components/RecipeCard';


const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipe(id);
        setRecipe(data);

        if (data?.strMeal) {
          const rec = await fetchRecipes(data.strMeal);
          setRecommendations(
            rec.filter(r => r.idMeal !== data.idMeal).slice(0, 5)
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-white text-center mt-10">Recipe not found</p>;
  }

  // Ингредиенты
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing) ingredients.push(`${ing} - ${measure}`);
  }

  return (
    <div className="w-full px-4 lg:px-20 py-10 text-white">
      <h1 className="text-3xl font-bold mb-5 text-center">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full md:w-1/2 mx-auto rounded-md mb-5"
      />

      {/* Ingredients */}
      <div>
        <h2 className="text-2xl text-green-500 underline mb-3">Ingredients</h2>
        <ul className="list-disc list-inside mb-5">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="text-2xl text-green-500 underline mb-3">Instructions</h2>
        <p>{recipe.strInstructions}</p>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl text-green-500 underline mb-3">Also Try This</h2>
          <div className="flex flex-wrap gap-6">
            {recommendations.map(rec => (
              <RecipeCard key={rec.idMeal} recipe={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
