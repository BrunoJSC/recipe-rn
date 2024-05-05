import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

interface MealProps {
  idMeal: number;
  strMeal: string;
  strMealThumb: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  analyzedInstructions: string;
  extendedIngredients: string;
}

interface MealContextType {
  mealsData: MealProps[];
  setMealsData: (data: MealProps[]) => void;
  selectMeal: (mealId: number) => void;
  setSelectedMeal: (data: MealProps) => void;
}

export const MealContext = createContext<MealContextType>(
  {} as MealContextType,
);

// Url for all Meals
const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
// Url for a single Meal
const singleMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export function MealProvider({ children }: { children: ReactNode }) {
  const [mealsData, setMealsData] = useState<MealProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMeal, setSelectedMeal] = useState<MealProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setMealsData(data.meals);
    } catch (error) {
      console.error('Error de resposta!', error);
      setMealsData([]);
    } finally {
      setLoading(false);
    }
  };

  const selectMeal = (mealId: number) => {
    const meal = mealsData.find((meal) => meal.idMeal === mealId);
    setSelectedMeal(meal || null);
  };

  useEffect(() => {
    if (mealsData.length > 0) {
      return;
    }

    console.log(mealsData);

    fetchData(allMeals);
  }, []);

  useEffect(() => {
    if(searchTerm) {
      fetchData(`${allMeals}`);
    } else {
      fetchData(allMeals);
    }
  }, [searchTerm]);

  return (
    <MealContext.Provider
      value={{
        mealsData,
        setMealsData,
        selectMeal,
        setSelectedMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
