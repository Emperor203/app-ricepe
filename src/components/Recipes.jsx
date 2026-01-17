import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import Loading from '../components/Loading';
import Searchbar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../utils';
import Button from '../components/Button';

function Recipes() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [query, setQuery] = useState('');       // пустая строка для поиска
  const [searchTerm, setSearchTerm] = useState('a'); // при входе загружаем больше карточек по букве 'a'
  const [limit, setLimit] = useState(12);       // показываем сразу 12 карточек
  const [loading, setLoading] = useState(false);

  // Загрузка рецептов
  const loadRecipes = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes(searchTerm);
      setAllRecipes(data || []);
    } catch (err) {
      console.error(err);
      setAllRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Подгрузка дополнительных карточек
  const showMore = () => setLimit(prev => prev + 12);

  // Обработка поиска
  const handleSearch = () => {
    if (!query) return;          // ничего не делать если пустой ввод
    setLimit(12);                // сброс лимита
    setSearchTerm(query);        // обновляем запрос
  };

  useEffect(() => {
    loadRecipes();
  }, [searchTerm]);

  const displayedRecipes = allRecipes.slice(0, limit);

  if (loading) return <Loading />;

  return (
    <div className="w-full">
      {/* Search */}
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <div className="w-full lg:w-2/4 flex">
          <Searchbar
            placeholder="eg. Cake, Vegan, Chicken"
            handleInputChange={(e) => setQuery(e.target.value)}
            rightIcon={
              <BiSearchAlt2
                className="text-gray-600 cursor-pointer"
                onClick={handleSearch}
              />
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      {/* Recipes */}
      {displayedRecipes.length > 0 ? (
        <>
          <div className="w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10">
            {displayedRecipes.map(recipe => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>

          {/* Show More */}
          {limit < allRecipes.length && (
            <div className="flex w-full items-center justify-center py-10">
              <Button
                title="Show More"
                containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
                handleClick={showMore}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-white w-full py-10 text-center">
          No Recipe Found
        </div>
      )}
    </div>
  );
}

export default Recipes;
